import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { Send } from 'lucide-react';

export default function EnquiryForm() {
  const [trainers, setTrainers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    goal_physique: '',
    height: '',
    weight: '',
    preferred_trainer: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [loadingTrainers, setLoadingTrainers] = useState(true);

  useEffect(() => {
    fetchTrainers();
    if (window.selectedTrainer) {
      setFormData(prev => ({
        ...prev,
        preferred_trainer: window.selectedTrainer.name
      }));
      window.selectedTrainer = null;
    }
  }, []);

  const fetchTrainers = async () => {
    try {
      const { data, error } = await supabase.from('trainers').select('*');
      if (error) throw error;
      setTrainers(data || []);
    } catch (error) {
      console.error('Error fetching trainers:', error);
    } finally {
      setLoadingTrainers(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.from('enquiries').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          age: parseInt(formData.age),
          gender: formData.gender,
          goal_physique: formData.goal_physique,
          height: parseFloat(formData.height),
          weight: parseFloat(formData.weight),
          preferred_trainer: formData.preferred_trainer
        }
      ]);

      if (error) throw error;

      setMessage('✓ Enquiry submitted successfully! We will contact you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        age: '',
        gender: '',
        goal_physique: '',
        height: '',
        weight: '',
        preferred_trainer: ''
      });
    } catch (error) {
      setMessage(`✗ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-black">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-bold tracking-widest uppercase text-yellow-400 mb-4">Get Started</p>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            START YOUR TRANSFORMATION
          </h2>
          <p className="text-xl text-gray-400">
            Fill out this form and our team will get back to you within 24 hours.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-gray-900 p-8 md:p-12 rounded-lg border-2 border-gray-800">
          {/* Success/Error Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg border-2 ${message.includes('✓') 
              ? 'bg-green-900 border-green-400 text-green-100' 
              : 'bg-red-900 border-red-400 text-red-100'}`}
            >
              <p className="font-bold text-center">{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 placeholder-gray-500 font-semibold"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 placeholder-gray-500 font-semibold"
              />
            </div>

            {/* Phone & Age */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 placeholder-gray-500 font-semibold"
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 placeholder-gray-500 font-semibold"
              />
            </div>

            {/* Gender & Goal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 font-semibold"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <select
                name="goal_physique"
                value={formData.goal_physique}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 font-semibold"
              >
                <option value="">Select Goal</option>
                <option value="Weight Loss">Weight Loss</option>
                <option value="Muscle Gain">Muscle Gain</option>
                <option value="Toning">Toning</option>
                <option value="Flexibility">Flexibility</option>
                <option value="General Fitness">General Fitness</option>
              </select>
            </div>

            {/* Height & Weight */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="number"
                step="0.01"
                name="height"
                placeholder="Height (cm)"
                value={formData.height}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 placeholder-gray-500 font-semibold"
              />
              <input
                type="number"
                step="0.01"
                name="weight"
                placeholder="Weight (kg)"
                value={formData.weight}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 placeholder-gray-500 font-semibold"
              />
            </div>

            {/* Preferred Trainer */}
            <div>
              <label className="block text-sm font-bold text-yellow-400 mb-2 uppercase">
                Preferred Trainer (Optional)
              </label>
              <select
                name="preferred_trainer"
                value={formData.preferred_trainer}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 font-semibold"
              >
                <option value="">Select a trainer (if preferred)</option>
                {loadingTrainers ? (
                  <option disabled>Loading trainers...</option>
                ) : (
                  trainers.map(trainer => (
                    <option key={trainer.id} value={trainer.name}>
                      {trainer.name} - {trainer.specialization}
                    </option>
                  ))
                )}
              </select>
              <p className="text-xs text-gray-400 mt-2">
                💡 Tip: Click on any trainer above to automatically select them here!
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-black py-4 rounded-lg font-black uppercase text-lg hover:bg-yellow-300 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Send size={20} />
              {loading ? 'SUBMITTING...' : 'SUBMIT ENQUIRY'}
            </button>
          </form>

          {/* Terms */}
          <p className="text-gray-400 text-sm text-center mt-6">
            By submitting this form, you agree to our terms and conditions.
          </p>
        </div>
      </div>
    </section>
  );
}