import React from 'react';

function MainMenu(props){
  return(
    <div>
      <button onClick={props.startGame}>Start Game</button>
    </div>
  )
}

export default MainMenu