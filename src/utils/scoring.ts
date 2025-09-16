import { QuestionnaireResult } from '../types/questionnaire';

export function calculateResult(totalScore: number): QuestionnaireResult {
  let sleepType: 'morning' | 'evening' | 'intermediate';
  let category: string;
  let description: string;
  let bedtime: string;
  let wakeTime: string;
  let lightTherapyTime: string | undefined;

  // Determine sleep type and category based on score
  if (totalScore <= 30) {
    sleepType = 'evening';
    category = '絕對"夜晚"型';
    description = '您是典型的夜貓子，喜歡晚睡晚起，在夜晚時分精神最為旺盛。您的生理時鐘偏向夜晚，適合在晚上進行重要工作或創造性活動。';
    bedtime = '早上 2 至 3 點';
    wakeTime = '早上 10 至 11 點半';
  } else if (totalScore <= 41) {
    sleepType = 'evening';
    category = '中度"夜晚"型';
    description = '您傾向於夜晚型作息，雖然沒有極端夜貓子那麼明顯，但依然偏好較晚的睡眠時間。您在傍晚和夜晚時段表現較佳。';
    bedtime = '凌晨 12 點 45 分至 2 點';
    wakeTime = '早上 8 點半至 10 點';
  } else if (totalScore <= 58) {
    sleepType = 'intermediate';
    category = '中間型';
    description = '您屬於中間型，作息時間較為靈活，能夠適應不同的睡眠模式。您既不是極端的早起者，也不是夜貓子，擁有良好的適應性。';
    bedtime = '晚上 10 點 45 分至 12 點 45 分';
    wakeTime = '早上 6 點半至 8 點半';
  } else if (totalScore <= 69) {
    sleepType = 'morning';
    category = '中度"清晨"型';
    description = '您傾向於清晨型作息，喜歡早睡早起，在上午時段精神狀態最佳。您能夠自然地在早晨醒來並保持良好的狀態。';
    bedtime = '晚上 9 點半至 10 點 45 分';
    wakeTime = '早上 5 點至 6 點半';
  } else {
    sleepType = 'morning';
    category = '絕對"清晨"型';
    description = '您是典型的早起者，天生適合早睡早起的生活節奏。您在清晨時分最有活力和創造力，是天生的"早鳥"。';
    bedtime = '晚上 9 點至 9 點半';
    wakeTime = '早上 4 點至 5 點';
  }

  // Get light therapy time if applicable
  lightTherapyTime = getLightTherapyTime(totalScore);

  return {
    totalScore,
    sleepType,
    category,
    description,
    lightTherapyTime,
    bedtime,
    wakeTime
  };
}

function getLightTherapyTime(score: number): string | undefined {
  const therapyTimes: { [key: string]: string } = {
    '23-26': '早上 8 點 15 分',
    '27-30': '早上 8 點正',
    '31-34': '早上 7 點 45 分',
    '35-38': '早上 7 點半',
    '39-41': '早上 7 點 15 分',
    '42-45': '早上 7 點正',
    '46-49': '早上 6 點 45 分',
    '50-53': '早上 6 點半',
    '54-57': '早上 6 點 15 分',
    '58-61': '早上 6 點正',
    '62-65': '早上 5 點 45 分',
    '66-68': '早上 5 點半',
    '69-72': '早上 5 點 15 分',
    '72-76': '早上 5 點正'
  };

  for (const [range, time] of Object.entries(therapyTimes)) {
    const [min, max] = range.split('-').map(Number);
    if (score >= min && score <= max) {
      return time;
    }
  }

  return undefined;
}

export function getLifestyleTips(sleepType: 'morning' | 'evening' | 'intermediate'): string[] {
  switch (sleepType) {
    case 'morning':
      return [
        '保持規律的早睡早起習慣，即使在週末也要維持',
        '在上午安排重要工作和決策',
        '避免過晚暴露在強光下，以免影響睡眠',
        '晚餐後避免激烈運動',
        '利用清晨時光進行運動或冥想'
      ];
    case 'evening':
      return [
        '盡量避免強制性的早起安排',
        '在下午和晚上安排重要工作',
        '創造有利於入睡的環境，如調暗燈光',
        '考慮在適當時間進行光療',
        '週末適度延後起床時間也無妨'
      ];
    case 'intermediate':
      return [
        '保持靈活的作息安排，但要維持基本規律',
        '可以根據工作需求適度調整睡眠時間',
        '注意觀察自己在不同時段的表現狀態',
        '在重要活動前一天保證充足睡眠',
        '適量運動有助於提升整體睡眠品質'
      ];
    default:
      return [];
  }
}