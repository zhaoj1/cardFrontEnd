import React from 'react';

function MainMenu(props){
  return(
    <div className='mainMenu'>
      <div className='title-screen'>
        <h1 className='title'>Fantasy Redraw</h1><br></br>
        <button className='mainMenuButton' onClick={props.editDeck}>Begin</button><br></br>
        <button className='mainMenuButton' onClick={props.showInstructions} >Instructions</button>
      </div>
    </div>
  )
}

export default MainMenu