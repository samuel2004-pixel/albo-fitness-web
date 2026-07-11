import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';

export default function GymInfoManagement() {
  const [gymInfo, setGymInfo] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    hours: '',
    about: ''
  });
  const [gymId, setGymId] = useState(null);

  useEffect(() => {
    fetchGymInfo();
  }, []);

  const fetchGymInfo = async () => {
    const { data, error } = await supabase.from('gym_info').select('*').limit(1);
    if (error) console.error(error);
    if (data && data.length > 0) {
      setGymInfo(data[0]);
      setGymId(data[0].id);
    }
  };

  const updateGymInfo = async () => {
    if (gymId) {
      const { error } = await supabase.from('gym_info').update(gymInfo).eq('id', gymId);
      if (error) {
        alert('Error updating gym info');
      } else {
        alert('Gym info updated successfully!');
        fetchGymInfo();
      }
    } else {
      const { error } = await supabase.from('gym_info').insert([gymInfo]);
      if (error) {
        alert('Error creating gym info');
      } else {
        alert('Gym info created successfully!');
        fetchGymInfo();
      }
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg border-2 border-gray-800">
      <h2 className="text-2xl font-black mb-6 text-yellow-400 uppercase">Gym Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Gym Name"
          value={gymInfo.name}
          onChange={(e) => setGymInfo({ ...gymInfo, name: e.target.value })}
          className="p-3 bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 placeholder-gray-500 font-semibold"
        />
        <input
          type="text"
          placeholder="Address"
          value={gymInfo.address}
          onChange={(e) => setGymInfo({ ...gymInfo, address: e.target.value })}
          className="p-3 bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 placeholder-gray-500 font-semibold"
        />
        <input
          type="text"
          placeholder="Phone"
          value={gymInfo.phone}
          onChange={(e) => setGymInfo({ ...gymInfo, phone: e.target.value })}
          className="p-3 bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 placeholder-gray-500 font-semibold"
        />
        <input
          type="email"
          placeholder="Email"
          value={gymInfo.email}
          onChange={(e) => setGymInfo({ ...gymInfo, email: e.target.value })}
          className="p-3 bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 placeholder-gray-500 font-semibold"
        />
        <textarea
          placeholder="Hours"
          value={gymInfo.hours}
          onChange={(e) => setGymInfo({ ...gymInfo, hours: e.target.value })}
          className="p-3 bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 placeholder-gray-500 font-semibold col-span-2"
        />
        <textarea
          placeholder="About"
          value={gymInfo.about}
          onChange={(e) => setGymInfo({ ...gymInfo, about: e.target.value })}
          className="p-3 bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 placeholder-gray-500 font-semibold col-span-2 min-h-32"
        />
      </div>
      <button
        onClick={updateGymInfo}
        className="mt-4 w-full bg-yellow-400 text-black py-3 rounded-lg hover:bg-yellow-300 transition-all font-black uppercase"
      >
        Save Gym Info
      </button>
    </div>
  );
}