import React, { useState, useEffect } from "react";
import { supabase } from "../../services/supabase";
import {
  Trash2,
  Edit2,
  Check,
  X,
  Plus,
} from "lucide-react";

export default function TrainerManagement() {
  const emptyTrainer = {
    name: "",
    photo_url: "",
    specialization: "",
    experience_years: "",
    certifications: [""],
    bio: "",
  };

  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [newTrainer, setNewTrainer] = useState(emptyTrainer);

  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState(emptyTrainer);

  useEffect(() => {
    fetchTrainers();
  }, []);

  async function fetchTrainers() {
    setLoading(true);

    const { data, error } = await supabase
      .from("trainers")
      .select("*")
      .order("id", { ascending: true });

    setLoading(false);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    setTrainers(data || []);
  }

  async function addTrainer() {
    if (!newTrainer.name.trim()) {
      alert("Trainer name is required.");
      return;
    }

    setSaving(true);

    const payload = {
      name: newTrainer.name,
      photo_url: newTrainer.photo_url,
      specialization: newTrainer.specialization,
      experience_years:
        parseInt(newTrainer.experience_years) || 0,
      certifications: newTrainer.certifications
        .filter((x) => x.trim() !== "")
        .join(", "),
      bio: newTrainer.bio,
    };

    const { error } = await supabase
      .from("trainers")
      .insert([payload]);

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    setNewTrainer(emptyTrainer);

    fetchTrainers();
  }

  function startEdit(trainer) {
    setEditingId(trainer.id);

    setEditingData({
      ...trainer,
      certifications: trainer.certifications
        ? trainer.certifications
            .split(",")
            .map((x) => x.trim())
        : [""],
    });
  }

  async function saveEdit() {
    setSaving(true);

    const id = editingId;

    const payload = {
      name: editingData.name,
      photo_url: editingData.photo_url,
      specialization: editingData.specialization,
      experience_years:
        parseInt(editingData.experience_years) || 0,
      certifications: editingData.certifications
        .filter((x) => x.trim() !== "")
        .join(", "),
      bio: editingData.bio,
    };

    const { error } = await supabase
      .from("trainers")
      .update(payload)
      .eq("id", id);

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    setEditingId(null);

    fetchTrainers();
  }

  async function deleteTrainer(id) {
    if (!window.confirm("Delete this trainer?")) return;

    const { error } = await supabase
      .from("trainers")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchTrainers();
  }

  function renderCertifications(data, setter) {
    return (
      <div className="col-span-2">
        <label className="block text-yellow-400 font-bold mb-2">
          Certifications
        </label>

        {data.certifications.map((cert, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              value={cert}
              placeholder={`Certification ${index + 1}`}
              className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
              onChange={(e) => {
                const arr = [...data.certifications];
                arr[index] = e.target.value;

                setter({
                  ...data,
                  certifications: arr,
                });
              }}
            />

            {index === data.certifications.length - 1 && (
              <button
                type="button"
                onClick={() =>
                  setter({
                    ...data,
                    certifications: [
                      ...data.certifications,
                      "",
                    ],
                  })
                }
                className="bg-yellow-400 text-black px-3 rounded-lg"
              >
                <Plus size={18} />
              </button>
            )}

            {data.certifications.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  const arr =
                    data.certifications.filter(
                      (_, i) => i !== index
                    );

                  setter({
                    ...data,
                    certifications: arr,
                  });
                }}
                className="bg-red-600 text-white px-3 rounded-lg"
              >
                <X size={18} />
              </button>
            )}
          </div>
        ))}
      </div>
    );
  }  
return (
  <div className="space-y-8">

    {/* ================= ADD TRAINER ================= */}

    <div className="bg-gray-900 border-2 border-gray-800 rounded-xl p-6">

      <h2 className="text-2xl font-black text-yellow-400 uppercase mb-6">
        Add Trainer
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          type="text"
          placeholder="Trainer Name"
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
          value={newTrainer.name}
          onChange={(e) =>
            setNewTrainer({
              ...newTrainer,
              name: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Photo URL"
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
          value={newTrainer.photo_url}
          onChange={(e) =>
            setNewTrainer({
              ...newTrainer,
              photo_url: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Specialization"
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
          value={newTrainer.specialization}
          onChange={(e) =>
            setNewTrainer({
              ...newTrainer,
              specialization: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Experience (Years)"
          className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
          value={newTrainer.experience_years}
          onChange={(e) =>
            setNewTrainer({
              ...newTrainer,
              experience_years: e.target.value,
            })
          }
        />

        {renderCertifications(newTrainer, setNewTrainer)}

        <textarea
          rows="5"
          placeholder="Trainer Bio"
          className="col-span-2 p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
          value={newTrainer.bio}
          onChange={(e) =>
            setNewTrainer({
              ...newTrainer,
              bio: e.target.value,
            })
          }
        />

      </div>

      <button
        onClick={addTrainer}
        disabled={saving}
        className="w-full mt-6 bg-yellow-400 hover:bg-yellow-300 text-black font-black py-3 rounded-lg uppercase transition"
      >
        {saving ? "Saving..." : "Add Trainer"}
      </button>

    </div>

    {/* ================= TRAINER LIST ================= */}

    <div className="bg-gray-900 border-2 border-gray-800 rounded-xl p-6">

      <h2 className="text-2xl font-black text-yellow-400 uppercase mb-6">
        Existing Trainers
      </h2>

      {loading ? (

        <div className="text-center py-10 text-gray-400">
          Loading Trainers...
        </div>

      ) : trainers.length === 0 ? (

        <div className="text-center py-10 text-gray-500">
          No Trainers Found
        </div>

      ) : (

        <div className="space-y-6">{trainers.map((trainer) => (
  <div
    key={trainer.id}
    className="bg-gray-800 border border-gray-700 rounded-xl p-6"
  >

    {editingId === trainer.id ? (

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          className="p-3 rounded-lg bg-gray-700 text-white"
          value={editingData.name}
          onChange={(e) =>
            setEditingData({
              ...editingData,
              name: e.target.value,
            })
          }
        />

        <input
          className="p-3 rounded-lg bg-gray-700 text-white"
          value={editingData.photo_url}
          onChange={(e) =>
            setEditingData({
              ...editingData,
              photo_url: e.target.value,
            })
          }
        />

        <input
          className="p-3 rounded-lg bg-gray-700 text-white"
          value={editingData.specialization}
          onChange={(e) =>
            setEditingData({
              ...editingData,
              specialization: e.target.value,
            })
          }
        />

        <input
          className="p-3 rounded-lg bg-gray-700 text-white"
          value={editingData.experience_years}
          onChange={(e) =>
            setEditingData({
              ...editingData,
              experience_years: e.target.value,
            })
          }
        />

        {renderCertifications(editingData, setEditingData)}

        <textarea
          rows="4"
          className="col-span-2 p-3 rounded-lg bg-gray-700 text-white"
          value={editingData.bio}
          onChange={(e) =>
            setEditingData({
              ...editingData,
              bio: e.target.value,
            })
          }
        />        <div className="col-span-2 flex gap-3 mt-2">

          <button
            onClick={saveEdit}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-500 px-5 py-2 rounded-lg font-bold"
          >
            <Check size={18} />
            Save
          </button>

          <button
            onClick={() => {
              setEditingId(null);
              setEditingData({});
            }}
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 px-5 py-2 rounded-lg font-bold"
          >
            <X size={18} />
            Cancel
          </button>

        </div>

      </div>

    ) : (

      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">

        <div className="flex gap-5">

          <img
            src={trainer.photo_url || "https://placehold.co/120x120"}
            alt={trainer.name}
            className="w-28 h-28 rounded-lg object-cover border-2 border-yellow-400"
          />

          <div>

            <h3 className="text-2xl font-black text-yellow-400">
              {trainer.name}
            </h3>

            <p className="text-gray-300 mt-1">
              {trainer.specialization}
            </p>

            <p className="text-gray-400">
              {trainer.experience_years} Years Experience
            </p>

            <div className="mt-3">
              <span className="font-bold text-white">
                Certifications:
              </span>

              <div className="flex flex-wrap gap-2 mt-2">

                {(trainer.certifications || "")
                  .split(",")
                  .map((cert, index) => (
                    <span
                      key={index}
                      className="bg-yellow-400 text-black text-sm px-3 py-1 rounded-full font-semibold"
                    >
                      {cert.trim()}
                    </span>
                  ))}

              </div>
            </div>

            <p className="mt-4 text-gray-300 whitespace-pre-wrap">
              {trainer.bio}
            </p>

          </div>

        </div>

        <div className="flex gap-3">

          <button
            onClick={() => startEdit(trainer)}
            className="bg-blue-600 hover:bg-blue-500 p-3 rounded-lg"
          >
            <Edit2 size={18} />
          </button>

          <button
            onClick={() => deleteTrainer(trainer.id)}
            className="bg-red-600 hover:bg-red-500 p-3 rounded-lg"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    )}

  </div>
))}

          </div>

        )}

      </div>

    </div>

  );
}