import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { useCookies } from 'react-cookie';
import EventCard from './EventCard';

// Socket.io client for real-time updates
const socket = io('http://localhost:4080');



// Dashboard Component
const Dashboard = () => {
  const [filters, setFilters] = useState({ category: '', date: '' });
  const [cookies] = useCookies(['access_token']);
  const [events, setEvents] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
  });
  const token = cookies['access_token'];
  const navigate = useNavigate();

  const fetchEvents = async (filters) => {
    const { category, date } = filters;
    let url = 'http://localhost:4080/api/events';

    if (category) url += `?category=${category}`;
    if (date) url += `&date=${date}`;

    const response = await axios.get(url);
    return response.data;
  };

  const fetchRegisteredEvents = async () => {
    const response = await axios.get('http://localhost:4080/api/events/registered-events', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };

  const fetchUserEvents = async () => {
    const response = await axios.get('http://localhost:4080/api/events/my-events', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };

  const createEvent = async (eventData) => {
    const response = await axios.post('http://localhost:4080/api/events/create', eventData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };

  const { data: fetchedEvents, error, isLoading } = useQuery(
    ['events', filters],
    () => fetchEvents(filters),
    { keepPreviousData: true }
  );

  const { data: myEvents, isLoading: isUserEventsLoading } = useQuery(
    ['userEvents'],
    fetchUserEvents,
    { enabled: !!token }
  );

  const { mutate: createNewEvent, isLoading: isCreatingEvent } = useMutation(createEvent, {
    onSuccess: () => {
      alert('Event created successfully');
      setEventData({ name: '', description: '', date: '', location: '' });
    },
    onError: () => {
      alert('Error creating event');
    },
  });
  const { data: registeredEvents, isLoading: isRegisteredEventsLoading } = useQuery(
    ['registeredEvents'],
    fetchRegisteredEvents,
    { enabled: !!token }
  );
  
  const deleteEvent = async (eventId) => {
    try {
      const response = await axios.delete(`http://localhost:4080/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Event deleted successfully');
      setUserEvents((prevEvents) => prevEvents.filter(event => event.id !== eventId));
      return response.data;
    } catch (error) {
      alert('Error deleting event');
    }
  };

  const withdraw = async (eventId) => {
    try {
        const response = await axios.delete(`http://localhost:4080/api/events/attend/${eventId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Event de-registered successfully');
        setUserEvents((prevEvents) => prevEvents.filter(event => event.id !== eventId));
        return response.data;
      } catch (error) {
        alert('Error de-registring event');
      }
    };
  const { mutate: updateEvent } = useMutation(
    (eventData) => axios.put(`http://localhost:4080/api/events/update/${eventData.id}`, eventData, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    {
      onSuccess: () => {
        alert('Event updated successfully');
      },
      onError: () => {
        alert('Error updating event');
      },
    }
  );

  // Real-time updates via WebSockets
  useEffect(() => {
    socket.on('attendeeUpdated', (data) => {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === data.eventId
            ? { ...event, attendeesCount: data.attendeesCount }
            : event
        )
      );
    });

    socket.on("eventUpdated", (data) => {
        const { name, description, date, location } = data.event;
    
        // Format the date
        const formattedDate = new Date(date).toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    
        alert(
            `Event Updated: \nName: ${name} \nDescription: ${description} \nDate: ${formattedDate} \nLocation: ${location}`
        );
    });
    
    return () => {
      socket.off('attendeeUpdated');
      socket.off('eventUpdated');
    };
  }, []);

  useEffect(() => {
    if (fetchedEvents) {
      setEvents(fetchedEvents);
    }
    if (myEvents) {
      setUserEvents(myEvents);
    }
  }, [fetchedEvents, myEvents]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle event creation form changes
  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle event creation form submission
  const handleEventSubmit = (e) => {
    e.preventDefault();
    createNewEvent(eventData);
  };

  // Handle register button click
  const handleRegister = (eventId) => {
    axios
      .post(`http://localhost:4080/api/events/attend/${eventId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert('Successfully registered for the event!');
      })
      .catch((error) => {
        alert(error.response?.data?.message || 'Error registering for the event');
      });
  };

  const handleDeleteEvent = (eventId) => {
    if (!eventId) return; // Prevent calling with undefined/null
    deleteEvent(eventId);
  };
  const handelWithdraw = (eventId)=>{
    if(!eventId) return;
    withdraw(eventId);
  }
  

  const handleUpdateEvent = (event) => {
    setEventData({
      ...event,
      date: new Date(event.date).toISOString().slice(0, 16), // For datetime-local input
    });
  };

  if (isLoading || isUserEventsLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching events</div>;

 
  

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center mt-16">Event Dashboard</h1>


      {/* Event List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard key={event.id} event={event} onRegister={handleRegister} />
          ))
        ) : (
          <div>No events found</div>
        )}
      </div>

      {/* My Events Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">My Events</h2>
        {userEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {userEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onUpdate={handleUpdateEvent}
                onDelete={handleDeleteEvent}
               
              />
            ))}
          </div>
        ) : (
          <div>
            No events created yet.{' '}
            <button
              onClick={() => navigate('/create-event')}
              className="text-blue-500"
            >
              Create an event
            </button>
          </div>
        )}
      </div>
        {/* Registered Events Section */}
        <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Events I've Signed Up For</h2>
        {isRegisteredEventsLoading ? (
            <div>Loading...</div>
        ) : registeredEvents?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {registeredEvents.map((event) => (
                <EventCard key={event.id} event={event} onWithdraw={handelWithdraw}/>
            ))}
            </div>
        ) : (
            <div>No registered events yet.</div>
        )}
        </div>

      {/* Event Creation Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-semibold mb-4">Create Event</h2>
        <form onSubmit={handleEventSubmit}>
          <input
            type="text"
            name="name"
            value={eventData.name}
            onChange={handleEventChange}
            placeholder="Event Name"
            className="block w-full px-4 py-2 border rounded-lg mb-4"
          />
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleEventChange}
            placeholder="Event Description"
            className="block w-full px-4 py-2 border rounded-lg mb-4"
          />
          <input
            type="datetime-local"
            name="date"
            value={eventData.date}
            onChange={handleEventChange}
            className="block w-full px-4 py-2 border rounded-lg mb-4"
          />
          <input
            type="text"
            name="location"
            value={eventData.location}
            onChange={handleEventChange}
            placeholder="Location"
            className="block w-full px-4 py-2 border rounded-lg mb-4"
          />
          <button
            type="submit"
            disabled={isCreatingEvent}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            {isCreatingEvent ? 'Creating...' : 'Create Event'}
          </button>
        </form>
      </div>


    
    

    </div>
  );
};

export default Dashboard;
