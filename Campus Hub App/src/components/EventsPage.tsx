import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Users, ExternalLink, Filter } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  category: string;
  registered: boolean;
}

export function EventsPage() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'AI Workshop & Hackathon',
      date: '5th June 2024',
      time: '10:00 AM - 6:00 PM',
      location: 'Main Auditorium',
      attendees: 124,
      category: 'Technology',
      registered: false,
    },
    {
      id: 2,
      title: 'Cultural Fest 2024',
      date: '12th June 2024',
      time: '9:00 AM - 10:00 PM',
      location: 'Campus Grounds',
      attendees: 456,
      category: 'Culture',
      registered: true,
    },
    {
      id: 3,
      title: 'Career Fair',
      date: '20th June 2024',
      time: '11:00 AM - 5:00 PM',
      location: 'Convention Center',
      attendees: 89,
      category: 'Career',
      registered: false,
    },
    {
      id: 4,
      title: 'Sports Day',
      date: '28th June 2024',
      time: '8:00 AM - 6:00 PM',
      location: 'Sports Complex',
      attendees: 234,
      category: 'Sports',
      registered: false,
    },
  ]);

  const [filter, setFilter] = useState('all');

  const handleRegister = (id: number) => {
    setEvents(events.map(event =>
      event.id === id ? { ...event, registered: !event.registered } : event
    ));
  };

  const filteredEvents = filter === 'all'
    ? events
    : events.filter(e => e.category.toLowerCase() === filter);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-b border-gray-800 sticky top-0 z-10 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-white text-2xl sm:text-3xl mb-2">Campus Events</h1>
          <p className="text-gray-400">Discover and join exciting campus events</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-center">
            <div className="text-indigo-400 text-xl">{events.length}</div>
            <div className="text-gray-400 text-xs mt-1">Total Events</div>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-center">
            <div className="text-green-400 text-xl">{events.filter(e => e.registered).length}</div>
            <div className="text-gray-400 text-xs mt-1">Registered</div>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-center">
            <div className="text-purple-400 text-xl">{events.reduce((acc, e) => acc + e.attendees, 0)}</div>
            <div className="text-gray-400 text-xs mt-1">Attendees</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
          {['all', 'technology', 'culture', 'career', 'sports'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm transition-all ${
                filter === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 hover:bg-gray-800/70 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-white text-lg">{event.title}</h3>
                    <span className="px-2 py-1 bg-purple-900/50 text-purple-300 text-xs rounded">
                      {event.category}
                    </span>
                  </div>
                  {event.registered && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded mb-2">
                      ✓ Registered
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Users className="w-4 h-4 text-indigo-400" />
                  <span>{event.attendees} attending</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleRegister(event.id)}
                  className={`flex-1 py-2.5 rounded-lg transition-all text-sm ${
                    event.registered
                      ? 'bg-green-900/30 text-green-400 border border-green-700'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {event.registered ? 'Registered' : 'Register'}
                </button>
                <button className="px-4 py-2.5 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 text-sm">
                  Details
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
