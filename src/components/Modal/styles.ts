import { Styles, Theme } from 'wiloke-react-core';

const HEADER_HEIGHT = 50;
export type MyModalSize = 'medium' | 'large';

export const containerHeader = ({ colors }: Theme): Styles => ({
  height: `${HEADER_HEIGHT}px`,
  backgroundColor: colors.light,
  borderBottom: `1px solid ${colors.gray3}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px',
});

export const close: Styles = {
  width: '36px',
  height: '36px',
  lineHeight: '36px',
  textAlign: 'center',
  cursor: 'pointer',
};

export const container: Styles = {
  className: 'MyModal-container',
  position: 'fixed',
  inset: 0,
  zIndex: 15,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const overlay = ({ colors }: Theme): Styles => ({
  className: 'MyModal-overlay',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
  backgroundColor: `rgba(${colors.rgbGray9}, 0.6)`,
});

export const content = (size: MyModalSize, height: string) => ({ colors }: Theme): Styles => ({
  className: 'MyModal-content',
  backgroundColor: colors.light,
  borderRadius: '6px',
  overflow: 'hidden',
  transition: 'all 0.2s ease',
  ...(size === 'medium'
    ? {
        width: '460px',
        height,
      }
    : {
        maxWidth: '1400px',
        width: 'calc(100% - 60px)',
        height: 'calc(100% - 100px)',
        margin: '30px 50px',
      }),
});

export const body = (hasFooter: boolean): Styles => ({
  className: 'MyModal-body',
  height: `calc(100% - 50px - ${hasFooter ? '56px' : '0px'}) !important`,
});

export const child = (size: MyModalSize): Styles => ({
  className: 'MyModal-child',
  padding: '10px',
  ...(size === 'large' ? { height: '100%' } : {}),
});

export const footer = ({ colors }: Theme): Styles => ({
  className: 'MyModal-footer',
  padding: '10px',
  borderTop: `1px solid ${colors.gray3}`,
  height: '56px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
});
