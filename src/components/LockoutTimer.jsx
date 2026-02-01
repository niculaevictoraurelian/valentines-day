import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, Timer, AlertCircle } from 'lucide-react';
import { LOCKOUT_DURATION_MINUTES, LOCKOUT_MESSAGES } from '../data/questions';

const LockoutTimer = ({ lockoutEnd, onLockoutEnd }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [message] = useState(() => 
    LOCKOUT_MESSAGES[Math.floor(Math.random() * LOCKOUT_MESSAGES.length)]
  );

  function calculateTimeLeft() {
    const difference = lockoutEnd - Date.now();
    if (difference <= 0) return null;
    
    return {
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      total: difference
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      
      if (!newTimeLeft) {
        clearInterval(timer);
        onLockoutEnd();
        return;
      }
      
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [lockoutEnd, onLockoutEnd]);

  const formatTime = (num) => String(num).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="card bg-base-100 shadow-2xl max-w-md w-full">
        <div className="card-body items-center text-center">
          {/* Animated Lock Icon */}
          <motion.div
            animate={{ 
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 2
            }}
            className="mb-4"
          >
            <div className="w-24 h-24 rounded-full bg-error/20 flex items-center justify-center">
              <Lock className="w-12 h-12 text-error" />
            </div>
          </motion.div>

          {/* Title */}
          <h2 className="card-title text-2xl text-error mb-2">
            <AlertCircle className="w-6 h-6" />
            Quiz Blocat!
          </h2>

          {/* Funny Message */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg mb-6 text-base-content/80"
          >
            {message}
          </motion.p>

          {/* Timer Display */}
          {timeLeft && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-6"
            >
              <div className="flex items-center gap-2 text-sm text-base-content/60 mb-3">
                <Timer className="w-4 h-4" />
                <span>Timp până poți încerca din nou:</span>
              </div>
              
              <div className="flex gap-4 justify-center">
                <div className="flex flex-col items-center">
                  <span className="countdown font-mono text-5xl text-primary">
                    <span style={{ "--value": timeLeft.minutes }}>{formatTime(timeLeft.minutes)}</span>
                  </span>
                  <span className="text-xs text-base-content/60 mt-1">minute</span>
                </div>
                <span className="text-5xl text-primary">:</span>
                <div className="flex flex-col items-center">
                  <span className="countdown font-mono text-5xl text-primary">
                    <span style={{ "--value": timeLeft.seconds }}>{formatTime(timeLeft.seconds)}</span>
                  </span>
                  <span className="text-xs text-base-content/60 mt-1">secunde</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Progress Bar */}
          <div className="w-full mb-4">
            <progress 
              className="progress progress-error w-full" 
              value={timeLeft ? (LOCKOUT_DURATION_MINUTES * 60 * 1000 - timeLeft.total) : 100} 
              max={LOCKOUT_DURATION_MINUTES * 60 * 1000}
            />
          </div>

          {/* Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-sm text-base-content/50 flex items-center gap-2"
          >
            <Heart className="w-4 h-4 text-primary heart-pulse" />
            <span>Folosește acest timp să te gândești la amintirile noastre...</span>
            <Heart className="w-4 h-4 text-primary heart-pulse" />
          </motion.div>

          {/* Decorative Hearts */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-pink-200"
                initial={{ 
                  x: Math.random() * 100 + '%',
                  y: '100%',
                  opacity: 0.3
                }}
                animate={{ 
                  y: '-20%',
                  opacity: 0
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: 'linear'
                }}
              >
                <Heart className="w-6 h-6 fill-current" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LockoutTimer;
