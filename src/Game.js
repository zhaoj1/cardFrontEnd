import React from 'react';

export default class Game extends React.Component{

  state = {
    currentEnemyFullDeckIndex: [],
    currentEnemyFullDeck: [],
    currentEnemyHand: []
  }

  componentDidMount(){
    this.setState({
      currentEnemyFullDeckIndex: this.props.currentEnemyData.deck.slice(1,-1).split(', ').map(n => parseInt(n))
    }, () => {
      var enemyDeck= []
      this.state.currentEnemyFullDeckIndex.forEach(i => {
        enemyDeck = [...enemyDeck, this.props.cards.find(card => card.id == i)]
      })
      this.setState({
        currentEnemyFullDeck: enemyDeck,
        currentEnemyHand: enemyDeck
      })
    })
    
  }

  render(){
    return(
      <div className='game-screen'>
        Game Screen<br></br>
        <button onClick={this.props.mainMenu} >Main Menu</button><br></br>
        <div className='enemy-container'>
          <div style={{'background-color': 'red'}}>enemy img</div>
          <div className='enemy-data'>
            enemy data<br></br>
            <p>{this.props.currentEnemyData.name}</p>
            <p>{this.props.currentEnemyData.hp}</p>
            <p>{this.state.currentEnemyHand.length} cards</p>
          </div>
        </div>
        <div className='player-container'>

        </div>
      </div>
    )
  }
    
}

