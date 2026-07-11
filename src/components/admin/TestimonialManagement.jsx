import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';
import { Trash2, Upload, Edit2, X, Check } from 'lucide-react';

export default function TestimonialManagement() {
  const [testimonials, setTestimonials] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState({
    client_name: '',
    message: '',
    rating: 5,
    photo_url: ''
  });
  const [photoPreview, setPhotoPreview] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState(null);
  const [editPhotoPreview, setEditPhotoPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError('');
      const { data, error: fetchError } = await supabase.from('testimonials').select('*');
      if (fetchError) {
        setError('Error fetching testimonials: ' + fetchError.message);
        console.error(fetchError);
      } else {
        setTestimonials(data || []);
      }
    } catch (err) {
      setError('Unexpected error: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setNewTestimonial({ ...newTestimonial, photo_url: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditPhotoPreview(reader.result);
        setEditingData({ ...editingData, photo_url: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUrlInput = (url) => {
    setNewTestimonial({ ...newTestimonial, photo_url: url });
    setPhotoPreview(url);
  };

  const handleEditPhotoUrlInput = (url) => {
    setEditingData({ ...editingData, photo_url: url });
    setEditPhotoPreview(url);
  };

  const addTestimonial = async () => {
    // Validation
    if (!newTestimonial.client_name || newTestimonial.client_name.trim() === '') {
      alert('❌ Client name is required');
      return;
    }
    if (!newTestimonial.message || newTestimonial.message.trim() === '') {
      alert('❌ Message is required');
      return;
    }

    try {
      setLoading(true);
      const testimonialData = {
        client_name: newTestimonial.client_name.trim(),
        message: newTestimonial.message.trim(),
        rating: parseInt(newTestimonial.rating) || 5,
        photo_url: newTestimonial.photo_url?.trim() || null
      };

      const { error: insertError } = await supabase.from('testimonials').insert([testimonialData]);

      if (insertError) {
        alert('❌ Error adding testimonial: ' + insertError.message);
        console.error(insertError);
      } else {
        alert('✅ Testimonial added successfully!');
        setNewTestimonial({
          client_name: '',
          message: '',
          rating: 5,
          photo_url: ''
        });
        setPhotoPreview('');
        await fetchTestimonials();
      }
    } catch (err) {
      alert('❌ Unexpected error: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (testimonial) => {
    setEditingId(testimonial.id);
    setEditingData({ ...testimonial });
    setEditPhotoPreview(testimonial.photo_url || '');
  };

  const saveEdit = async () => {
    if (!editingData || !editingData.client_name || editingData.client_name.trim() === '') {
      alert('❌ Client name is required');
      return;
    }
    if (!editingData.message || editingData.message.trim() === '') {
      alert('❌ Message is required');
      return;
    }

    try {
      setLoading(true);

      // Prepare data - EXCLUDE id, created_at, updated_at
      const updateData = {
        client_name: editingData.client_name.trim(),
        message: editingData.message.trim(),
        rating: parseInt(editingData.rating) || 5,
        photo_url: editingData.photo_url?.trim() || null
      };

      const { error: updateError } = await supabase
        .from('testimonials')
        .update(updateData)
        .eq('id', editingId);

      if (updateError) {
        alert('❌ Error updating testimonial: ' + updateError.message);
        console.error(updateError);
      } else {
        alert('✅ Testimonial updated successfully!');
        setEditingId(null);
        setEditingData(null);
        setEditPhotoPreview('');
        await fetchTestimonials();
      }
    } catch (err) {
      alert('❌ Unexpected error: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingData(null);
    setEditPhotoPreview('');
  };

  const deleteTestimonial = async (id) => {
    if (!window.confirm('🗑️ Are you sure you want to delete this testimonial?')) {
      return;
    }

    try {
      setLoading(true);
      const { error: deleteError } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (deleteError) {
        alert('❌ Error deleting testimonial: ' + deleteError.message);
        console.error(deleteError);
      } else {
        alert('✅ Testimonial deleted successfully!');
        await fetchTestimonials();
      }
    } catch (err) {
      alert('❌ Unexpected error: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 bg-black p-6 rounded-lg">
      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-600/20 border-2 border-red-600 rounded-lg text-red-300">
          {error}
        </div>
      )}

      {/* Add Testimonial Form */}
      <div className="bg-gray-900 p-6 rounded-lg border-2 border-gray-800">
        <h2 className="text-2xl font-black mb-6 text-yellow-400 uppercase">Add New Testimonial</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Client Name *"
            value={newTestimonial.client_name}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, client_name: e.target.value })}
            className="w-full p-3 bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 placeholder-gray-500 font-semibold"
            disabled={loading}
          />

          <textarea
            placeholder="Testimonial Message *"
            value={newTestimonial.message}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, message: e.target.value })}
            className="w-full p-3 bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 placeholder-gray-500 font-semibold min-h-32"
            disabled={loading}
          />

          <select
            value={newTestimonial.rating}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: parseInt(e.target.value) })}
            className="w-full p-3 bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 font-semibold"
            disabled={loading}
          >
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>

          {/* Photo Section */}
          <div className="bg-gray-800 p-4 rounded-lg border-2 border-gray-700">
            <p className="text-sm font-bold text-yellow-400 mb-3 uppercase">📸 Add Client Photo</p>

            <div className="mb-4">
              <label className="flex items-center justify-center gap-2 p-3 bg-gray-900 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-yellow-400 transition">
                <Upload size={18} className="text-gray-400" />
                <span className="text-gray-300 text-sm font-semibold">Click to Upload Photo</span>
                <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" disabled={loading} />
              </label>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 h-px bg-gray-700"></div>
              <span className="text-xs text-gray-500">OR</span>
              <div className="flex-1 h-px bg-gray-700"></div>
            </div>

            <input
              type="url"
              placeholder="Paste image URL here"
              value={newTestimonial.photo_url}
              onChange={(e) => handlePhotoUrlInput(e.target.value)}
              className="w-full p-3 bg-gray-900 text-white border-2 border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 placeholder-gray-500 font-semibold mb-3"
              disabled={loading}
            />

            {photoPreview && (
              <div className="mt-3">
                <p className="text-xs text-gray-400 mb-2">✅ Preview:</p>
                <img src={photoPreview} alt="Preview" className="w-24 h-24 rounded-lg object-cover border-2 border-yellow-400" />
              </div>
            )}
          </div>
        </div>

        <button
          onClick={addTestimonial}
          disabled={loading}
          className="mt-4 w-full bg-yellow-400 text-black py-3 rounded-lg hover:bg-yellow-300 transition-all font-black uppercase disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '⏳ Adding...' : '✅ Add Testimonial'}
        </button>
      </div>

      {/* Testimonials List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-black text-yellow-400 uppercase">Testimonials List ({testimonials.length})</h2>
        {testimonials.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No testimonials added yet.</p>
        ) : (
          testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-900 p-6 rounded-lg border-2 border-gray-800 hover:border-yellow-400 transition">

              {editingId === testimonial.id && editingData ? (
                // EDIT MODE
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editingData.client_name || ''}
                    onChange={(e) => setEditingData({ ...editingData, client_name: e.target.value })}
                    className="w-full p-3 bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 font-semibold"
                    placeholder="Client Name"
                    disabled={loading}
                  />

                  <textarea
                    value={editingData.message || ''}
                    onChange={(e) => setEditingData({ ...editingData, message: e.target.value })}
                    className="w-full p-3 bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 font-semibold min-h-24"
                    placeholder="Message"
                    disabled={loading}
                  />

                  <select
                    value={editingData.rating || 5}
                    onChange={(e) => setEditingData({ ...editingData, rating: parseInt(e.target.value) })}
                    className="w-full p-3 bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 font-semibold"
                    disabled={loading}
                  >
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                  </select>

                  {/* Edit Photo Section */}
                  <div className="bg-gray-800 p-4 rounded-lg border-2 border-gray-700">
                    <p className="text-sm font-bold text-yellow-400 mb-3 uppercase">📸 Edit Photo</p>

                    <div className="mb-4">
                      <label className="flex items-center justify-center gap-2 p-3 bg-gray-900 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-yellow-400 transition">
                        <Upload size={18} className="text-gray-400" />
                        <span className="text-gray-300 text-sm font-semibold">Change Photo</span>
                        <input type="file" accept="image/*" onChange={handleEditPhotoChange} className="hidden" disabled={loading} />
                      </label>
                    </div>

                    <input
                      type="url"
                      placeholder="Or paste new image URL"
                      value={editingData.photo_url || ''}
                      onChange={(e) => handleEditPhotoUrlInput(e.target.value)}
                      className="w-full p-3 bg-gray-900 text-white border-2 border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 placeholder-gray-500 font-semibold mb-3"
                      disabled={loading}
                    />

                    {editPhotoPreview && (
                      <div className="mt-3">
                        <img src={editPhotoPreview} alt="Preview" className="w-24 h-24 rounded-lg object-cover border-2 border-yellow-400" />
                      </div>
                    )}
                  </div>

                  {/* Edit Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={saveEdit}
                      disabled={loading}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-black uppercase flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Check size={18} /> {loading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={cancelEdit}
                      disabled={loading}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-black uppercase flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <X size={18} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // VIEW MODE
                <>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex gap-4 flex-1">
                      {testimonial.photo_url && (
                        <img
                          src={testimonial.photo_url}
                          alt={testimonial.client_name}
                          className="w-20 h-20 rounded-lg object-cover border-2 border-yellow-400 flex-shrink-0"
                        />
                      )}

                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{testimonial.client_name}</h3>
                        <p className="text-gray-300 mb-2 text-sm">{testimonial.message.substring(0, 100)}...</p>
                        <div className="flex gap-1">
                          {[...Array(testimonial.rating || 5)].map((_, i) => (
                            <span key={i} className="text-yellow-400">★</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => startEdit(testimonial)}
                        disabled={loading}
                        className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Edit testimonial"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={() => deleteTestimonial(testimonial.id)}
                        disabled={loading}
                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete testimonial"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}