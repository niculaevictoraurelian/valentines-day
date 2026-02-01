import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, HelpCircle, Send, ChevronRight } from 'lucide-react';
import { IMaskInput } from 'react-imask';

const QuizCard = ({ question, onAnswer, isLast }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [textAnswer, setTextAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);

  // Check if this is a date input question
  const isDateInput = question.inputType === 'date';

  const handleSubmit = (e) => {
    e.preventDefault();
    const answer = question.type === 'radio' ? selectedAnswer : textAnswer;
    if (answer.trim()) {
      onAnswer(answer);
      setSelectedAnswer('');
      setTextAnswer('');
      setShowHint(false);
    }
  };

  const isAnswerSelected = question.type === 'radio' 
    ? selectedAnswer !== '' 
    : textAnswer.trim() !== '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.95 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="card bg-base-100 shadow-2xl max-w-lg w-full mx-auto"
    >
      <form onSubmit={handleSubmit} className="card-body">
        {/* Question */}
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="card-title text-xl md:text-2xl text-primary mb-6 leading-relaxed"
        >
          {question.question}
        </motion.h2>

        {/* Radio Options */}
        {question.type === 'radio' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            {question.options.map((option, index) => (
              <motion.label
                key={option}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`
                  flex items-center gap-3 p-4 rounded-xl cursor-pointer
                  border-2 transition-all duration-200
                  ${selectedAnswer === option 
                    ? 'border-primary bg-primary/10 shadow-md' 
                    : 'border-base-300 hover:border-primary/50 hover:bg-base-200'
                  }
                `}
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  className="radio radio-primary"
                />
                <span className="text-base-content flex-1">{option}</span>
                {selectedAnswer === option && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </motion.div>
                )}
              </motion.label>
            ))}
          </motion.div>
        )}

        {/* Text Input */}
        {question.type === 'text' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="form-control">
              <div className="relative">
                {isDateInput ? (
                  // Date input with mask DD/MM/YYYY
                  <IMaskInput
                    mask="00/00/0000"
                    value={textAnswer}
                    unmask={false}
                    onAccept={(value) => setTextAnswer(value)}
                    placeholder="ZZ/LL/AAAA"
                    className="input input-bordered input-primary w-full pr-12 text-lg"
                    autoComplete="off"
                  />
                ) : (
                  // Regular text input
                  <input
                    type="text"
                    value={textAnswer}
                    onChange={(e) => setTextAnswer(e.target.value)}
                    placeholder="Scrie răspunsul tău aici..."
                    className="input input-bordered input-primary w-full pr-12 text-lg"
                    autoComplete="off"
                  />
                )}
                {textAnswer && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <CheckCircle className="w-5 h-5 text-success" />
                  </motion.div>
                )}
              </div>
              <label className="label">
                <span className="label-text-alt text-base-content/60 pt-2">
                  {isDateInput 
                    ? "Doar scrie numerele, slash-urile apar automat! 📅" 
                    : "Nu-ți face griji, nu contează literele mari/mici 😉"
                  }
                </span>
              </label>
            </div>
          </motion.div>
        )}

        {/* Hint Section */}
        {question.hint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4"
          >
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="btn btn-ghost btn-sm text-secondary gap-2"
            >
              <HelpCircle className="w-4 h-4" />
              {showHint ? 'Ascunde Indiciul' : 'Ai nevoie de un indiciu?'}
            </button>
            
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 p-3 bg-secondary/10 rounded-lg border border-secondary/30"
              >
                <p className="text-secondary text-sm italic">
                  💡 {question.hint}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-actions justify-end mt-6"
        >
          <button
            type="submit"
            disabled={!isAnswerSelected}
            className={`
              btn btn-primary gap-2 px-8
              ${!isAnswerSelected ? 'btn-disabled' : ''}
            `}
          >
            {isLast ? (
              <>
                <Send className="w-5 h-5" />
                Dezvăluie Cadoul!
              </>
            ) : (
              <>
                Următoarea Întrebare
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default QuizCard;
