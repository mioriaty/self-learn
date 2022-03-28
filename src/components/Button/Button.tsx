import { ViewProps } from 'core';
import { ButtonHTMLAttributes, DOMAttributes, FC, forwardRef, ReactNode, Ref } from 'react';

export interface ButtonProps extends ViewProps {
  /** React children */
  children: ReactNode;
  /** Các kích thước của button */
  size?: Size;
  /** Bật lên sẽ dài full 100% */
  block?: boolean;
  /** Thuộc tính href của thẻ a */
  href?: string;
  /** Thuộc tính target của thẻ a nhưng bỏ "_" ở trước */
  target?: 'blank' | 'self' | 'parent' | 'top';
  /** Set css font-size */
  fontSize?: number;
  /** Khi bật disabled thì nút mờ đi và không thể thực hiện event */
  disabled?: boolean;
  /** Khi bật lên thì sẽ hiển thị icon loading bên trái */
  loading?: boolean;
  /** Thuộc tính type của thẻ button */
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  /** Sự kiện click */
  onClick?: DOMAttributes<HTMLElement>['onClick'];
}

export const Button: FC<ButtonProps> = forwardRef<HTMLElement, ButtonProps>(
  (
    {
      href,
      children,
      target = 'self',
      className,
      onClick,
      disabled = false,
      loading = false,
      type = 'button',
      style,
      backgroundColor = 'primary',
      color = 'light',
      radius = 4,
      ...rest
    },
    ref,
  ) => {
    const props: ViewProps = {
      ...rest,
      className,
      style,
      backgroundColor,
      radius,
      color,
      ...(disabled ? {} : { onClick }),
    };

    const renderChildren = () => {
      return (
        <>
          {loading && <div>loading</div>}
          <span>{children}</span>
        </>
      );
    };
    if (!!href) {
      return (
        <a ref={ref as Ref<HTMLAnchorElement>} href={href} rel="noopener noreferrer" target={`_${target}`} {...props}>
          {renderChildren()}
        </a>
      );
    }
    return (
      <button ref={ref as Ref<HTMLButtonElement>} type={type} {...props}>
        {renderChildren()}
      </button>
    );
  },
);
