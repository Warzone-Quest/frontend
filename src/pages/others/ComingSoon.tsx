import { motion } from 'framer-motion';
import { RocketLaunchIcon, ClockIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({ text: 'Thank you! We\'ll notify you when we launch.', type: 'success' });
      setEmail('');
    } catch (error) {
      setMessage({ text: 'Something went wrong. Please try again.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/10"
          >
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-to-br from-[#0f3460] to-[#16213e] p-4 rounded-full">
                <RocketLaunchIcon className="h-12 w-12 text-white" />
              </div>
            </div>

            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Coming Soon
            </motion.h1>

            <motion.p 
              className="text-xl text-white/70 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              We're working hard to bring you something amazing. Stay tuned!
            </motion.p>

            <motion.div 
              className="flex items-center justify-center gap-2 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <ClockIcon className="h-5 w-5 text-white/70" />
              <span className="text-white/70">Launching in Q1 2026</span>
            </motion.div>

            <motion.div
              className="max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <form onSubmit={handleSubmit}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-white/70" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email to get notified"
                    className="block w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-[#0f3460] to-[#16213e] text-white rounded-lg hover:from-[#16213e] hover:to-[#0f3460] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Sending...' : 'Notify Me'}
                  </button>
                </div>
                {message && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 text-sm ${
                      message.type === 'success' ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {message.text}
                  </motion.p>
                )}
              </form>
            </motion.div>

            <motion.div
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-2">New Features</h3>
                <p className="text-white/70">Exciting new features are in development to enhance your experience.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-2">Improved UI</h3>
                <p className="text-white/70">A fresh, modern interface designed for better usability.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-2">Enhanced Security</h3>
                <p className="text-white/70">Advanced security measures to protect your data and privacy.</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}; 