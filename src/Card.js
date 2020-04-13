import React from 'react';

function Card(props){
  return(
    <div 
      className=
        {props.container =='enemy-hand' ?
          'card-back'
          :
          props.selectedCard !== undefined && props.card.id == props.selectedCard.id ? 'selected-card' : 'card'
        } 
      onClick=
        {props.container == 'enemy-hand' ?
          null
          :
          props.selectedCard !== undefined && props.card.id == props.selectedCard.id ? 
            props.container == 'edit' ? 
              () => props.setCardToDeck(props.card) 
              :
              props.container == 'deck' ?
                () => props.removeCardFromDeck(props.card)
                :
                null
            :
            props.container == 'player-hand' ?
              (index) => props.setSelectedCard(props.index)
              :
              () => props.setSelectedCard(props.card) 
        } 
    >
      {props.container == 'enemy-hand'?
        <>
          card-back
        </>
        :
        <>
          {props.card.name}<br></br>
          {props.card.description}<br></br>
          {props.card.effect_type}<br></br>
          {props.card.hp_effect}<br></br>
        </>
      }
    </div>
  )
}

export default Card