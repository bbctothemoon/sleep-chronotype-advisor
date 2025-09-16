import { Button } from './ui/button';
import { Sunrise, Moon, Clock } from 'lucide-react';
import heroImage from '../assets/sleep-hero.jpg';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        {/* Hero Section */}
        <div className="card-glow rounded-3xl overflow-hidden mb-8">
          <div 
            className="relative h-64 bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative z-10 flex justify-center gap-8">
              <Sunrise className="w-16 h-16 text-white animate-pulse-glow drop-shadow-lg" />
              <Clock className="w-16 h-16 text-white/80 drop-shadow-lg" />
              <Moon className="w-16 h-16 text-white drop-shadow-lg" />
            </div>
          </div>
          
          <div className="p-12">
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            MEQ-SA 睡眠類型測試
          </h1>
          
          <h2 className="text-xl md:text-2xl text-muted-foreground mb-8">
            清晨型和夜晚型問卷 自評量表
          </h2>
          
            <p className="text-lg leading-relaxed max-w-3xl mx-auto text-foreground/90">
              發現您的睡眠類型，了解您的生理時鐘偏好。這個科學問卷將幫助您確定您是晨型人、夜型人，還是介於兩者之間，並提供個性化的睡眠建議。
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card-glow rounded-2xl p-6">
            <Sunrise className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">清晨型</h3>
            <p className="text-muted-foreground">早睡早起，上午精神最佳</p>
          </div>
          
          <div className="card-glow rounded-2xl p-6">
            <Clock className="w-12 h-12 text-primary/60 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">中間型</h3>
            <p className="text-muted-foreground">適應性強，作息靈活</p>
          </div>
          
          <div className="card-glow rounded-2xl p-6">
            <Moon className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">夜晚型</h3>
            <p className="text-muted-foreground">晚睡晚起，夜晚精神旺盛</p>
          </div>
        </div>

        {/* Test Info */}
        <div className="card-glow rounded-2xl p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6">測試說明</h3>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h4 className="font-semibold mb-2">🕐 測試時間</h4>
              <p className="text-muted-foreground mb-4">約 5-8 分鐘完成</p>
              
              <h4 className="font-semibold mb-2">📋 問題數量</h4>
              <p className="text-muted-foreground">19 個選擇題</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🎯 測試內容</h4>
              <p className="text-muted-foreground mb-4">睡眠偏好、精神狀態評估</p>
              
              <h4 className="font-semibold mb-2">📊 結果包含</h4>
              <p className="text-muted-foreground">睡眠類型分析、個性化建議</p>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <Button 
          onClick={onStart}
          size="lg"
          className="btn-gradient text-primary-foreground font-semibold px-12 py-4 text-xl animate-pulse-glow"
        >
          開始測試
        </Button>
        
        <p className="text-sm text-muted-foreground mt-6">
          * 請根據過去幾週的實際感受作答，結果僅供參考
        </p>
      </div>
    </div>
  );
}