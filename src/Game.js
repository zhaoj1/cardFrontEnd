import React from 'react';
import Card from './Card'

var playerHand, enemyHand, enemyCard

export default class Game extends React.Component{

  state = {
    playerHP: 10,
    playerMaxHP: 10,
    playerHand: [],
    playerGraveyard: [],
    selectedCardIndex: {},
    currentEnemyHP: 0,
    currentEnemyMaxHP: 0,
    currentEnemyFullDeckIndex: [],
    currentEnemyHand: [],
    currentEnemyGraveyard: [],
    turn: 'player'
  }

  setSelectedCard = (index) => {
    this.setState({
      selectedCardIndex: index
    })
  }

  playCard = (card) => {
    playerHand = this.state.playerHand
    enemyHand = this.state.currentEnemyHand

    playerHand.splice(this.state.selectedCardIndex, 1)
    if(card.effect_type == 'damage'){
      this.setState({
        currentEnemyHP: this.state.currentEnemyHP - card.hp_effect,
        playerHand: playerHand,
        selectedCardIndex: {},
        playerGraveyard: [...this.state.playerGraveyard, card],
        turn: 'enemy'
      })
    }else if(card.effect_type == 'heal'){
      this.setState({
        playerHP: this.state.playerHP + card.hp_effect,
        playerHand: playerHand,
        selectedCardIndex: {},
        playerGraveyard: [...this.state.playerGraveyard, card],
        turn: 'enemy'
      })
    }else if(card.effect_type == 'vamp'){
      this.setState({
        playerHP: this.state.playerHP + card.hp_effect,
        currentEnemyHP: this.state.currentEnemyHP - card.hp_effect,
        playerHand: playerHand,
        selectedCardIndex: {},
        playerGraveyard: [...this.state.playerGraveyard, card],
        turn: 'enemy'
      })
    }
      
    setTimeout(() => {
      enemyCard = enemyHand.splice(Math.random(0, enemyHand.length - 1), 1)[0]
      if(enemyCard.effect_type == 'damage'){
        this.setState({
          playerHP: this.state.playerHP - enemyCard.hp_effect,
          currentEnemyHand: enemyHand,
          currentEnemyGraveyard: [...this.state.currentEnemyGraveyard, enemyCard]
        })
      }else if(enemyCard.effect_type == 'heal'){
        this.setState({
          currentEnemyHP: this.state.currentEnemyHP + enemyCard.hp_effect,
          currentEnemyHand: enemyHand,
          currentEnemyGraveyard: [...this.state.currentEnemyGraveyard, enemyCard]
        })
      }else if(enemyCard.effect_type == 'vamp'){
        this.setState({
          playerHP: this.state.playerHP - enemyCard.hp_effect,
          currentEnemyHP: this.state.currentEnemyHP + enemyCard.hp_effect,
          currentEnemyHand: enemyHand,
          currentEnemyGraveyard: [...this.state.currentEnemyGraveyard, enemyCard]
        })
      }
    }, 200)
    
    
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
              <div className='enemy-deck'>
                <div className='enemy-hand'>
                  {this.state.currentEnemyHand.map(card => {
                    return <Card card={card} container='enemy-hand' playCard={this.playCard} />
                  })}
                </div>
                <div className='enemy-graveyard'>
                  graveyard<br></br>
                  {this.state.currentEnemyGraveyard.length}
                </div>
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
            {this.state.playerHand.map((card, index) => {
              return <Card card={card} setSelectedCard={this.setSelectedCard} selectedCardIndex={this.state.selectedCardIndex} container='player-hand' index={index} playCard={this.playCard} />
            })}
          </div>
          <div className='graveyard-container' >
            <div className='graveyard' >
              graveyard<br></br>
              {this.state.playerGraveyard.length}
            </div>
          </div>
        </div>
      </div>
    )
  }
    
}

