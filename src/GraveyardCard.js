import React from 'react';
import big_dmg from './images/big_dmgV2.png'
import lil_dmg from './images/lil_dmgV2.png'
import heal from './images/healV2.png'
import vamp from './images/vampV2.png'

function GraveyardCard(props){

  const cardStyle = {
    'background-image':
      props.card.effect_type == 'damage' && props.card.effect == 10 ?
        `url(${big_dmg})`
        :
        props.card.effect_type == 'damage' && props.card.effect == 5 ?
          `url(${lil_dmg})`
          :
          props.card.effect_type == 'heal' ?
            `url(${heal})`
            :
            props.card.effect_type == 'vamp' ?
              `url(${vamp})`
              :
              null
  }

  return(
    <div className='graveyardCard'>
      <div className='card-face'>
        <div className='card-img' style={cardStyle}></div>
      </div>
    </div>
  )
}

export default GraveyardCard