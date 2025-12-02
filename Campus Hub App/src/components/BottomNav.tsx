import { Home, FileText, Bell, User } from 'lucide-react';

interface BottomNavProps {
  currentScreen: string;
  navigateTo: (screen: string) => void;
}

export function BottomNav({ currentScreen, navigateTo }: BottomNavProps) {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'events', label: 'Events', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/95 border-t border-gray-800 backdrop-blur-lg z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`flex flex-col items-center py-3 px-6 transition-all duration-200 relative ${
                  isActive ? 'text-indigo-400' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-indigo-500 rounded-b-full"></div>
                )}
                <Icon className={`w-6 h-6 mb-1 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
