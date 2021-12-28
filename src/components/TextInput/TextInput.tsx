import { View } from 'core';
import { FC, InputHTMLAttributes } from 'react';

type InputType = 'text' | 'password' | 'email';

export interface TextInputProps {
  /** Size của input */
  sizeInput?: Exclude<Size, 'extra-small'>;
  /** Placeholder của input */
  placeholder?: string;
  /** Bật lên input sẽ rộng 100% */
  block?: boolean;
  /** Kiểu đầu vào của input */
  type?: InputType;
  /** Giá trị đầu vào của input */
  value?: string;
  /** Khi bật disabled thì nút mờ đi và không thể thực hiện event */
  disabled?: boolean;
  innerRef?: React.RefObject<HTMLInputElement>;
  /** Sự kiện onChange của input */
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange'];
  /** Sự kiện onValueChange của input, trả về dữ liệu dạng string(chuỗi) */
  onValueChange?: (text: string) => void;
}

export const TextInput: FC<TextInputProps> = () => {
  return <View></View>;
};
