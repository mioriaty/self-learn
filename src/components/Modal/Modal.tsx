import Button, { ButtonProps } from 'components/Button';
import ScrollBars from 'components/ScrollBars';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useKey } from 'react-use';
import { View, ViewProps } from 'wiloke-react-core';
import { ModalHeader } from './ModalHeader';
import * as styles from './styles';

export interface MyModalProps<T extends any = any> {
  children: ReactNode;
  size?: 'medium' | 'large';
  headerText?: ReactNode;
  isVisible: boolean;
  isLoading?: boolean;
  cancelText?: string;
  okText?: string;
  okButtonDisabled?: ButtonProps['disabled'];
  scrollDisabled?: boolean;
  contentCss?: ViewProps['css'];
  bodyCss?: ViewProps['css'];
  /** Để tính lại chiều cao cho modal */
  depsHeightRecalculation?: T;
  onCancel?: () => void;
  onOk?: () => void;
  FooterRight?: ReactNode;
}

const Modal = <T extends any = any>({
  size = 'medium',
  children,
  headerText = '',
  isVisible,
  isLoading = false,
  cancelText = 'Cancel',
  okButtonDisabled,
  scrollDisabled = false,
  okText = 'Oke',
  contentCss,
  bodyCss,
  depsHeightRecalculation,
  onCancel,
  onOk,
  FooterRight,
}: MyModalProps<T>) => {
  const [height, setHeight] = useState<string>('auto');
  const childRef = useRef<HTMLElement | null>(null);
  useKey('Escape', onCancel);

  const setHeightState = () => {
    const maxHeight = window.innerHeight - 60;
    if (!!childRef.current) {
      setHeight(
        childRef.current.offsetHeight >= maxHeight
          ? `${maxHeight}px`
          : `${childRef.current.offsetHeight + 50 + (!!cancelText || !!okText ? 56 : 0)}px`,
      );
    }
  };

  useEffect(() => {
    if (isVisible) {
      setHeightState();
      window.addEventListener('resize', setHeightState);
      return () => {
        window.removeEventListener('resize', setHeightState);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, depsHeightRecalculation]);

  const renderChild = (
    <View ref={childRef} css={[styles.child(size), contentCss]}>
      {children}
    </View>
  );

  const renderContent = (
    <View css={styles.container}>
      <View css={styles.overlay} onClick={onCancel} />
      <View css={[styles.content(size, height), bodyCss]}>
        <ModalHeader title={headerText} onClose={onCancel} />
        {scrollDisabled ? (
          <View css={styles.body(!!cancelText || !!okText)}>{renderChild}</View>
        ) : (
          <ScrollBars css={styles.body(!!cancelText || !!okText)}>{renderChild}</ScrollBars>
        )}
        {(!!cancelText || !!okText) && (
          <View css={styles.footer}>
            {!!cancelText && (
              <View>
                <Button
                  backgroundColor="gray2"
                  color="gray8"
                  size="extra-small"
                  radius={4}
                  fontFamily="secondary"
                  css={{ fontWeight: 500 }}
                  onClick={onCancel}
                >
                  {cancelText}
                </Button>
              </View>
            )}
            {!!okText && (
              <View css={{ marginLeft: '10px' }}>
                <Button
                  disabled={okButtonDisabled}
                  loading={isLoading}
                  backgroundColor="primary"
                  size="extra-small"
                  radius={4}
                  fontFamily="secondary"
                  css={{ fontWeight: 500 }}
                  onClick={onOk}
                >
                  {okText}
                </Button>
              </View>
            )}
            <View css={{ marginLeft: '10px' }}>{FooterRight}</View>
          </View>
        )}
      </View>
    </View>
  );

  if (!isVisible) {
    return null;
  }

  return createPortal(renderContent, document.body);
};

export { Modal };
