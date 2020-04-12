import React from 'react';

function Card(props){
  return(
    <div className='card' onClick={() => props.setSelectedCard(props.card)}>
      {props.card.name}<br></br>
      {props.card.description}<br></br>
      {props.card.effect_type}<br></br>
      {props.card.hp_effect}<br></br>
    </div>
  )
}

export default Card