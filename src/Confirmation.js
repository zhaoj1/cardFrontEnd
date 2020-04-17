import React from 'react';

function Confirmation(props){
  return(
    <div>
      <p>you sure?</p><br></br>
      <button onClick={props.confirm}>ok</button><button onClick={props.closeModal}>no</button>
    </div>
  )
}

export default Confirmation