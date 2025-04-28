import { motion } from 'framer-motion';

interface LoadingScreenProps {
  message?: string;
  fullScreen?: boolean;
  spinnerSize?: string;
  spinnerColor?: string;
  dotsColor?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Loading',
  fullScreen = true,
  spinnerSize = '20',
  spinnerColor = '#FF6B6B',
  dotsColor = 'white',
}) => {
  const containerClasses = fullScreen 
    ? 'min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center'
    : 'w-full h-full flex items-center justify-center';

  const dotAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: 'reverse' as const,
    },
  };

  return (
    <div className={containerClasses}>
      <motion.div 
        className="flex flex-col items-center justify-center gap-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Spinner with gradient background */}
        <div className={`relative w-${spinnerSize} h-${spinnerSize}`}>
          <div className="absolute inset-0 rounded-full bg-none" />
          <motion.div
            className={`absolute inset-0 rounded-full border-4 border-transparent border-t-[${spinnerColor}]`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-2 rounded-full bg-none" />
        </div>

        {/* Loading text with dots */}
        <div className="flex items-center gap-1">
          <p className="text-white/90 text-xl font-medium tracking-wide">
            {message}
          </p>
          <div className="flex gap-1">
            {[0, 1, 2].map((index) => (
              <motion.span
                key={index}
                className="text-white/90 text-xl"
                style={{ color: dotsColor }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ...dotAnimation.transition, delay: index * 0.2 }}
              >
                .
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
