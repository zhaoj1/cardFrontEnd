import React from 'react';
import big_dmg from './images/big_dmgV2.png'
import double from './images/double.png'
import guard from './images/shield.png'
import lil_dmg from './images/lil_dmgV2.png'
import heal from './images/healV2.png'
import vamp from './images/vampV2.png'
import dagger from './images/dagger.png'

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
      style={
        props.container == 'enemy-hand' || props.turn =='enemy' ?
          null
          :
          props.card.special ?
            {'background-color': 'rgb(200,50,50)'}
            :
            null
      }
    >
      {props.container == 'enemy-hand'?
        null
        :
        <div className='card-face'>
          <div className='card-img' style={{
                'background-image':
                  props.card.effect_type == 'damage' && props.card.effect == 10 ?
                    `url(${big_dmg})`
                    :
                    props.card.effect_type == 'damage' && props.card.effect == 4 ?
                      `url(${lil_dmg})`
                      :
                      props.card.effect_type == 'heal' ?
                        `url(${heal})`
                        :
                        props.card.effect_type == 'vamp' ?
                          `url(${vamp})`
                          :
                          props.card.effect_type == 'buff' ?
                            `url(${double})`
                            :
                            props.card.effect_type == 'guard' ?
                              `url(${guard})`
                              :
                              props.card.effect_type == 'draw' ?
                                `url(${dagger})`
                                :
                                null
              }}>
          </div>
        </div>
      }
    </div>
  )
}

export default Card