/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';

type DebateMissionProps = object

export const DebateMission = ({ }: DebateMissionProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<('tanThanh' | 'phanDoi' | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [flash, setFlash] = useState<null | 'correct' | 'wrong'>(null);
  const [locked, setLocked] = useState(false);

  const makeChoice = useGameStore((state) => state.makeChoice);
  const currentStoryNode = useGameStore((state) => state.currentStoryNode);
  const answerDebateQuestion = useGameStore((state) => state.answerDebateQuestion);

  const currentNode = currentStoryNode();
  const debateQuestions = currentNode.cauHoiTranhLuan || [];
  const currentQuestion = debateQuestions[currentQuestionIndex];

  const handleAnswer = (answer: 'tanThanh' | 'phanDoi') => {
    if (locked) return;
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);

    const isCorrect = answer === currentQuestion.dapAnDung;
    answerDebateQuestion(currentQuestion, isCorrect);
    // Trigger a subtle, smoother feedback and lock buttons before moving on
    setFlash(isCorrect ? 'correct' : 'wrong');
    setLocked(true);
    const animationMs = isCorrect ? 600 : 450; // keep in sync with CSS durations
    setTimeout(() => {
      setFlash(null);
      setLocked(false);
      if (currentQuestionIndex < debateQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResults(true);
      }
    }, animationMs);
  };

  const handleFinishDebate = () => {
    if (currentNode.ketThucTranhLuan?.nutTiepTheo) {
      makeChoice(currentNode.ketThucTranhLuan.nutTiepTheo);
    }
  };

  if (showResults) {
    return (
      // The results are now displayed without a card background to fit into the visual novel UI.
      <div className="text-white">
        <h3 className="text-xl font-bold">Kết quả Tranh luận</h3>
        <p className="text-white/80 mb-4">Đây là phân tích các câu trả lời của bạn.</p>
        <div className="space-y-4">
          {debateQuestions.map((q, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === q.dapAnDung;
            const explanation = currentNode.giaiThich?.find(e => e.id === q.id);
            return (
              <div key={q.id} className="p-3 border rounded-md bg-black/50 border-white/20">
                <p className="font-semibold">{q.vanBan}</p>
                <div className={`flex items-center mt-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                  {isCorrect ? <CheckCircle className="mr-2 h-5 w-5" /> : <XCircle className="mr-2 h-5 w-5" />}
                  <span>Bạn đã {userAnswer === 'tanThanh' ? 'Tán thành' : 'Phản đối'}. Câu trả lời {isCorrect ? 'đúng' : 'sai'}.</span>
                </div>
                {explanation && <p className="text-sm text-white/70 mt-1">{isCorrect ? explanation.giaiThichDung : explanation.giaiThichSai}</p>}
              </div>
            );
          })}
        </div>
        <Button onClick={handleFinishDebate} className="w-full mt-4">Hoàn thành Nhiệm vụ</Button>
      </div>
    );
  }

  return (
    <div className={"text-white text-center"}>
      <p className="text-xl font-semibold mb-6">{currentQuestion.vanBan}</p>
      <div className={`flex justify-center gap-4 ${flash === 'correct' ? 'animate-correct-pulse' : ''} ${flash === 'wrong' ? 'animate-wrong-shake' : ''}`}>
        <Button onClick={() => handleAnswer('tanThanh')} disabled={locked} className="bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed">
          Tán thành (Agree)
        </Button>
        <Button onClick={() => handleAnswer('phanDoi')} disabled={locked} className="bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed">
          Phản đối (Disagree)
        </Button>
      </div>
    </div>
  );
};
