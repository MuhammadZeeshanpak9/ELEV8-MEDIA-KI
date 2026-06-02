import { useEffect, useState } from 'react';

interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export function useCountdown(targetDate: Date): CountdownResult {
  const calculateTimeLeft = (): CountdownResult => {
    const now = new Date().getTime();
    const target = targetDate.getTime();
    const total = Math.max(0, target - now);

    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((total % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, total };
  };

  const [timeLeft, setTimeLeft] = useState<CountdownResult>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}
