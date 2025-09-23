/* eslint-disable @typescript-eslint/no-unused-vars */
// the-diplomats-journey/src/components/DebateMission.tsx
import { useState } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { Button } from '@/components/ui/button';
// CORRECTED: Added CardFooter to the import list.
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { CheckCircle, XCircle } from 'lucide-react';

interface DebateMissionProps {
  // node prop removed (unused) – component derives current node from store
}

export const DebateMission = ({}: DebateMissionProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<( 'tanThanh' | 'phanDoi' | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  
  const makeChoice = useGameStore((state) => state.makeChoice);
  const currentStoryNode = useGameStore((state) => state.currentStoryNode);
  const answerDebateQuestion = useGameStore((state) => state.answerDebateQuestion);

  const currentNode = currentStoryNode();
  const debateQuestions = currentNode.cauHoiTranhLuan || [];
  const currentQuestion = debateQuestions[currentQuestionIndex];

  const handleAnswer = (answer: 'tanThanh' | 'phanDoi') => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);

    // Apply score immediately after answering
    const isCorrect = answer === currentQuestion.dapAnDung;
    answerDebateQuestion(currentQuestion, isCorrect);

    if (currentQuestionIndex < debateQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleFinishDebate = () => {
    if (currentNode.ketThucTranhLuan?.nutTiepTheo) {
      makeChoice(currentNode.ketThucTranhLuan.nutTiepTheo);
    }
  };

  if (showResults) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Kết quả Tranh luận</CardTitle>
          <CardDescription>Đây là phân tích các câu trả lời của bạn.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {debateQuestions.map((q, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === q.dapAnDung;
              const explanation = currentNode.giaiThich?.find(e => e.id === q.id);
              return (
                <li key={q.id} className="p-3 border rounded-md">
                  <p className="font-semibold">{q.vanBan}</p>
                  <div className={`flex items-center mt-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {isCorrect ? <CheckCircle className="mr-2 h-5 w-5" /> : <XCircle className="mr-2 h-5 w-5" />}
                    <span>Bạn đã {userAnswer === 'tanThanh' ? 'Tán thành' : 'Phản đối'}. Câu trả lời {isCorrect ? 'đúng' : 'sai'}.</span>
                  </div>
                  {explanation && <p className="text-sm text-muted-foreground mt-1">{isCorrect ? explanation.giaiThichDung : explanation.giaiThichSai}</p>}
                </li>
              );
            })}
          </ul>
        </CardContent>
        <CardFooter>
            <Button onClick={handleFinishDebate} className="w-full">Hoàn thành Nhiệm vụ</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div>
      <p className="text-lg font-semibold mb-4">{currentQuestion.vanBan}</p>
      <div className="flex justify-center gap-4">
        <Button onClick={() => handleAnswer('tanThanh')} className="bg-green-600 hover:bg-green-700">
          Tán thành (Agree)
        </Button>
        <Button onClick={() => handleAnswer('phanDoi')} className="bg-red-600 hover:bg-red-700">
          Phản đối (Disagree)
        </Button>
      </div>
    </div>
  );
};