import React from 'react';
import big_dmg from './images/big_dmgV2.png'
import double from './images/double.png'
import guard from './images/shield.png'
import lil_dmg from './images/lil_dmgV2.png'
import heal from './images/healV2.png'
import vamp from './images/vampV2.png'
import dagger from './images/dagger.png'

function GraveyardCard(props){

  const cardStyle = {
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
  }

  return(
    <div className='graveyardCard'
      style={props.card.effect_type == 'damage' && props.card.effect == 8 || props.card.effect_type == 'buff' ?
      {'background-color': 'rgb(200,50,50)'}
      :
      null}
    >
      <div className='card-face'>
        <div className='card-img' style={cardStyle}></div>
      </div>
    </div>
  )
}

export default GraveyardCard