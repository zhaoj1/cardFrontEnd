import React from 'react';

function Instructions(props){
  return(
    <div className='game-instructions'>
        <div className='game-instructions-text'>
          <h1>Instructions</h1>
          <p>Player can choose between 2 actions - play a card or refresh hand.</p>
          <p>Played cards will be sent to the graveyard and refreshing hand will return all cards from the graveyard to player hand,</p>
          <p>
            1. Click on a card to SELECT and view details.<br></br>
            2. Click a SELECTED CARD to play.<br></br>
            3. Click on Graveyard to refresh hand.<br></br><br></br>
          </p>
          <button className='returnBtn' onClick={props.mainMenu}>Return</button>
        </div>
    </div>
  )
}

export default Instructions