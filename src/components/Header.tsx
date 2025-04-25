import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  TrophyIcon, 
  RocketLaunchIcon, 
  UserGroupIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Tournaments', icon: TrophyIcon, to: '/tournaments' },
    { name: 'Leaderboards', icon: ChartBarIcon, to: '/leaderboards' },
    { name: 'Teams', icon: UserGroupIcon, to: '/teams' },
    { name: 'Events', icon: RocketLaunchIcon, to: '/events' }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.img 
              src="/logo.svg" 
              alt="Logo" 
              className="w-8 h-8"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            />
            <span className="text-xl font-bold text-white group-hover:text-blue-500 transition-colors">
              TourneyWatch
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  to={item.to} 
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
                >
                  <item.icon className="w-5 h-5 group-hover:text-blue-500 transition-colors" />
                  <span>{item.name}</span>
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/sign-in">
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </motion.button>
            </Link>
            <Link to="/sign-up">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-lg hover:shadow-blue-500/30"
              >
                Get Started
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
}; 