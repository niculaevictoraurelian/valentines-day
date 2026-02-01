import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, X } from 'lucide-react';

const ValentineQuestion = ({ onAnswer }) => {
  const [yesScale, setYesScale] = useState(1);
  const [noClicks, setNoClicks] = useState(0);

  const handleNoClick = () => {
    const newClicks = noClicks + 1;
    setNoClicks(newClicks);
    // Increase yes button size exponentially
    setYesScale(1 + newClicks * 0.5);
  };

  const handleYesClick = () => {
    onAnswer('Da');
  };

  // Calculate if yes button should cover the screen
  const isYesGiant = yesScale > 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.95 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="card bg-base-100 shadow-2xl max-w-lg w-full mx-auto overflow-hidden"
    >
      <div className="card-body items-center text-center relative">
        {/* Floating hearts */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300 pointer-events-none"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            <Heart className="w-6 h-6 fill-current" />
          </motion.div>
        ))}

        {/* Heart Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="mb-6"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg">
            <Heart className="w-12 h-12 text-white fill-white heart-pulse" />
          </div>
        </motion.div>

        {/* Question */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-bold text-primary mb-8 leading-relaxed"
        >
          Vrei să fii Valentine-ul meu? 💝
        </motion.h2>

        {/* Buttons Container */}
        <div className={`flex gap-4 items-center justify-center ${isYesGiant ? 'fixed inset-0 z-50 bg-pink-100/90' : ''}`}>
          {/* Yes Button - Gets bigger */}
          <motion.button
            onClick={handleYesClick}
            animate={{ 
              scale: yesScale,
            }}
            whileHover={{ scale: yesScale * 1.1 }}
            whileTap={{ scale: yesScale * 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`
              btn btn-primary gap-2 
              ${isYesGiant ? 'btn-lg text-2xl px-12 py-8' : 'px-8'}
            `}
            style={{
              fontSize: isYesGiant ? '2rem' : `${1 + (yesScale - 1) * 0.3}rem`,
              padding: isYesGiant ? '2rem 4rem' : undefined
            }}
          >
            <Heart className={`fill-current ${isYesGiant ? 'w-10 h-10' : 'w-5 h-5'}`} />
            Da! 💕
          </motion.button>

          {/* No Button - Gets smaller and runs away */}
          {!isYesGiant && (
            <motion.button
              onClick={handleNoClick}
              animate={{
                scale: Math.max(0.3, 1 - noClicks * 0.15),
                x: noClicks > 0 ? (Math.random() - 0.5) * 100 : 0,
                y: noClicks > 0 ? (Math.random() - 0.5) * 50 : 0,
                opacity: Math.max(0.3, 1 - noClicks * 0.1)
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              className="btn btn-outline btn-error gap-2 px-8"
            >
              <X className="w-5 h-5" />
              Nu
            </motion.button>
          )}
        </div>

        {/* Teasing message when clicking No */}
        {noClicks > 0 && !isYesGiant && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-base-content/70 italic"
          >
            {noClicks === 1 && "Sigur? Uită-te mai bine la opțiuni... 😏"}
            {noClicks === 2 && "Hmm, butonul 'Da' pare mai atrăgător acum... 💕"}
            {noClicks === 3 && "Aproape ai înțeles ideea! 😘"}
            {noClicks >= 4 && "Hai, știi că vrei să apeși 'Da'! 💝"}
          </motion.p>
        )}

        {/* Message when yes is giant */}
        {isYesGiant && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed bottom-20 left-0 right-0 text-center z-50"
          >
            <p className="text-2xl text-primary font-bold">
              Acum nu prea ai de ales... 😘💕
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ValentineQuestion;
