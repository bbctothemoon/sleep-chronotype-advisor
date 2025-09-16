import { Question, QuestionOption } from '../types/questionnaire';
import { Button } from './ui/button';

interface QuestionCardProps {
  question: Question;
  selectedScore?: number;
  onAnswerSelect: (score: number) => void;
}

export function QuestionCard({ question, selectedScore, onAnswerSelect }: QuestionCardProps) {
  return (
    <div className="card-glow rounded-2xl p-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-bold text-lg">{question.id}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            問題 {question.id}
          </div>
        </div>
        
        <h2 className="text-xl md:text-2xl font-semibold leading-relaxed text-foreground">
          {question.question}
        </h2>
      </div>

      <div className="space-y-3">
        {question.options.map((option: QuestionOption, index: number) => (
          <Button
            key={index}
            variant="ghost"
            className={`btn-answer w-full justify-start text-left p-4 h-auto min-h-[60px] ${
              selectedScore === option.score ? 'selected' : ''
            }`}
            onClick={() => onAnswerSelect(option.score)}
          >
            <div className="flex items-center gap-4 w-full">
              <div className={`w-4 h-4 rounded-full border-2 transition-all ${
                selectedScore === option.score 
                  ? 'bg-primary border-primary' 
                  : 'border-muted-foreground/30'
              }`} />
              <span className="flex-1 text-base leading-relaxed">{option.text}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}