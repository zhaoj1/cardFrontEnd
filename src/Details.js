import React from 'react';
import big_dmg from './images/big_dmgV2.png'
import double from './images/double.png'
import guard from './images/shield.png'
import lil_dmg from './images/lil_dmgV2.png'
import heal from './images/healV2.png'
import vamp from './images/vampV2.png'
import dagger from './images/dagger.png'
import sns from './images/sns.png'

function Details(props){
  return(
    <div className='details'>
      {props.selectedCard == undefined || props.selectedCard.id == undefined?
        null
        :
        <div className='card-face' >
          <div className='detail-name'>{props.selectedCard.name}</div>
          <div className='detail-img' style={{
                'background-image':
                  props.selectedCard.effect_type == 'damage' && props.selectedCard.effect == 10 ?
                    `url(${big_dmg})`
                    :
                    props.selectedCard.effect_type == 'damage' && props.selectedCard.effect == 4 ?
                      `url(${lil_dmg})`
                      :
                      props.selectedCard.effect_type == 'heal' ?
                        `url(${heal})`
                        :
                        props.selectedCard.effect_type == 'vamp' ?
                          `url(${vamp})`
                          :
                          props.selectedCard.effect_type == 'buff' ?
                            `url(${double})`
                            :
                            props.selectedCard.effect_type == 'guard' ?
                              `url(${guard})`
                              :
                              props.selectedCard.effect_type == 'draw' ?
                                `url(${dagger})`
                                :
                                props.selectedCard.effect_type == 'sns' ?
                                  `url(${sns})`
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