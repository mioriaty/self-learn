import { Header } from 'layout/Header';
import { FC, ReactNode } from 'react';
import { View } from 'wiloke-react-core';

export interface TemplateProps {
  Content: ReactNode;

  CustomHeader?: ReactNode;
}

export const Template: FC<TemplateProps> = ({ Content, CustomHeader }) => {
  return (
    <View>
      {CustomHeader ? CustomHeader : <Header />}
      {Content}
    </View>
  );
};
