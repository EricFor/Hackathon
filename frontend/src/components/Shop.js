import React from 'react';
import Card from './WeaponCard';
class Shop extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <div>
        <Card img='' name='Wooden Sword' weaponinfo='Attack: 10' />
        <Card img='' name='Iron Sword' weaponinfo='Attack: 20' />
        <Card img='' name='Diamond Sword' weaponinfo='Attack:30' />
      </div>
    );
  }
}

export default Shop;
