import { motion } from 'motion/react';
import { Bell, User, Search, Calendar, FileText, Briefcase, Users, TrendingUp, Clock } from 'lucide-react';

interface DashboardProps {
  userName: string;
  navigateTo: (screen: string) => void;
}

export function Dashboard({ userName, navigateTo }: DashboardProps) {
  const highlights = [
    {
      id: 1,
      title: 'AI Workshop & Hackathon',
      time: 'Today 6:00 PM',
      type: 'event',
      urgent: true,
    },
    {
      id: 2,
      title: 'Data Structures Assignment',
      time: 'Due Tomorrow',
      type: 'assignment',
      urgent: true,
    },
    {
      id: 3,
      title: 'Photography Club Meet',
      time: 'Dec 2, 4:00 PM',
      type: 'club',
      urgent: false,
    },
  ];

  const quickAccess = [
    { id: 1, label: 'Notes', icon: FileText, color: 'from-blue-600 to-blue-700', screen: 'notes' },
    { id: 2, label: 'Events', icon: Calendar, color: 'from-purple-600 to-purple-700', screen: 'events' },
    { id: 3, label: 'Jobs', icon: Briefcase, color: 'from-green-600 to-green-700', screen: 'assignments' },
    { id: 4, label: 'Clubs', icon: Users, color: 'from-pink-600 to-pink-700', screen: 'events' },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-b border-gray-800 sticky top-0 z-10 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white text-xl sm:text-2xl">Hi, {userName} 👋</h1>
              <p className="text-gray-400 text-sm mt-1">Welcome back to UniConnect</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={() => navigateTo('profile')}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search events, notes, assignments..."
              className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-indigo-900/30 to-indigo-800/30 border border-indigo-800/50 rounded-xl p-4 text-center"
          >
            <TrendingUp className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
            <div className="text-white text-xl">12</div>
            <div className="text-gray-400 text-xs mt-1">Events</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-800/50 rounded-xl p-4 text-center"
          >
            <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-white text-xl">5</div>
            <div className="text-gray-400 text-xs mt-1">Due Soon</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-pink-900/30 to-pink-800/30 border border-pink-800/50 rounded-xl p-4 text-center"
          >
            <Users className="w-6 h-6 text-pink-400 mx-auto mb-2" />
            <div className="text-white text-xl">8</div>
            <div className="text-gray-400 text-xs mt-1">Clubs</div>
          </motion.div>
        </div>

        {/* Today's Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-white mb-4 flex items-center gap-2">
            <span className="text-xl">Today's Highlights</span>
            <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
              {highlights.filter(h => h.urgent).length} Urgent
            </span>
          </h2>
          <div className="space-y-3">
            {highlights.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`bg-gray-800/50 border ${
                  item.urgent ? 'border-red-500/30 bg-red-950/20' : 'border-gray-700'
                } rounded-xl p-4 hover:bg-gray-800/70 transition-all cursor-pointer`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-gray-100">{item.title}</h3>
                      {item.urgent && (
                        <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {item.time}
                    </p>
                  </div>
                  <div className="w-6 h-6 rounded border-2 border-gray-600 hover:border-indigo-500 transition-colors cursor-pointer"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-white mb-4 text-xl">Quick Access</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {quickAccess.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  onClick={() => navigateTo(item.screen)}
                  className={`bg-gradient-to-br ${item.color} rounded-xl p-6 hover:scale-105 transition-transform shadow-lg hover:shadow-xl`}
                >
                  <Icon className="w-8 h-8 text-white mx-auto mb-3" />
                  <div className="text-white">{item.label}</div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-gray-800/30 border border-gray-700 rounded-xl p-6"
        >
          <h2 className="text-white mb-4 text-xl">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-300">You joined Photography Club</span>
              <span className="text-gray-500 ml-auto">2h ago</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-300">New notes uploaded in CS101</span>
              <span className="text-gray-500 ml-auto">5h ago</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-300">Hackathon registration confirmed</span>
              <span className="text-gray-500 ml-auto">1d ago</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
