import { QuestionnaireResult } from '../types/questionnaire';
import { getLifestyleTips } from '../utils/scoring';
import { Button } from './ui/button';
import { Sunrise, Moon, Clock, Lightbulb, Bed, AlarmClock } from 'lucide-react';

interface ResultCardProps {
  result: QuestionnaireResult;
  onRestart: () => void;
}

export function ResultCard({ result, onRestart }: ResultCardProps) {
  const lifestyleTips = getLifestyleTips(result.sleepType);
  
  const getResultIcon = () => {
    switch (result.sleepType) {
      case 'morning':
        return <Sunrise className="w-16 h-16 text-white" />;
      case 'evening':
        return <Moon className="w-16 h-16 text-white" />;
      case 'intermediate':
        return <Clock className="w-16 h-16 text-white" />;
    }
  };

  const getResultClass = () => {
    switch (result.sleepType) {
      case 'morning':
        return 'result-morning';
      case 'evening':
        return 'result-evening';
      case 'intermediate':
        return 'result-intermediate';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Main Result */}
      <div className={`${getResultClass()} rounded-3xl p-8 text-white text-center`}>
        <div className="flex flex-col items-center gap-6">
          {getResultIcon()}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{result.category}</h1>
            <div className="text-xl mb-4">總分：{result.totalScore} 分</div>
            <p className="text-lg leading-relaxed max-w-2xl">{result.description}</p>
          </div>
        </div>
      </div>

      {/* Sleep Schedule */}
      <div className="card-glow rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Bed className="w-6 h-6 text-primary" />
          理想睡眠時間
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-muted/20 rounded-xl p-6">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Moon className="w-5 h-5" />
              入睡時間
            </h3>
            <p className="text-lg text-primary font-medium">{result.bedtime}</p>
          </div>
          <div className="bg-muted/20 rounded-xl p-6">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <AlarmClock className="w-5 h-5" />
              起床時間
            </h3>
            <p className="text-lg text-primary font-medium">{result.wakeTime}</p>
          </div>
        </div>
      </div>

      {/* Light Therapy */}
      {result.lightTherapyTime && (
        <div className="card-glow rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Lightbulb className="w-6 h-6 text-primary" />
            建議光療時間
          </h2>
          <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
            <p className="text-lg">
              根據您的分數，建議強光治療開始時間為：
              <span className="font-bold text-primary ml-2">{result.lightTherapyTime}</span>
            </p>
            <p className="text-sm text-muted-foreground mt-3">
              * 如需進行光療，請諮詢專業醫療人員的建議
            </p>
          </div>
        </div>
      )}

      {/* Lifestyle Tips */}
      <div className="card-glow rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">生活建議</h2>
        <div className="space-y-4">
          {lifestyleTips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-sm font-bold">{index + 1}</span>
              </div>
              <p className="text-base leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="text-center">
        <Button 
          onClick={onRestart} 
          size="lg"
          className="btn-gradient text-primary-foreground font-semibold px-8 py-4 text-lg"
        >
          重新測試
        </Button>
      </div>
    </div>
  );
}