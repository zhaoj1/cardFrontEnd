import React from 'react';

function Confirmation(props){
  return(
    <div className='modal'>
      {props.modalContents == 'main menu' ?
        <>
          <p>Return to Main Menu</p>
          <p>Are You Sure?</p>
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