interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-sm text-muted-foreground mb-2">
        <span>進度</span>
        <span>{current} / {total}</span>
      </div>
      <div className="w-full bg-muted/20 rounded-full h-2 overflow-hidden">
        <div 
          className="progress-glow h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}