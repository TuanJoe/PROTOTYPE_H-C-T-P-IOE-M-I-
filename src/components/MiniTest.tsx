import React, { useState } from 'react';
import { X, Lightbulb, MessageCircle, ArrowRight, RotateCcw, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../AppContext';
import { getMasteryLevel, getLevelBadge } from '../types';

const QUESTIONS = [
  {
    id: 1,
    question: "What is the opposite of 'Big'?",
    options: [
      "Small",
      "Tall",
      "Short",
      "Long"
    ],
    correct: 0,
    hint: "Hãy nghĩ về một chú kiến nhỏ xíu so với một chú voi khổng lồ nhé!"
  },
  {
    id: 2,
    question: "Which one is a fruit?",
    options: [
      "Carrot",
      "Apple",
      "Potato",
      "Onion"
    ],
    correct: 1,
    hint: "Đây là một loại quả màu đỏ, giòn và rất ngọt đấy!"
  },
  {
    id: 3,
    question: "How many legs does a spider have?",
    options: [
      "Four",
      "Six",
      "Eight",
      "Ten"
    ],
    correct: 2,
    hint: "Nhện có nhiều chân hơn chó và mèo, hãy đếm kỹ nhé!"
  },
  // Mocking 10 questions for the logic
  ...Array(7).fill(null).map((_, i) => ({
    id: i + 4,
    question: `Câu hỏi tiếng Anh lớp ${i + 1}?`,
    options: ["Đáp án đúng", "Đáp án sai 1", "Đáp án sai 2", "Đáp án sai 3"],
    correct: 0,
    hint: "Đây là một câu hỏi mẫu. Hãy chọn đáp án đầu tiên để tiếp tục hành trình nhé!"
  }))
];

export const MiniTest: React.FC<{ unitId: string; onComplete: (result: any) => void; onCancel: () => void }> = ({ unitId, onComplete, onCancel }) => {
  const { submitTest } = useApp();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [firstTryCorrectCount, setFirstTryCorrectCount] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState<number[]>([]);
  const [isCorrectFound, setIsCorrectFound] = useState(false);
  const [hasFailedCurrent, setHasFailedCurrent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);

  const handleSelect = (idx: number) => {
    if (isCorrectFound) return; // Already found correct answer

    const q = QUESTIONS[currentIdx];
    if (idx === q.correct) {
      setIsCorrectFound(true);
      if (!hasFailedCurrent) {
        setFirstTryCorrectCount(prev => prev + 1);
      }
    } else {
      if (!wrongAttempts.includes(idx)) {
        setWrongAttempts([...wrongAttempts, idx]);
      }
      setHasFailedCurrent(true);
    }
  };

  const handleNext = async () => {
    if (!isCorrectFound) return;

    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setWrongAttempts([]);
      setIsCorrectFound(false);
      setHasFailedCurrent(false);
    } else {
      setIsSubmitting(true);
      // We use firstTryCorrectCount for the actual mastery score
      const result = await submitTest(unitId, firstTryCorrectCount);
      setTestResult({ ...result, correctCount: firstTryCorrectCount });
      setShowResult(true);
      setIsSubmitting(false);
    }
  };

  if (showResult && testResult) {
    const level = getMasteryLevel(testResult.unit.masteryPoints);
    const badge = getLevelBadge(level);

    return (
      <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center p-4 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl w-full"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-container text-primary px-6 py-2 rounded-full font-bold text-sm mb-6 shadow-sm">
              ✨ TUYỆT VỜI! EM ĐÃ HOÀN THÀNH BÀI TẬP
            </div>
            <h1 className="text-5xl font-extrabold font-headline mb-4 text-primary">
              Chúc mừng em đã hoàn thành!
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Em đã thể hiện sự kiên trì tuyệt vời. Hãy xem kết quả và điểm thông thạo của mình nhé! 🌟
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 bg-white rounded-3xl p-10 shadow-2xl border border-primary-container relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full"></div>
              <div className="relative flex flex-col items-center text-center">
                <motion.div 
                  initial={{ rotate: -10, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  className="w-48 h-48 rounded-full bg-gradient-to-br from-primary-container to-primary-light flex items-center justify-center shadow-2xl mb-8 border-4 border-white"
                >
                  <span className="text-8xl">{badge}</span>
                </motion.div>
                <h3 className="text-3xl font-bold font-headline mb-4 text-slate-800">Em đạt mức độ {level}!</h3>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-8">Mastery Points: {testResult.unit.masteryPoints}/100</p>
                
                <div className="flex gap-6">
                  <div className="bg-slate-50 px-8 py-5 rounded-3xl text-center border border-primary-container">
                    <p className="text-primary font-black text-4xl">{testResult.correctCount}/10</p>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">Số câu đúng</p>
                  </div>
                  <div className="bg-slate-50 px-8 py-5 rounded-3xl text-center border border-primary-container">
                    <p className={`font-black text-4xl ${testResult.delta >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {testResult.delta > 0 ? `+${testResult.delta}` : testResult.delta}
                    </p>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">Thay đổi</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col gap-6">
              <div className="bg-primary p-8 rounded-3xl text-white shadow-xl shadow-primary/20">
                <h4 className="font-bold mb-4 text-lg">Tổng kết tiến độ</h4>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2 font-bold">
                      <span>Điểm thông thạo</span>
                      <span>{testResult.unit.masteryPoints}%</span>
                    </div>
                    <div className="h-4 w-full bg-white/20 rounded-full overflow-hidden border border-white/10">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${testResult.unit.masteryPoints}%` }}
                        className="h-full bg-white rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-primary-container flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-2xl">
                  💡
                </div>
                <p className="text-sm font-bold text-slate-600 leading-relaxed">{testResult.feedback}</p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center gap-4">
            <button 
              onClick={() => onComplete(testResult)}
              className="px-12 py-5 bg-primary text-white rounded-2xl font-bold text-xl shadow-xl shadow-primary/20 hover:bg-primary-light transition-all flex items-center gap-3"
            >
              Học tiếp bài tiếp theo <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const q = QUESTIONS[currentIdx];

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col pt-24 pb-12 px-4">
      <div className="max-w-3xl w-full mx-auto flex flex-col gap-8">
        <div className="flex items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex justify-between items-end mb-3">
              <span className="text-sm font-bold text-primary uppercase tracking-wider">Unit 4: Digital Citizenship</span>
              <span className="text-xs font-bold text-slate-300">Câu hỏi {currentIdx + 1}/{QUESTIONS.length}</span>
            </div>
            <div className="h-4 w-full bg-slate-50 rounded-full overflow-hidden border border-primary-container">
              <motion.div 
                animate={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </div>
          <button onClick={onCancel} className="p-3 hover:bg-slate-50 rounded-2xl text-slate-300 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-white rounded-3xl p-10 shadow-sm border border-primary-container relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none text-primary">
            <HelpCircle className="w-32 h-32" />
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <span className="bg-secondary-container text-secondary text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">Trắc nghiệm vui</span>
              <div className="flex items-center gap-1 text-green-500">
                <CheckCircleIcon />
                <span className="text-[10px] font-bold uppercase">Học tập chủ động</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold font-headline text-slate-800 leading-tight">
              {q.question}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {q.options.map((opt, idx) => {
                const isWrong = wrongAttempts.includes(idx);
                const isCorrect = isCorrectFound && idx === q.correct;
                
                return (
                  <button 
                    key={idx}
                    disabled={isCorrectFound && idx !== q.correct}
                    onClick={() => handleSelect(idx)}
                    className={`flex items-center gap-5 p-6 rounded-2xl border-2 transition-all text-left group
                      ${isCorrect ? 'border-green-400 bg-green-50 shadow-md shadow-green-100' : 
                        isWrong ? 'border-red-200 bg-red-50' : 
                        'border-slate-50 hover:border-primary-container hover:bg-primary-container/10'}`}
                  >
                    <div className={`w-10 h-10 flex items-center justify-center rounded-xl font-black text-lg transition-colors
                      ${isCorrect ? 'bg-green-500 text-white' : 
                        isWrong ? 'bg-red-400 text-white' : 
                        'bg-slate-100 text-slate-400 group-hover:bg-primary-container group-hover:text-primary'}`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className={`font-bold text-lg ${isCorrect ? 'text-green-700' : isWrong ? 'text-red-700' : 'text-slate-600'}`}>
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {hasFailedCurrent && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-orange-50 rounded-3xl p-8 border-l-8 border-orange-400 shadow-sm flex gap-6 items-start"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-orange-500 shrink-0 shadow-sm">
                  <Lightbulb className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-black text-orange-600 mb-2 text-lg uppercase tracking-wide">Gợi ý cho em nè:</h4>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {q.hint}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-end mt-6">
            <button 
              disabled={!isCorrectFound || isSubmitting}
              onClick={handleNext}
              className="px-12 py-5 bg-primary text-white rounded-2xl font-black text-xl shadow-xl shadow-primary/20 hover:bg-primary-light transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-3"
            >
              {isSubmitting ? 'Đang gửi...' : currentIdx === QUESTIONS.length - 1 ? 'Hoàn thành' : 'Câu tiếp theo'}
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckCircleIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);
