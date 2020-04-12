import React from 'react';
import Card from './Card'

export default class Game extends React.Component{

  state = {
    playerHP: 10,
    playerMaxHP: 10,
    playerHand: [],
    selectedCardId: {},
    currentEnemyHP: 0,
    currentEnemyMaxHP: 0,
    currentEnemyFullDeckIndex: [],
    currentEnemyHand: []
  }

  setSelectedCard = (card) => {
    this.setState({selectedCard:card})
  }

  componentDidMount(){
    this.setState({
      playerHand: this.props.playerFullDeck,
      currentEnemyHP: this.props.currentEnemyData.hp,
      currentEnemyMaxHP: this.props.currentEnemyData.hp,
      currentEnemyFullDeckIndex: this.props.currentEnemyData.deck.slice(1,-1).split(', ').map(n => parseInt(n))
    }, () => {
      var enemyDeck= []
      this.state.currentEnemyFullDeckIndex.forEach(i => {
        enemyDeck = [...enemyDeck, this.props.cards.find(card => card.id == i)]
      })
      this.setState({
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
          <div className='enemy-data'>
            <div className='enemy-img'>enemy img</div>
            <p>{this.props.currentEnemyData.name}</p>
            <div className='enemy-stats'>
              <p>{this.state.currentEnemyHP}/{this.state.currentEnemyMaxHP}</p>
              <div className='enemy-hand'>
                {this.state.currentEnemyHand.map(card => {
                  return <Card card={card} container='enemy-hand' />
                })}
              </div>
            </div>
          </div>
        </div>
        <div className='player-container' >
          <div className='player-stats' >
            HP <br></br>
            {this.state.playerHP}/{this.state.playerMaxHP}
          </div>
          <div className='player-hand' >
            {this.state.playerHand.map(card => {
              return <Card card={card} setSelectedCard={this.setSelectedCard} selectedCard={this.state.selectedCard} container='player-hand' />
            })}
          </div>
          <div className='graveyard-deck-container' >
            <div className='graveyard' >
              graveyard
            </div>
            <div className='deck' >
              deck
            </div>
          </div>
        </div>
      </div>
    )
  }
    
}

