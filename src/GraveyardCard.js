import React from 'react';

function GraveyardCard(props){
  return(
    <div className='graveyardCard'>
      {props.card.name}<br></br>
      {props.card.description}<br></br>
      {props.card.effect_type}<br></br>
      {props.card.hp_effect}<br></br>
    </div>
  )
}

export default GraveyardCard