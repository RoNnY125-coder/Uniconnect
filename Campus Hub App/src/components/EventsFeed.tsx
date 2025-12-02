import { useState } from 'react';
import { Calendar, BookOpen, Trophy, Users, Clock, ChevronRight, CheckCircle2, X } from 'lucide-react';

interface Event {
  id: string;
  type: 'assignment' | 'hackathon' | 'club' | 'event';
  title: string;
  subtitle?: string;
  time: string;
  priority?: 'high' | 'medium' | 'low';
  completed?: boolean;
}

export function EventsFeed() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      type: 'assignment',
      title: 'Assignment Due: Maths',
      subtitle: 'Calculus Problem Set 3',
      time: '11:59 PM',
      priority: 'high',
      completed: false,
    },
    {
      id: '2',
      type: 'hackathon',
      title: 'New Hackathon Posted',
      subtitle: 'AI Innovation Challenge',
      time: 'Just now',
      priority: 'medium',
      completed: false,
    },
    {
      id: '3',
      type: 'club',
      title: 'Clubs: Join Now',
      subtitle: 'Photography Club Applications Open',
      time: '2 hours ago',
      priority: 'medium',
      completed: false,
    },
    {
      id: '4',
      type: 'event',
      title: 'Guest Lecture',
      subtitle: 'Machine Learning Fundamentals',
      time: '4:00 PM',
      priority: 'medium',
      completed: false,
    },
    {
      id: '5',
      type: 'assignment',
      title: 'Assignment Due: Physics',
      subtitle: 'Lab Report - Thermodynamics',
      time: 'Tomorrow',
      priority: 'high',
      completed: false,
    },
  ]);

  const [selectedFilter, setSelectedFilter] = useState<'all' | 'assignment' | 'hackathon' | 'club' | 'event'>('all');

  const toggleComplete = (id: string) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, completed: !event.completed } : event
    ));
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const filteredEvents = selectedFilter === 'all' 
    ? events 
    : events.filter(event => event.type === selectedFilter);

  const getIcon = (type: Event['type']) => {
    switch (type) {
      case 'assignment':
        return BookOpen;
      case 'hackathon':
        return Trophy;
      case 'club':
        return Users;
      case 'event':
        return Calendar;
    }
  };

  const getPriorityColor = (priority?: string, completed?: boolean) => {
    if (completed) {
      return 'bg-gray-800/50 border-gray-700 opacity-60';
    }
    switch (priority) {
      case 'high':
        return 'bg-red-950/50 border-red-900';
      case 'medium':
        return 'bg-blue-950/50 border-blue-900';
      default:
        return 'bg-gray-800/50 border-gray-700';
    }
  };

  const getIconColor = (type: Event['type'], completed?: boolean) => {
    if (completed) {
      return 'bg-gray-700 text-gray-400';
    }
    switch (type) {
      case 'assignment':
        return 'bg-red-900/50 text-red-400';
      case 'hackathon':
        return 'bg-purple-900/50 text-purple-400';
      case 'club':
        return 'bg-green-900/50 text-green-400';
      case 'event':
        return 'bg-blue-900/50 text-blue-400';
    }
  };

  const activeEvents = events.filter(e => !e.completed).length;
  const completedEvents = events.filter(e => e.completed).length;

  return (
    <div>
      <div className="mb-4 sm:mb-6">
        <h2 className="text-gray-100 mb-1">Today's Events</h2>
        <p className="text-gray-400 text-sm sm:text-base">Stay on top of your campus life</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-gray-800/50 p-3 sm:p-4 rounded-lg border border-gray-700">
          <div className="text-gray-400 mb-1 text-xs sm:text-sm">Active</div>
          <div className="text-indigo-400 text-lg sm:text-xl">{activeEvents}</div>
        </div>
        <div className="bg-gray-800/50 p-3 sm:p-4 rounded-lg border border-gray-700">
          <div className="text-gray-400 mb-1 text-xs sm:text-sm">Completed</div>
          <div className="text-green-400 text-lg sm:text-xl">{completedEvents}</div>
        </div>
        <div className="bg-gray-800/50 p-3 sm:p-4 rounded-lg border border-gray-700">
          <div className="text-gray-400 mb-1 text-xs sm:text-sm">Hackathons</div>
          <div className="text-purple-400 text-lg sm:text-xl">1 New</div>
        </div>
        <div className="bg-gray-800/50 p-3 sm:p-4 rounded-lg border border-gray-700">
          <div className="text-gray-400 mb-1 text-xs sm:text-sm">Clubs</div>
          <div className="text-indigo-400 text-lg sm:text-xl">5 Open</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['all', 'assignment', 'hackathon', 'club', 'event'].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter as any)}
            className={`px-3 sm:px-4 py-2 rounded-lg whitespace-nowrap text-sm transition-all ${
              selectedFilter === filter
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {filteredEvents.map((event) => {
          const Icon = getIcon(event.type);
          return (
            <div
              key={event.id}
              className={`bg-gray-800/50 p-4 rounded-lg border ${getPriorityColor(event.priority, event.completed)} hover:bg-gray-800/70 transition-all`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`p-2 sm:p-3 rounded-full flex-shrink-0 ${getIconColor(event.type, event.completed)}`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-gray-100 mb-1 text-sm sm:text-base ${event.completed ? 'line-through' : ''}`}>
                    {event.title}
                  </h3>
                  {event.subtitle && (
                    <p className="text-gray-400 mb-2 text-xs sm:text-sm">{event.subtitle}</p>
                  )}
                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">{event.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => toggleComplete(event.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      event.completed
                        ? 'bg-green-900/50 text-green-400'
                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="p-2 rounded-lg bg-gray-700 text-gray-400 hover:bg-red-900/50 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12 bg-gray-800/30 rounded-lg border border-gray-700">
          <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No events in this category</p>
        </div>
      )}
    </div>
  );
}
