import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { GraduationCap, CheckCircle, XCircle, ArrowRight, RotateCcw } from "lucide-react";

interface Question {
  id: number;
  language: string;
  options: string[];
  correct: string;
  explanation?: string;
}

export function Quiz() {
    const [questions, setQuestions] = useState<Question[]>([])
const [loading, setLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [quizCompleted, setQuizCompleted] = useState(false);
   useEffect(() => {
  fetch("http://localhost:5000/quiz")
    .then((res) => res.json())
    .then((data) => {
      setQuestions(data.questions)
      setLoading(false)
    })
}, [])
  if (loading) {
  return (
    <div className="text-white text-center mt-20 text-xl">
      Loading Quiz...
    </div>
  )
}

  const question = questions[currentQuestion];

  const handleAnswerSelect = async (answer: string) => {

  if (showExplanation) return

  setSelectedAnswer(answer)

  const question = questions[currentQuestion]

  const res = await fetch("http://localhost:5000/api/quiz/explain", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      language: question.language,
      correct: question.correct
    })
  })

  const data = await res.json()

  const updatedQuestions = [...questions]

  updatedQuestions[currentQuestion].explanation = data.explanation

  setQuestions(updatedQuestions)

  setShowExplanation(true)

  if (answer === question.correct && !answeredQuestions.has(question.id)) {
    setScore(score + 1)
    setAnsweredQuestions(new Set(answeredQuestions).add(question.id))
  }
}

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
  fetch("http://localhost:5000/quiz")
    .then((res) => res.json())
    .then((data) => {
      setQuestions(data.questions)
      setCurrentQuestion(0)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setScore(0)
      setAnsweredQuestions(new Set())
      setQuizCompleted(false)
    })
}

  if (quizCompleted) {
    return (
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-xl border-2 border-purple-500/50 rounded-2xl p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center border-2 border-purple-500/50">
              <GraduationCap className="w-10 h-10 text-purple-300" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Quiz Completed! 🎉</h2>
            <div className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
              {score} / {questions.length}
            </div>
            <p className="text-xl text-gray-300 mb-8">
              {score === questions.length
                ? "Perfect score! You're a Chomsky hierarchy master!"
                : score >= questions.length * 0.7
                ? "Great job! You have a solid understanding!"
                : "Keep learning! Practice makes perfect!"}
            </p>
            <button
              onClick={resetQuiz}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-lg font-semibold text-white transition-all flex items-center space-x-2 mx-auto"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Try Again</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-purple-500/30">
              <GraduationCap className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Theory of Computation Quiz
          </h1>
          <p className="text-gray-400 text-lg">Test your knowledge of the Chomsky hierarchy</p>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm text-purple-400 font-semibold">Score: {score}</span>
          </div>
          <div className="w-full bg-purple-900/20 rounded-full h-2 overflow-hidden border border-purple-500/30">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Question */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl border border-purple-500/30 rounded-xl p-8"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              What class does this language belong to?
            </h2>
            <div className="bg-black/40 rounded-lg p-6 border border-purple-500/30">
              <div className="text-3xl font-mono text-purple-300 text-center">{question.language}</div>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {question.options.map((option) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === question.correct;
              const showResult = showExplanation;

              return (
                <motion.button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showExplanation}
                  whileHover={!showExplanation ? { scale: 1.02 } : {}}
                  whileTap={!showExplanation ? { scale: 0.98 } : {}}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center justify-between ${
                    showResult && isCorrect
                      ? "border-green-500 bg-green-500/20"
                      : showResult && isSelected && !isCorrect
                      ? "border-red-500 bg-red-500/20"
                      : isSelected
                      ? "border-purple-500 bg-purple-500/20"
                      : "border-purple-500/30 bg-black/20 hover:border-purple-500/50 hover:bg-purple-500/10"
                  } ${showExplanation ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <span className="text-white font-medium">{option}</span>
                  {showResult && isCorrect && <CheckCircle className="w-6 h-6 text-green-400" />}
                  {showResult && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-400" />}
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-lg border-2 mb-6 ${
                selectedAnswer === question.correct
                  ? "bg-green-500/10 border-green-500/50"
                  : "bg-red-500/10 border-red-500/50"
              }`}
            >
              <div className="flex items-start space-x-3">
                {selectedAnswer === question.correct ? (
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                )}
                <div>
                  <div className="font-semibold text-white mb-2">
                    {selectedAnswer === question.correct ? "Correct!" : "Incorrect"}
                  </div>
                  <div className="text-gray-300 text-sm">{question.explanation}</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Next Button */}
          {showExplanation && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleNext}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-lg font-semibold text-white transition-all flex items-center justify-center space-x-2"
            >
              <span>{currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
