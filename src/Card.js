import React from 'react';
import big_dmg from './images/big_dmg.png'
import lil_dmg from './images/lil_dmg.png'
import heal from './images/heal.png'
import vamp from './images/vamp.png'
import cardFront from './images/front.png'

function Card(props){
  return(
    <div 
      className=
        {props.container =='enemy-hand' ?
          'card-back'
          :
          props.selectedCard !== undefined && props.card.id == props.selectedCard.id ? 
            'selected-card' 
            : 
            props.selectedCardIndex !== undefined && props.index == props.selectedCardIndex ?
              'selected-card'
              :
              'card'
        } 
      onClick=
        {props.container == 'enemy-hand' || props.turn =='enemy' ?
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
            props.selectedCardIndex == props.index ?
              (card) => props.playCard(props.card)
              :
                (index) => props.setSelectedCard(props.index)
                :
                () => props.setSelectedCard(props.card) 
        } 
    >
      {props.container == 'enemy-hand'?
        null
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