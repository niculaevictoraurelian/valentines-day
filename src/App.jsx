import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import IntroScreen from './components/IntroScreen';
import QuizCard from './components/QuizCard';
import ValentineQuestion from './components/ValentineQuestion';
import ProgressBar from './components/ProgressBar';
import LockoutTimer from './components/LockoutTimer';
import GiftReveal from './components/GiftReveal';
import { QUESTIONS, LOCKOUT_DURATION_MINUTES } from './data/questions';

// LocalStorage keys
const STORAGE_KEYS = {
  LOCKOUT_END: 'valentine_lockout_end',
  CURRENT_QUESTION: 'valentine_current_question',
  QUIZ_COMPLETED: 'valentine_quiz_completed',
  QUIZ_STARTED: 'valentine_quiz_started'
};

// Normalize text: remove diacritics and convert to lowercase
const normalizeText = (text) => {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
    .replace(/ă/g, 'a')
    .replace(/â/g, 'a')
    .replace(/î/g, 'i')
    .replace(/ș/g, 's')
    .replace(/ț/g, 't');
};

function App() {
  // App state
  const [gameState, setGameState] = useState('loading'); // loading, intro, quiz, lockout, success
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lockoutEnd, setLockoutEnd] = useState(null);

  // Initialize state from localStorage
  useEffect(() => {
    const savedLockoutEnd = localStorage.getItem(STORAGE_KEYS.LOCKOUT_END);
    const savedQuestionIndex = localStorage.getItem(STORAGE_KEYS.CURRENT_QUESTION);
    const quizCompleted = localStorage.getItem(STORAGE_KEYS.QUIZ_COMPLETED);
    const quizStarted = localStorage.getItem(STORAGE_KEYS.QUIZ_STARTED);

    // Check if quiz is completed
    if (quizCompleted === 'true') {
      setGameState('success');
      return;
    }

    // Check for active lockout
    if (savedLockoutEnd) {
      const lockoutTime = parseInt(savedLockoutEnd, 10);
      if (Date.now() < lockoutTime) {
        setLockoutEnd(lockoutTime);
        setGameState('lockout');
        // Also restore the question index during lockout
        if (savedQuestionIndex) {
          setCurrentQuestionIndex(parseInt(savedQuestionIndex, 10));
        }
        return;
      } else {
        // Lockout expired, clean up
        localStorage.removeItem(STORAGE_KEYS.LOCKOUT_END);
      }
    }

    // Restore question progress
    if (savedQuestionIndex) {
      setCurrentQuestionIndex(parseInt(savedQuestionIndex, 10));
    }

    // Determine initial game state
    if (quizStarted === 'true') {
      setGameState('quiz');
    } else {
      setGameState('intro');
    }
  }, []);

  // Start the quiz
  const handleStart = useCallback(() => {
    localStorage.setItem(STORAGE_KEYS.QUIZ_STARTED, 'true');
    setGameState('quiz');
  }, []);

  // Handle answer submission
  const handleAnswer = useCallback((answer) => {
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    
    // Special handling for valentine type questions (always correct when "Da" is clicked)
    if (currentQuestion.type === 'valentine') {
      // Valentine question is always "correct" when they click Da
      const nextIndex = currentQuestionIndex + 1;
      
      if (nextIndex >= QUESTIONS.length) {
        localStorage.setItem(STORAGE_KEYS.QUIZ_COMPLETED, 'true');
        localStorage.removeItem(STORAGE_KEYS.CURRENT_QUESTION);
        localStorage.removeItem(STORAGE_KEYS.QUIZ_STARTED);
        setGameState('success');
      } else {
        localStorage.setItem(STORAGE_KEYS.CURRENT_QUESTION, nextIndex.toString());
        setCurrentQuestionIndex(nextIndex);
      }
      return;
    }
    
    const isCorrect = currentQuestion.type === 'text'
      ? normalizeText(answer) === normalizeText(currentQuestion.answer)
      : answer === currentQuestion.answer;

    if (isCorrect) {
      // Correct answer!
      const nextIndex = currentQuestionIndex + 1;
      
      if (nextIndex >= QUESTIONS.length) {
        // Quiz completed!
        localStorage.setItem(STORAGE_KEYS.QUIZ_COMPLETED, 'true');
        localStorage.removeItem(STORAGE_KEYS.CURRENT_QUESTION);
        localStorage.removeItem(STORAGE_KEYS.QUIZ_STARTED);
        setGameState('success');
      } else {
        // Move to next question
        localStorage.setItem(STORAGE_KEYS.CURRENT_QUESTION, nextIndex.toString());
        setCurrentQuestionIndex(nextIndex);
      }
    } else {
      // Wrong answer - activate lockout
      const lockoutEndTime = Date.now() + LOCKOUT_DURATION_MINUTES * 60 * 1000;
      localStorage.setItem(STORAGE_KEYS.LOCKOUT_END, lockoutEndTime.toString());
      setLockoutEnd(lockoutEndTime);
      setGameState('lockout');
    }
  }, [currentQuestionIndex]);

  // Handle lockout end
  const handleLockoutEnd = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.LOCKOUT_END);
    setLockoutEnd(null);
    setGameState('quiz');
  }, []);

  // Loading state
  if (gameState === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Heart className="w-16 h-16 text-primary fill-current" />
        </motion.div>
      </div>
    );
  }

  // Get current question to check its type
  const currentQuestion = QUESTIONS[currentQuestionIndex];

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Background floating hearts */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              rotate: [0, 360],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear'
            }}
          >
            <Heart className="w-8 h-8 fill-current" />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {/* Intro Screen */}
          {gameState === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <IntroScreen onStart={handleStart} />
            </motion.div>
          )}

          {/* Quiz Screen */}
          {gameState === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-lg mx-auto"
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-6"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Heart className="w-6 h-6 text-primary fill-current heart-pulse" />
                  <h1 className="text-2xl font-bold text-primary">Quiz de Valentine's Day</h1>
                  <Heart className="w-6 h-6 text-primary fill-current heart-pulse" />
                </div>
                <p className="text-base-content/60 text-sm">
                  Cât de bine mă cunoști? Hai să aflăm! 💕
                </p>
              </motion.div>

              {/* Progress Bar */}
              <ProgressBar 
                current={currentQuestionIndex + 1} 
                total={QUESTIONS.length} 
              />

              {/* Question Card - Use ValentineQuestion for valentine type */}
              <AnimatePresence mode="wait">
                {currentQuestion?.type === 'valentine' ? (
                  <ValentineQuestion
                    key={currentQuestionIndex}
                    onAnswer={handleAnswer}
                  />
                ) : (
                  <QuizCard
                    key={currentQuestionIndex}
                    question={currentQuestion}
                    onAnswer={handleAnswer}
                    isLast={currentQuestionIndex === QUESTIONS.length - 1}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Lockout Screen */}
          {gameState === 'lockout' && lockoutEnd && (
            <motion.div
              key="lockout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LockoutTimer 
                lockoutEnd={lockoutEnd} 
                onLockoutEnd={handleLockoutEnd} 
              />
            </motion.div>
          )}

          {/* Success/Gift Reveal Screen */}
          {gameState === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GiftReveal />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-4 left-0 right-0 text-center text-xs text-base-content/30"
      >
        Făcut cu 💖 pentru Valentine-ul meu
      </motion.footer>
    </div>
  );
}

export default App;
