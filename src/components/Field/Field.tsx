import { FC, memo, ReactNode, Ref, useState } from 'react';
import { createPortal } from 'react-dom';
import offset from 'utils/functions/offset';
import { FontAwesome, Space, Text, View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface FieldProps extends ViewProps {
  children: ReactNode;
  /** Label của field có thể có hoặc không */
  label?: ReactNode;
  /** Font-size của label */
  fontSize?: number;
  /** Font-size của label */
  fontWeight?: number;
  /** Note của Field */
  note?: ReactNode;
  Right?: ReactNode;
  innerRef?: Ref<HTMLElement>;
}

const Field: FC<FieldProps> = ({ label, children, color = 'gray8', fontSize = 14, fontWeight = 500, note, innerRef, Right, css, ...rest }) => {
  const [visibleNote, setVisibleNote] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const el = event.currentTarget as HTMLElement;
    const { top, left } = offset(el);
    setVisibleNote(true);
    setTop(top);
    setLeft(left);
  };

  const handleMouseLeave = () => {
    setVisibleNote(false);
  };

  return (
    <View {...rest} ref={innerRef} css={[styles.container, css]}>
      <View css={styles.inner}>
        <View css={{ display: 'flex', alignItems: 'center' }}>
          {!!label && (
            <Text color={color} size={fontSize} fontFamily="secondary" tagName="label" css={[styles.label, { fontWeight }]}>
              {label}
            </Text>
          )}
          {!!note && (
            <View css={styles.note}>
              <View onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <FontAwesome type="far" name="question-circle" size={14} color={color} colorHover="primary" css={{ paddingTop: '3px' }} />
              </View>
              {visibleNote && createPortal(<View css={styles.popover(top, left)}>{note}</View>, document.body)}
            </View>
          )}
        </View>
        {Right}
      </View>
      {!!label && <Space size={5} />}
      {children}
    </View>
  );
};

export default memo(Field);
