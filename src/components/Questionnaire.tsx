import { useState } from 'react';
import { meqQuestions } from '../data/questions';
import { calculateResult } from '../utils/scoring';
import { UserAnswer } from '../types/questionnaire';
import { WelcomeScreen } from './WelcomeScreen';
import { QuestionCard } from './QuestionCard';
import { ResultCard } from './ResultCard';
import { ProgressBar } from './ProgressBar';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type QuestionnaireState = 'welcome' | 'questions' | 'results';

export function Questionnaire() {
  const [state, setState] = useState<QuestionnaireState>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);

  const handleStart = () => {
    setState('questions');
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const handleAnswerSelect = (score: number) => {
    const currentQuestion = meqQuestions[currentQuestionIndex];
    const newAnswers = [...answers];
    const existingAnswerIndex = newAnswers.findIndex(a => a.questionId === currentQuestion.id);
    
    if (existingAnswerIndex >= 0) {
      newAnswers[existingAnswerIndex] = { questionId: currentQuestion.id, selectedScore: score };
    } else {
      newAnswers.push({ questionId: currentQuestion.id, selectedScore: score });
    }
    
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < meqQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate and show results
      const totalScore = answers.reduce((sum, answer) => sum + answer.selectedScore, 0);
      setState('results');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRestart = () => {
    setState('welcome');
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const getCurrentAnswer = () => {
    const currentQuestion = meqQuestions[currentQuestionIndex];
    return answers.find(a => a.questionId === currentQuestion.id);
  };

  const isAnswered = () => {
    return getCurrentAnswer() !== undefined;
  };

  if (state === 'welcome') {
    return <WelcomeScreen onStart={handleStart} />;
  }

  if (state === 'results') {
    const totalScore = answers.reduce((sum, answer) => sum + answer.selectedScore, 0);
    const result = calculateResult(totalScore);
    return <ResultCard result={result} onRestart={handleRestart} />;
  }

  const currentQuestion = meqQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl mx-auto w-full">
        <ProgressBar current={currentQuestionIndex + 1} total={meqQuestions.length} />
        
        <QuestionCard
          question={currentQuestion}
          selectedScore={getCurrentAnswer()?.selectedScore}
          onAnswerSelect={handleAnswerSelect}
        />

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            上一題
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isAnswered()}
            className="btn-gradient text-primary-foreground flex items-center gap-2"
          >
            {currentQuestionIndex === meqQuestions.length - 1 ? '查看結果' : '下一題'}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}