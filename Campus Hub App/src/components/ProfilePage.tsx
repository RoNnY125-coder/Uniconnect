import { motion } from 'motion/react';
import { User, Mail, Phone, MapPin, Calendar, FileText, Users, Trophy, Edit, LogOut, Settings, Bell } from 'lucide-react';

interface ProfilePageProps {
  userName: string;
  onLogout: () => void;
}

export function ProfilePage({ userName, onLogout }: ProfilePageProps) {
  const stats = [
    { label: 'Events Joined', value: 5, icon: Calendar, color: 'text-blue-400' },
    { label: 'Notes Uploaded', value: 12, icon: FileText, color: 'text-purple-400' },
    { label: 'Clubs Joined', value: 3, icon: Users, color: 'text-green-400' },
    { label: 'Achievements', value: 8, icon: Trophy, color: 'text-yellow-400' },
  ];

  const recentActivity = [
    { id: 1, action: 'Joined Photography Club', time: '2 hours ago', type: 'club' },
    { id: 2, action: 'Uploaded Data Structures Notes', time: '1 day ago', type: 'notes' },
    { id: 3, action: 'Registered for AI Workshop', time: '2 days ago', type: 'event' },
    { id: 4, action: 'Completed DBMS Assignment', time: '3 days ago', type: 'assignment' },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-white text-2xl sm:text-3xl mb-2">{userName}</h1>
            <p className="text-gray-400">Department: Computer Science & Engineering</p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-center hover:bg-gray-800/70 transition-all"
              >
                <Icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                <div className="text-white text-2xl mb-1">{stat.value}</div>
                <div className="text-gray-400 text-xs">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
        >
          <h2 className="text-white mb-4 text-lg flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-400" />
            Personal Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-300">
              <Mail className="w-5 h-5 text-gray-500" />
              <div>
                <div className="text-gray-400 text-xs">Email</div>
                <div>{userName.toLowerCase().replace(' ', '.')}@university.edu</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Phone className="w-5 h-5 text-gray-500" />
              <div>
                <div className="text-gray-400 text-xs">Phone</div>
                <div>+1 (555) 123-4567</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <MapPin className="w-5 h-5 text-gray-500" />
              <div>
                <div className="text-gray-400 text-xs">Campus</div>
                <div>Main Campus, Building A</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div>
                <div className="text-gray-400 text-xs">Year</div>
                <div>3rd Year, 5th Semester</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
        >
          <h2 className="text-white mb-4 text-lg">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg"
              >
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'club' ? 'bg-green-500' :
                  activity.type === 'notes' ? 'bg-blue-500' :
                  activity.type === 'event' ? 'bg-purple-500' :
                  'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-gray-300 text-sm">{activity.action}</p>
                  <p className="text-gray-500 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-3"
        >
          <button className="w-full bg-gray-800 border border-gray-700 text-white p-4 rounded-xl hover:bg-gray-700 transition-all flex items-center justify-center gap-3">
            <Edit className="w-5 h-5" />
            <span>Edit Profile</span>
          </button>
          
          <button className="w-full bg-gray-800 border border-gray-700 text-white p-4 rounded-xl hover:bg-gray-700 transition-all flex items-center justify-center gap-3">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>

          <button className="w-full bg-gray-800 border border-gray-700 text-white p-4 rounded-xl hover:bg-gray-700 transition-all flex items-center justify-center gap-3">
            <Bell className="w-5 h-5" />
            <span>Notification Preferences</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full bg-red-900/30 border border-red-700 text-red-400 p-4 rounded-xl hover:bg-red-900/50 transition-all flex items-center justify-center gap-3"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
