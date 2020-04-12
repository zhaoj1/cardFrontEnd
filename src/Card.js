import React from 'react';

function Card(props){
  return(
    <div className={props.selectedCard !== undefined && props.card.id == props.selectedCard.id ? 'selected-card' : 'card'} 
      onClick={props.selectedCard !== undefined && props.card.id == props.selectedCard.id ? 
        props.container == 'edit' ? 
          () => props.setCardToDeck(props.card) 
          :
          () => props.removeCardFromDeck(props.card)
        :
        () => props.setSelectedCard(props.card) 
      } 
    >
      {props.card.name}<br></br>
      {props.card.description}<br></br>
      {props.card.effect_type}<br></br>
      {props.card.hp_effect}<br></br>
    </div>
  )
}

export default Card