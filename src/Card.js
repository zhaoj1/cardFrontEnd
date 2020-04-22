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
        <div className='card-face'>
          <div className='card-name'>{props.card.name}</div>
          <div className='card-img' style={{
                'background-image':
                  props.card.effect_type == 'damage' && props.card.hp_effect == 1000 ?
                    `url(${big_dmg})`
                    :
                    props.card.effect_type == 'damage' && props.card.hp_effect == 5 ?
                      `url(${lil_dmg})`
                      :
                      props.card.effect_type == 'heal' ?
                        `url(${heal})`
                        :
                        props.card.effect_type == 'vamp' ?
                          `url(${vamp})`
                          :
                          null
              }}>
          </div>
          <div className='card-description'>{props.card.description}</div>
        </div>
      }
    </div>
  )
}

export default Card