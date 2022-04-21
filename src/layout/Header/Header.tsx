import { Navigation } from 'components/Navigation';
import { View } from 'wiloke-react-core';
import { menuItems } from './data';

export const Header = () => {
  return (
    <View className="Header">
      <Navigation data={menuItems} />
      {/* <View>
        <Switch />
      </View> */}
    </View>
  );
};