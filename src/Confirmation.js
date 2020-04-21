import React from 'react';

function Confirmation(props){
  return(
    <div className='modal'>
      {props.modalContents == 'main menu' ?
        <>
          <p>Return to Main Menu</p>
          <p>Are You Sure?</p><br></br>
          <button onClick={props.mainMenu}>OK</button><button onClick={props.closeModal}>CANCEL</button>
        </>
        :
        props.modalContents == 'victory' ?
          <>
            <p>Victory</p><br></br>
            <button onClick={props.nextFight} >Continue</button>
          </>
          :
          props.modalContents = 'lose' ?
            <>
              <p>You Lost...</p>
              <p>Better luck next time!</p><br></br>
              <button onClick={props.mainMenu} >Return to Main Menu</button>
            </>
            :
            null
      }
      
    </div>
  )
}

export default Confirmation