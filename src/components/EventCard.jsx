import { useState } from "react";
import UpdateEventModal from "./UpdateEventModal";

const EventCard = ({ event, onRegister, onUpdate, onDelete,onWithdraw }) => {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
      <h2 className="text-xl font-semibold">{event.name}</h2>
      <p className="mt-2 text-gray-600">{event.description}</p>
      <p className="mt-2 text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
      <p className="mt-1 text-gray-500">Location: {event.location}</p>
      <p className="mt-1 text-gray-500">Attendees: {event.attendeesCount}</p>

      <div className="mt-4 flex justify-between">
        {onRegister &&(
            <button
            onClick={() => onRegister(event.id)}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
            Register
            </button>
        )}

        {onUpdate && (
          <button
            onClick={() => setIsUpdateOpen(true)}
            className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
          >
            Update
          </button>
        )}
   
        {onDelete && (
          
          <button
            onClick={() => onDelete(event._id)}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </button>
          
        )}

        {onWithdraw && (
             <button
             onClick={() => onWithdraw(event._id)}
             className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
           >
             Withdraw
           </button>
        )}

      </div>

      {/* Update Modal */}
      <UpdateEventModal
        event={event}
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        onUpdate={(updatedEvent) => {
          onUpdate(updatedEvent);
          setIsUpdateOpen(false);
        }}
      />
    </div>
  );
};

export default EventCard;
