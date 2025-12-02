import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { EventsPage } from './components/EventsPage';
import { NotesPage } from './components/NotesPage';
import { AssignmentsPage } from './components/AssignmentsPage';
import { ProfilePage } from './components/ProfilePage';
import { BottomNav } from './components/BottomNav';

type Screen = 'splash' | 'login' | 'dashboard' | 'events' | 'notes' | 'assignments' | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Show splash screen for 2.5 seconds
    const timer = setTimeout(() => {
      setCurrentScreen('login');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (name: string) => {
    setUserName(name);
    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName('');
    setCurrentScreen('login');
  };

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Screens */}
      {currentScreen === 'splash' && <SplashScreen />}
      
      {currentScreen === 'login' && (
        <LoginScreen onLogin={handleLogin} />
      )}

      {isAuthenticated && (
        <>
          <div className="pb-20">
            {currentScreen === 'dashboard' && (
              <Dashboard userName={userName} navigateTo={navigateTo} />
            )}
            {currentScreen === 'events' && <EventsPage />}
            {currentScreen === 'notes' && <NotesPage />}
            {currentScreen === 'assignments' && <AssignmentsPage />}
            {currentScreen === 'profile' && (
              <ProfilePage userName={userName} onLogout={handleLogout} />
            )}
          </div>
          
          <BottomNav currentScreen={currentScreen} navigateTo={navigateTo} />
        </>
      )}
    </div>
  );
}
