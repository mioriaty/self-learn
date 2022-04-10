import React, { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesome, FontAwesomeName, Text, useStyleSheet, useTheme, View, withStyles, WithStylesProps, ViewProps } from 'wiloke-react-core';
import * as css from './styles';

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  exact?: boolean;
  icon?: FontAwesomeName;
  isReactRouter: boolean;
  hasDivider?: boolean;
  textHeader?: string;
}

export interface NavigationProps {
  data: MenuItem[];
  containerCss?: ViewProps['css'];
  onClick?: () => void;
}

// @ts-ignore
const NavLinkWithStyles = withStyles(NavLink);

export const Navigation: FC<NavigationProps> = ({ data, containerCss, onClick }) => {
  const { colors } = useTheme();
  const { styles } = useStyleSheet(colors);
  const linkProps: Pick<WithStylesProps, 'color' | 'colorHover' | 'css'> = {
    css: css.link,
    color: 'gray8',
    colorHover: 'primary',
  };

  const renderLink = (item: MenuItem): ReactNode => {
    const { isReactRouter, href, label, icon, exact } = item;

    if (isReactRouter) {
      return (
        <NavLinkWithStyles {...linkProps} activeClassName={styles(css.active)} exact={exact} to={href as any} onClick={onClick}>
          {icon && <FontAwesome type="far" size={18} name={icon} css={css.icon} />}
          {label}
        </NavLinkWithStyles>
      );
    }
    return (
      <Text {...linkProps} tagName="a" target="blank" href={href} onClick={onClick}>
        {icon && <FontAwesome type="far" size={18} name={icon} css={css.icon} />}
        {label}
      </Text>
    );
  };

  const renderMenuItem = (item: MenuItem): ReactNode => {
    const { id, hasDivider, textHeader } = item;
    return (
      <View key={id}>
        {!!textHeader && (
          <Text size={12} fontFamily="secondary" css={{ textTransform: 'uppercase', padding: '0 0 10px 15px' }}>
            {textHeader}
          </Text>
        )}

        <View className="Navigation-parent" css={css.parent}>
          {renderLink(item)}
        </View>
        {!!hasDivider && (
          <View height={1} backgroundColor="gray2" css={{ position: 'relative', marginTop: '15px', marginBottom: '15px', width: '100%' }} />
        )}
      </View>
    );
  };

  return (
    <View tagName="nav" css={[css.container, containerCss]}>
      {data.map(renderMenuItem)}
    </View>
  );
};
