import { useState } from 'react';
import { Users, Calendar, Heart, Code, Camera, Music, Palette, Dumbbell, Check, X } from 'lucide-react';

interface Club {
  id: string;
  name: string;
  category: string;
  members: number;
  nextEvent: string;
  description: string;
  icon: string;
  isOpen: boolean;
  joined?: boolean;
}

export function Clubs() {
  const [clubs, setClubs] = useState<Club[]>([
    {
      id: '1',
      name: 'Photography Club',
      category: 'Arts & Culture',
      members: 234,
      nextEvent: 'Photo Walk - Dec 2',
      description: 'Capture moments and learn photography techniques',
      icon: 'camera',
      isOpen: true,
      joined: false,
    },
    {
      id: '2',
      name: 'Coding Club',
      category: 'Technology',
      members: 456,
      nextEvent: 'Hackathon - Dec 5',
      description: 'Build projects and participate in coding challenges',
      icon: 'code',
      isOpen: true,
      joined: true,
    },
    {
      id: '3',
      name: 'Music Society',
      category: 'Arts & Culture',
      members: 189,
      nextEvent: 'Open Mic - Nov 30',
      description: 'Express yourself through music and performances',
      icon: 'music',
      isOpen: false,
      joined: false,
    },
    {
      id: '4',
      name: 'Art & Design',
      category: 'Arts & Culture',
      members: 167,
      nextEvent: 'Exhibition - Dec 10',
      description: 'Explore creativity through various art forms',
      icon: 'palette',
      isOpen: true,
      joined: false,
    },
    {
      id: '5',
      name: 'Fitness Club',
      category: 'Sports & Wellness',
      members: 312,
      nextEvent: 'Yoga Session - Tomorrow',
      description: 'Stay fit and healthy with group workouts',
      icon: 'dumbbell',
      isOpen: true,
      joined: false,
    },
    {
      id: '6',
      name: 'Social Service',
      category: 'Community',
      members: 278,
      nextEvent: 'Food Drive - Dec 3',
      description: 'Make a difference in the community',
      icon: 'heart',
      isOpen: false,
      joined: false,
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);

  const categories = ['all', ...Array.from(new Set(clubs.map(club => club.category)))];

  const joinClub = (id: string) => {
    setClubs(clubs.map(club =>
      club.id === id ? { ...club, joined: true, members: club.members + 1 } : club
    ));
    setShowJoinModal(false);
    setSelectedClub(null);
  };

  const openJoinModal = (club: Club) => {
    setSelectedClub(club);
    setShowJoinModal(true);
  };

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      camera: Camera,
      code: Code,
      music: Music,
      palette: Palette,
      dumbbell: Dumbbell,
      heart: Heart,
    };
    return icons[iconName] || Users;
  };

  const getIconColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Arts & Culture': 'bg-purple-900/50 text-purple-400',
      'Technology': 'bg-blue-900/50 text-blue-400',
      'Sports & Wellness': 'bg-green-900/50 text-green-400',
      'Community': 'bg-pink-900/50 text-pink-400',
    };
    return colors[category] || 'bg-gray-700 text-gray-400';
  };

  const filteredClubs = clubs.filter(club =>
    selectedCategory === 'all' || club.category === selectedCategory
  );

  const joinedClubs = clubs.filter(c => c.joined).length;
  const openClubs = clubs.filter(c => c.isOpen).length;

  return (
    <div>
      <div className="mb-4 sm:mb-6">
        <h2 className="text-gray-100 mb-1">Clubs & Societies</h2>
        <p className="text-gray-400 text-sm sm:text-base">Join clubs and connect with like-minded students</p>
      </div>

      {/* Featured Banner */}
      <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 p-4 sm:p-6 rounded-lg mb-6 border border-indigo-800">
        <h3 className="text-white mb-2 text-sm sm:text-base">Club Applications Open!</h3>
        <p className="text-indigo-200 mb-3 sm:mb-4 text-xs sm:text-sm">Join your favorite clubs before December 1st</p>
        <button className="px-4 sm:px-6 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors text-sm">
          Browse All Clubs
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 text-center">
          <div className="text-indigo-400 text-lg sm:text-xl">{clubs.length}</div>
          <div className="text-gray-400 text-xs sm:text-sm mt-1">Active Clubs</div>
        </div>
        <div className="bg-green-950/30 p-3 rounded-lg border border-green-900/50 text-center">
          <div className="text-green-400 text-lg sm:text-xl">{joinedClubs}</div>
          <div className="text-gray-400 text-xs sm:text-sm mt-1">Joined</div>
        </div>
        <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 text-center">
          <div className="text-blue-400 text-lg sm:text-xl">{openClubs}</div>
          <div className="text-gray-400 text-xs sm:text-sm mt-1">Open</div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 sm:px-4 py-2 rounded-lg whitespace-nowrap text-xs sm:text-sm transition-all ${
              selectedCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredClubs.map((club) => {
          const Icon = getIcon(club.icon);
          return (
            <div
              key={club.id}
              className="bg-gray-800/50 p-4 sm:p-5 rounded-lg border border-gray-700 hover:bg-gray-800/70 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2 sm:p-3 rounded-lg ${getIconColor(club.category)}`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex gap-2">
                  {club.isOpen && (
                    <span className="px-2 sm:px-3 py-1 bg-green-900/50 text-green-400 border border-green-800 rounded-full text-xs">
                      Open
                    </span>
                  )}
                  {club.joined && (
                    <span className="px-2 sm:px-3 py-1 bg-blue-900/50 text-blue-400 border border-blue-800 rounded-full text-xs flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Joined
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-gray-100 mb-1 text-sm sm:text-base">{club.name}</h3>
              <p className="text-gray-500 text-xs sm:text-sm mb-3">{club.category}</p>
              <p className="text-gray-300 mb-4 text-xs sm:text-sm leading-relaxed">{club.description}</p>

              <div className="flex items-center justify-between mb-4 text-gray-400 text-xs sm:text-sm">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{club.members} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">{club.nextEvent}</span>
                  <span className="sm:hidden">{club.nextEvent.split('-')[0].trim()}</span>
                </div>
              </div>

              <button
                onClick={() => club.isOpen && !club.joined && openJoinModal(club)}
                disabled={!club.isOpen || club.joined}
                className={`w-full py-2 rounded-lg transition-colors text-sm ${
                  club.joined
                    ? 'bg-blue-900/50 text-blue-400 cursor-default'
                    : club.isOpen
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                {club.joined ? 'Member' : club.isOpen ? 'Join Now' : 'Applications Closed'}
              </button>
            </div>
          );
        })}
      </div>

      {filteredClubs.length === 0 && (
        <div className="text-center py-12 bg-gray-800/30 rounded-lg border border-gray-700">
          <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No clubs in this category</p>
        </div>
      )}

      {/* Join Modal */}
      {showJoinModal && selectedClub && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-100">Join Club</h3>
              <button
                onClick={() => setShowJoinModal(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-4 p-4 bg-gray-800 rounded-lg">
              <h4 className="text-gray-100 mb-1">{selectedClub.name}</h4>
              <p className="text-gray-400 text-sm mb-2">{selectedClub.category}</p>
              <p className="text-gray-300 text-sm">{selectedClub.description}</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Why do you want to join?</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your interest..."
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Your Skills/Experience (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g., Photography for 2 years"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>
              <button
                onClick={() => joinClub(selectedClub.id)}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
