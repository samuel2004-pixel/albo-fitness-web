import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';
import { Download } from 'lucide-react';

export default function EnquiriesViewer() {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    const { data, error } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
    if (error) console.error(error);
    setEnquiries(data || []);
  };

  const downloadCSV = () => {
    const csv = [
      ['Name', 'Email', 'Phone', 'Age', 'Gender', 'Goal', 'Height', 'Weight', 'Preferred Trainer', 'Date'],
      ...enquiries.map(e => [
        e.name,
        e.email,
        e.phone,
        e.age || '',
        e.gender || '',
        e.goal_physique || '',
        e.height || '',
        e.weight || '',
        e.preferred_trainer || 'Not specified',
        new Date(e.created_at).toLocaleString()
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `enquiries-${new Date().toISOString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-yellow-400 uppercase">Enquiries</h2>
        <button
          onClick={downloadCSV}
          className="flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-lg hover:bg-yellow-300 transition-all font-black uppercase"
        >
          <Download size={20} />
          Export CSV
        </button>
      </div>

      {enquiries.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No enquiries yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-900 border-2 border-yellow-400">
                <th className="p-4 text-left text-white font-black uppercase text-sm">Name</th>
                <th className="p-4 text-left text-white font-black uppercase text-sm">Email</th>
                <th className="p-4 text-left text-white font-black uppercase text-sm">Phone</th>
                <th className="p-4 text-left text-white font-black uppercase text-sm">Goal</th>
                <th className="p-4 text-left text-white font-black uppercase text-sm">Age</th>
                <th className="p-4 text-left text-white font-black uppercase text-sm">Gender</th>
                <th className="p-4 text-left text-white font-black uppercase text-sm">Preferred Trainer</th>
                <th className="p-4 text-left text-white font-black uppercase text-sm">Date</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry) => (
                <tr key={enquiry.id} className="border-2 border-gray-800 hover:border-yellow-400 hover:bg-gray-900 transition">
                  <td className="p-4 text-gray-300 font-semibold">{enquiry.name}</td>
                  <td className="p-4 text-gray-300">{enquiry.email}</td>
                  <td className="p-4 text-gray-300">{enquiry.phone}</td>
                  <td className="p-4 text-gray-300">{enquiry.goal_physique || '-'}</td>
                  <td className="p-4 text-gray-300">{enquiry.age || '-'}</td>
                  <td className="p-4 text-gray-300">{enquiry.gender || '-'}</td>
                  <td className="p-4 text-yellow-400 font-semibold">{enquiry.preferred_trainer || 'Not specified'}</td>
                  <td className="p-4 text-gray-400 text-sm">{new Date(enquiry.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}