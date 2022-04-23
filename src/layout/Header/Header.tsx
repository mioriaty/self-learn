import { Navigation } from 'components/Navigation';
import { View } from 'wiloke-react-core';
import { menuItems } from './data';

// const style = css`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   z-index: 2;
// `;

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
