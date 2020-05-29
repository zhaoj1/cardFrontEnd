import React from 'react';

function MainMenu(props){
  return(
    <div className='mainMenu'>
      <div className='title-screen'>
        <label className='title'>Fantasy Redraw</label><br></br>
        <button className='mainMenuButton' onClick={props.editDeck}>Begin</button><br></br>
        <button className='mainMenuButton' onClick={props.showInstructions} >Instructions</button>
      </div>
    </div>
  )
}

export default MainMenu