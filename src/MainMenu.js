import React from 'react';

function MainMenu(props){
  return(
    <div>
      <button onClick={props.editDeck}>Begin</button>
    </div>
  )
}

export default MainMenu