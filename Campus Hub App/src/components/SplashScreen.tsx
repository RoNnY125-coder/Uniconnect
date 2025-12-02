import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export function SplashScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-gray-950 to-purple-950 flex items-center justify-center p-4">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-50 rounded-full"></div>
            <Sparkles className="w-24 h-24 text-indigo-400 relative z-10" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-white mb-4 tracking-wider"
          style={{ fontSize: '3rem', fontWeight: 'bold' }}
        >
          UNI CONNECT
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-indigo-300 text-xl mb-12"
        >
          Your Campus Hub
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-48 h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 1, duration: 1.5, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
            />
          </div>
          <p className="text-gray-400 text-sm">Loading...</p>
        </motion.div>
      </div>
    </div>
  );
}
