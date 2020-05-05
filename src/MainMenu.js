import React from 'react';

function MainMenu(props){
  return(
    <div className='mainMenu'>
      <button className='mainMenuButton' onClick={props.editDeck}>Begin</button>
    </div>
  )
}

export default MainMenu