import { motion } from 'framer-motion';
import { Heart, Play, AlertTriangle, Sparkles, Lock } from 'lucide-react';

const IntroScreen = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="card bg-base-100 shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Decorative Header */}
        <div className="bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 p-8 text-white text-center relative overflow-hidden">
          {/* Animated hearts background */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
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
          
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="inline-block"
          >
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 fill-white heart-pulse" />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold mb-2"
          >
            Provocarea de Valentine's Day 💝
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-white/90"
          >
            O vânătoare de comori specială doar pentru tine
          </motion.p>
        </div>

        <div className="card-body">
          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-6"
          >
            <h2 className="text-xl font-semibold text-base-content mb-3">
              Bună, Sexy! 🌹
            </h2>
            <p className="text-base-content/70">
              Am pregătit o provocare specială pentru a testa cât de bine mă cunoști 
              (și pe noi!). Răspunde corect la toate întrebările pentru a debloca 
              cadoul tău de Valentine's Day!
            </p>
          </motion.div>

          {/* Rules */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-3 mb-6"
          >
            <div className="flex items-start gap-3 p-3 bg-success/10 rounded-lg border border-success/30">
              <Sparkles className="w-5 h-5 text-success mt-0.5 shrink-0" />
              <p className="text-sm text-base-content/80">
                <strong className="text-success">Obiectiv:</strong> Răspunde corect la fiecare 
                întrebare pentru a avansa prin provocare și a descoperi surpriza ta!
              </p>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg border border-warning/30">
              <AlertTriangle className="w-5 h-5 text-warning mt-0.5 shrink-0" />
              <p className="text-sm text-base-content/80">
                <strong className="text-warning">Atenție!</strong> Un răspuns greșit te va 
                bloca pentru <strong>10 minute</strong>! Gândește-te bine înainte să răspunzi.
              </p>
            </div>

            <div className="flex items-start gap-3 p-3 bg-info/10 rounded-lg border border-info/30">
              <Lock className="w-5 h-5 text-info mt-0.5 shrink-0" />
              <p className="text-sm text-base-content/80">
                <strong className="text-info">Anti-Trișare:</strong> Blocarea persistă 
                chiar dacă reîmprospătezi sau închizi browser-ul. Fără scurtături! 😏
              </p>
            </div>
          </motion.div>

          {/* Start Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="card-actions justify-center"
          >
            <motion.button
              onClick={onStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary btn-lg gap-2 px-8"
            >
              <Play className="w-5 h-5" />
              Începe Provocarea
              <Heart className="w-5 h-5 fill-current" />
            </motion.button>
          </motion.div>

          {/* Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-xs text-base-content/50 mt-4"
          >
            Făcut cu 💕 doar pentru tine
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default IntroScreen;
