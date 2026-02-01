import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Gift, MapPin, Clock, ExternalLink, Sparkles, Calendar, Home } from 'lucide-react';
import { TARGET_DATE, GIFT_CONFIG } from '../data/questions';

const GiftReveal = () => {
  const [isTimeReached, setIsTimeReached] = useState(false);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const targetTime = TARGET_DATE.getTime();
      const currentTime = now.getTime();

      if (currentTime >= targetTime) {
        setIsTimeReached(true);
        setCountdown(null);
      } else {
        setIsTimeReached(false);
        const diff = targetTime - currentTime;
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        });
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Confetti effect when gift is revealed
  useEffect(() => {
    if (isTimeReached) {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          particleCount,
          startVelocity: 30,
          spread: 360,
          origin: {
            x: randomInRange(0.1, 0.9),
            y: Math.random() - 0.2
          },
          colors: ['#ff69b4', '#ff1493', '#ff6b6b', '#ffd700', '#ff85a2']
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isTimeReached]);

  // Teaser Screen (Before the Target Date)
  if (!isTimeReached) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center p-4"
      >
        <div className="card bg-base-100 shadow-2xl max-w-lg w-full overflow-hidden">
          {/* Header Animation */}
          <div className="bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 p-6 text-white text-center relative overflow-hidden">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
              className="inline-block"
            >
              <Sparkles className="w-12 h-12 mx-auto mb-2" />
            </motion.div>
            <h2 className="text-2xl font-bold">Felicitări! 🎉</h2>
            <p className="text-white/90 mt-1">Ai completat provocarea!</p>
            
            {/* Floating hearts background */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-white/20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              >
                <Heart className="w-4 h-4 fill-current" />
              </motion.div>
            ))}
          </div>

          <div className="card-body items-center text-center">
            {/* Lock Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.3 }}
              className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4"
            >
              <Gift className="w-10 h-10 text-primary floating" />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl font-bold text-base-content mb-2"
            >
              Ai dovedit că mă cunoști! 💕
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base-content/70 mb-6"
            >
              Dar răbdarea este o virtute, iubirea mea...<br />
              Cadoul tău se deblochează în seara de Valentine's Day!
            </motion.p>

            {/* Countdown */}
            {countdown && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="w-full"
              >
                <div className="flex items-center justify-center gap-2 text-sm text-base-content/60 mb-4">
                  <Clock className="w-4 h-4" />
                  <span>Cadoul se deblochează în:</span>
                </div>

                <div className="grid grid-flow-col gap-3 text-center auto-cols-max justify-center">
                  <div className="flex flex-col p-3 bg-primary/10 rounded-box">
                    <span className="countdown font-mono text-3xl text-primary">
                      <span style={{ "--value": countdown.days }}>{countdown.days}</span>
                    </span>
                    <span className="text-xs text-base-content/60">zile</span>
                  </div>
                  <div className="flex flex-col p-3 bg-primary/10 rounded-box">
                    <span className="countdown font-mono text-3xl text-primary">
                      <span style={{ "--value": countdown.hours }}>{countdown.hours}</span>
                    </span>
                    <span className="text-xs text-base-content/60">ore</span>
                  </div>
                  <div className="flex flex-col p-3 bg-primary/10 rounded-box">
                    <span className="countdown font-mono text-3xl text-primary">
                      <span style={{ "--value": countdown.minutes }}>{countdown.minutes}</span>
                    </span>
                    <span className="text-xs text-base-content/60">min</span>
                  </div>
                  <div className="flex flex-col p-3 bg-primary/10 rounded-box">
                    <span className="countdown font-mono text-3xl text-primary">
                      <span style={{ "--value": countdown.seconds }}>{countdown.seconds}</span>
                    </span>
                    <span className="text-xs text-base-content/60">sec</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 mt-4 text-sm text-base-content/50">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {TARGET_DATE.toLocaleDateString('ro-RO', { 
                      weekday: 'long',
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Teaser Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 p-4 bg-base-200 rounded-xl"
            >
              <p className="text-sm text-base-content/70 italic">
                "Cele mai bune lucruri din viață merită așteptate..."<br />
                <span className="text-primary font-medium">— Admiratorul Tău Secret 💝</span>
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Gift Reveal Screen (After the Target Date)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="card bg-base-100 shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Celebration Header */}
        <div className="relative">
          {GIFT_CONFIG.giftImage && (
            <motion.img
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              src={GIFT_CONFIG.giftImage}
              alt="Cadoul Tău"
              className="w-full h-48 object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-base-100 to-transparent" />
          
          {/* Floating hearts overlay */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-pink-400"
                initial={{
                  x: `${Math.random() * 100}%`,
                  y: '100%',
                  opacity: 0.7,
                  scale: 0.5 + Math.random() * 0.5
                }}
                animate={{
                  y: '-20%',
                  opacity: 0,
                  rotate: Math.random() * 360
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: 'linear'
                }}
              >
                <Heart className="w-6 h-6 fill-current" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="card-body items-center text-center -mt-8 relative z-10">
          {/* Gift Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg mb-4"
          >
            <Gift className="w-10 h-10 text-white" />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold text-primary mb-2"
          >
            {GIFT_CONFIG.giftTitle} 🎁
          </motion.h2>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-base-content/80 text-lg mb-4"
          >
            {GIFT_CONFIG.message}
          </motion.p>

          {/* Gift Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="w-full p-4 bg-primary/10 rounded-xl mb-4"
          >
            <p className="text-base-content font-medium">
              {GIFT_CONFIG.giftDescription}
            </p>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-2 text-secondary mb-6"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">{GIFT_CONFIG.location}</span>
          </motion.div>

          {/* Link Button */}
          {GIFT_CONFIG.giftLink && (
            <motion.a
              href={GIFT_CONFIG.giftLink}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary btn-lg gap-2"
            >
              {GIFT_CONFIG.giftLinkText}
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          )}

          {/* Love Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 flex items-center gap-2 text-primary"
          >
            <Heart className="w-5 h-5 fill-current heart-pulse" />
            <span className="font-medium">Te iubesc! La mulți ani de Valentine's Day!</span>
            <Heart className="w-5 h-5 fill-current heart-pulse" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default GiftReveal;
