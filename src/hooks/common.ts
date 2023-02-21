import { useState } from 'react'
import { useCountDown } from "ahooks";
import { history } from 'umi';

export const useTimeDownCounter = (time=5000, onEnd=() => history.push('/app')) => {
  const [targetDate, setTargetDate] = useState<number>(Date.now() + time);

  const [countdown] = useCountDown({
    targetDate,
    onEnd
  });

  return [Math.round(countdown / 1000)];
};
