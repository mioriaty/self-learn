import { useEffect, useState } from 'react';
import { parseDecimal } from './parseDecimal';

export interface UseCountOptions {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
}

const useCount = ({ min = 0, max = Infinity, step = 1, value = 0 }: UseCountOptions) => {
  const [count, setCount] = useState(value);

  const _setCount = (value: number) => {
    // xóa cố 0 đằng trước các số khi onChange. Vd: 013 => 13
    value.toString().replace(/^0+/, '');
    setCount(value);
  };

  useEffect(() => {
    _setCount(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const _increment = (_step = step) => {
    const _val = Math.min(count + _step, max);
    const _parsedVal = parseDecimal(_val);
    _setCount(_parsedVal);
  };

  const _decrement = (_step = step) => {
    const _val = Math.max(count - _step, min);
    const _parsedVal = parseDecimal(_val);
    _setCount(_parsedVal);
  };

  return {
    count,
    setCount: _setCount,
    increment: _increment,
    decrement: _decrement,
  };
};
export default useCount;
