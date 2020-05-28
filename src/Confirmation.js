import React from 'react';
import lose_slime from './images/lose_slime.png'
import lose_kobold from './images/lose_kobold.png'
import lose_orc from './images/lose_orc.png'
import lose_lich from './images/lose_lich.png'

function Confirmation(props){
  return(
    <div className='modal'>
      {props.modalContents == 'main menu' ?
        <>
          <p>Return to Main Menu</p>
          <p>Are You Sure?</p><br></br>
          <div className='modalBtnContainer' >
            <button className='modalBtn' onClick={props.mainMenu}>OK</button>
            <button className='modalBtn' onClick={props.closeModal}>CANCEL</button>
          </div>
        </>
        :
        props.modalContents == 'victory' ?
          <>
            <p>Victory</p>
            <button 
              className='modalBtn'
              onClick={
                props.currentEnemy == props.enemies.length ?
                  props.gameCompleted
                  :
                  props.nextEnemy
              } >Continue</button>
          </>
          :
          props.modalContents == 'lose' ?
            <>
              <p>You Lost...</p>
              <img className='lose-img' src={
                props.currentEnemy == 1 ?
                  lose_slime
                  :
                  props.currentEnemy == 2 ?
                    lose_kobold
                    :
                    props.currentEnemy == 3 ?
                      lose_orc
                      :
                      props.currentEnemy == 4 ?
                        lose_lich
                        :
                        null
              } height='180' width='320' /><br></br>
              <p>Better luck next time!</p>
              <button className='modalBtn' onClick={props.mainMenu} >Return to Main Menu</button>
            </>
            :
            props.modalContents == 'congrats' ?
              <>
                <p>Congrats! You've Won!</p>
                <button className='modalBtn' onClick={props.mainMenu} >Return to Main Menu</button>
              </>
              :
              null
      }
    </div>
  )
}

export default Confirmation