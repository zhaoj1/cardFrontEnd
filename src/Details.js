import React from 'react';
import big_dmg from './images/big_dmgV2.png'
import lil_dmg from './images/lil_dmgV2.png'
import heal from './images/healV2.png'
import vamp from './images/vampV2.png'

function Details(props){
  return(
    <div className='details'>
      {props.selectedCard == undefined || props.selectedCard.id == undefined?
        null
        :
        <div className='card-face'>
          <div className='detail-name'>{props.selectedCard.name}</div>
          <div className='detail-img' style={{
                'background-image':
                  props.selectedCard.effect_type == 'damage' && props.selectedCard.effect == 8 ?
                    `url(${big_dmg})`
                    :
                    props.selectedCard.effect_type == 'damage' && props.selectedCard.effect == 5 ?
                      `url(${lil_dmg})`
                      :
                      props.selectedCard.effect_type == 'heal' ?
                        `url(${heal})`
                        :
                        props.selectedCard.effect_type == 'vamp' ?
                          `url(${vamp})`
                          :
                          null
          }}></div>
          <div className='detail-description'>{props.selectedCard.description}</div>
        </div>
      }
    </div>
  )
}

export default Details