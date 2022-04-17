import React from 'react';

export default function WeaponCard(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <div>
        <img src={props.img} alt='' />
        <h2>{props.weaponinfo}</h2>
      </div>
    </div>
  );
}
