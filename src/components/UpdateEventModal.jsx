import { useState } from "react";
import { useCookies } from 'react-cookie';
import { useQueryClient } from '@tanstack/react-query';

const UpdateEventModal = ({ event, isOpen, onClose, onUpdate }) => {
  const [name, setName] = useState(event.name);
  const queryClient = useQueryClient();
  const [description, setDescription] = useState(event.description);
   const [cookies] = useCookies(['access_token']);
  const [date, setDate] = useState(event.date);
  const [location, setLocation] = useState(event.location);

  const refetch = () => {
    queryClient.invalidateQueries(['events']);
    queryClient.invalidateQueries(['userEvents']);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
        const token = cookies['access_token'];
      const response = await fetch(`https://emp-backend-1s3q.onrender.com/api/events/update/${event._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description, date, location }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update event");

      onUpdate(data.event); // Update event in UI
      refetch();
      onClose(); // Close modal
    } catch (error) {
      alert(error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Update Event</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Event Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="date"
            value={date.split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <div className="flex justify-between mt-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Update
            </button>
            <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded-lg">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEventModal;
