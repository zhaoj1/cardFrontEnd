import React from 'react';

function Details(props){
  return(
    <div className='details'>
      {props.selectedCard == undefined || props.selectedCard.id == undefined?
        null
        :
        <div className='card-face'>
          <p>{props.selectedCard.name}</p>
          <p>{props.selectedCard.description}</p>
          <p>{props.selectedCard.effect_type}</p>
          <p>{props.selectedCard.hp_effect}</p>
        </div>
      }
    </div>
  )
}

export default Details