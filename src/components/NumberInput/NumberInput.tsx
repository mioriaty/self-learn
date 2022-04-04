import React, { FC, InputHTMLAttributes, useEffect, useRef } from 'react';
import { Size, useStyleSheet, View, ViewProps } from 'wiloke-react-core';
import { classNames } from 'wiloke-react-core/utils';
import Action from './Actions';
import { DragIcon } from './DragIcon';
import NumberInputLoading from './NumberInputLoading';
import { parseDecimal } from './parseDecimal';
import * as styled from './styles';
import useCount from './useCount';

type InputType = 'number' | 'phone';
export interface NumberInputProps extends ViewProps {
  /** Size của input */
  sizeInput?: Exclude<Size, 'extra-small'>;
  /** Bật lên input sẽ rộng 100% */
  block?: boolean;
  /** Kiểu đầu vào của input */
  type?: InputType;
  /** Giá trị đầu vào của input */
  value?: number;
  /** Khi bật disabled thì nút mờ đi và không thể thực hiện event */
  disabled?: boolean;
  /** Giá trị nhỏ nhất của input */
  min?: number;
  /** Giá trị lớn nhất của input */
  max?: number;
  /** Bước nhảy cho mỗi lần tăng / giảm giá trị */
  step?: number;
  enableDrag?: boolean;
  /** Sự kiện onChange của input */
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange'];
  /** Sự kiện onValueChange của input, trả về dữ liệu dạng string(chuỗi) */
  onValueChange?: (number: number) => void;
}

const NumberInput: FC<NumberInputProps> & {
  Loading: typeof NumberInputLoading;
} = ({
  sizeInput = 'medium',
  type = 'number',
  value = 0,
  min = 0,
  max = 10,
  step = 1,
  block = false,
  disabled = false,
  className,
  color = 'gray8',
  backgroundColor = 'light',
  borderColor = 'gray5',
  borderWidth = 1,
  borderStyle = 'solid',
  enableDrag = false,
  css,
  onValueChange,
  onChange,
  ...rest
}) => {
  const { styles } = useStyleSheet();
  const prevCountRef = useRef<number | null>(null);

  const { count, decrement, increment, setCount } = useCount({
    min: min,
    max: max,
    step: step,
    value: value,
  });

  useEffect(() => {
    if (prevCountRef.current !== count) {
      // note: ngừng onChange khi value > max
      onValueChange?.(Math.max(min, Math.min(max, count)));
      prevCountRef.current = count;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const _handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    const _val = Number(event.target.value);

    // note: nếu value > max thì set value = max
    if (_val > max) {
      setCount(max);
    } else {
      setCount(parseDecimal(_val));
    }
  };

  const _onIncrement = () => increment(step);
  const _onDecrement = () => decrement(step);

  return (
    <View
      {...rest}
      className={classNames(className, 'NumberInput-container')}
      css={[styled.container(sizeInput, block, disabled), css]}
      color={color}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderStyle={borderStyle}
    >
      <View
        tagName="input"
        className={styles(styled.input(sizeInput))}
        type={type}
        min={min}
        max={max}
        step={step}
        value={count}
        disabled={disabled}
        onChange={_handleChange}
        color="gray7"
      />

      <View css={styled.actions} backgroundColor="transparent">
        <Action increment={_onIncrement} decrement={_onDecrement} size={sizeInput} />
      </View>
      {enableDrag && <DragIcon value={count} setValue={setCount} />}
    </View>
  );
};

NumberInput.Loading = NumberInputLoading;

export default NumberInput;
