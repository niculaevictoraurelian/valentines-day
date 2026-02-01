import { motion } from 'framer-motion';

const ProgressBar = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <div className="w-full max-w-lg mx-auto mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-base-content/60">
          Întrebarea {current} din {total}
        </span>
        <span className="text-sm font-medium text-primary">
          {Math.round(progress)}% Completat
        </span>
      </div>
      
      <div className="w-full bg-base-300 rounded-full h-3 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      
      {/* Heart markers */}
      <div className="relative w-full h-2 mt-1">
        {[...Array(total)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-3 h-3 rounded-full transition-colors duration-300 ${
              i < current ? 'bg-primary' : 'bg-base-300'
            }`}
            style={{ left: `${((i + 1) / total) * 100 - 2}%` }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
