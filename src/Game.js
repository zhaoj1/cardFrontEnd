import React from 'react';
import Card from './Card';
import Details from './Details';
import GraveyardCard from './GraveyardCard';
import slime from './images/slime.png'
import kobold from './images/kobold.png'
import ogre from './images/ogre.png'

var playerHand, enemyHand, enemyCard

const defaultState = {
  playerHP: 150,
  playerMaxHP: 150,
  playerHand: [],
  playerGraveyard: [],
  selectedCardIndex: null,
  currentEnemyHP: 0,
  currentEnemyMaxHP: 0,
  currentEnemyFullDeckIndex: [],
  currentEnemyHand: [],
  currentEnemyGraveyard: [],
  turn: 'player'
}

export default class Game extends React.Component{

  state = defaultState

  componentDidMount(){
    this.setState({
      playerHand: [...this.props.playerFullDeck],
      currentEnemyHP: this.props.enemies.find(enemy => enemy.id == this.props.currentEnemy).hp,
      currentEnemyMaxHP: this.props.enemies.find(enemy => enemy.id == this.props.currentEnemy).hp,
      currentEnemyFullDeckIndex: this.props.enemies.find(enemy => enemy.id == this.props.currentEnemy).deck.slice(1,-1).split(', ').map(n => parseInt(n))
    }, () => {
      this.setEnemyDeck()
    })
  }

  componentDidUpdate(prevProps){
    if(prevProps.currentEnemy !== this.props.currentEnemy){
      this.setState({
        playerHand: [...this.props.playerFullDeck],
        playerHP: this.state.playerMaxHP,
        playerGraveyard: [],
        selectedCardIndex: null,
        currentEnemyHP: this.props.enemies.find(enemy => enemy.id == this.props.currentEnemy).hp,
        currentEnemyMaxHP: this.props.enemies.find(enemy => enemy.id == this.props.currentEnemy).hp,
        currentEnemyFullDeckIndex: this.props.enemies.find(enemy => enemy.id == this.props.currentEnemy).deck.slice(1,-1).split(', ').map(n => parseInt(n))
      }, () => {
        this.setEnemyDeck()
      })
    }
  }

  setSelectedCard = (index) => {
    this.setState({
      selectedCardIndex: index
    })
  }

  playCard = (card) => {
    playerHand = this.state.playerHand

    playerHand.splice(this.state.selectedCardIndex, 1)
    if(card.effect_type == 'damage'){
      this.setState({
        currentEnemyHP: this.state.currentEnemyHP - card.hp_effect,
        playerHand: playerHand,
        selectedCardIndex: null,
        playerGraveyard: [...this.state.playerGraveyard, card],
        turn: 'enemy'
      }, () => {this.fightEnd();})
    }else if(card.effect_type == 'heal'){
      this.setState({
        playerHP: this.state.playerHP + card.hp_effect,
        playerHand: playerHand,
        selectedCardIndex: null,
        playerGraveyard: [...this.state.playerGraveyard, card],
        turn: 'enemy'
      }, () => {this.fightEnd();})
    }else if(card.effect_type == 'vamp'){
      this.setState({
        playerHP: this.state.playerHP + card.hp_effect,
        currentEnemyHP: this.state.currentEnemyHP - card.hp_effect,
        playerHand: playerHand,
        selectedCardIndex: null,
        playerGraveyard: [...this.state.playerGraveyard, card],
        turn: 'enemy'
      }, () => {this.fightEnd();})
    }
    
  }

  playEnemyCard = () => {
    enemyHand = this.state.currentEnemyHand

    if(this.state.currentEnemyHand.length == 0){
      this.setEnemyDeck();
    }else{
      enemyCard = enemyHand.splice(Math.random(0, enemyHand.length - 1), 1)[0]
      if(enemyCard.effect_type == 'damage'){
        this.setState({
          playerHP: this.state.playerHP - enemyCard.hp_effect,
          currentEnemyHand: enemyHand,
          currentEnemyGraveyard: [...this.state.currentEnemyGraveyard, enemyCard],
          turn: 'player'
        })
      }else if(enemyCard.effect_type == 'heal'){
        this.setState({
          currentEnemyHP: this.state.currentEnemyHP + enemyCard.hp_effect,
          currentEnemyHand: enemyHand,
          currentEnemyGraveyard: [...this.state.currentEnemyGraveyard, enemyCard],
          turn: 'player'
        })
      }else if(enemyCard.effect_type == 'vamp'){
        this.setState({
          playerHP: this.state.playerHP - enemyCard.hp_effect,
          currentEnemyHP: this.state.currentEnemyHP + enemyCard.hp_effect,
          currentEnemyHand: enemyHand,
          currentEnemyGraveyard: [...this.state.currentEnemyGraveyard, enemyCard],
          turn: 'player'
        })
      }
    }
    if(this.state.playerHP <= 0){
      this.props.openModal('lose')
    }
  }

  setEnemyDeck = () => {
    var enemyDeck= []
    this.state.currentEnemyFullDeckIndex.forEach(i => {
      enemyDeck = [...enemyDeck, this.props.cards.find(card => card.id == i)]
    })
    this.setState({
      currentEnemyHand: enemyDeck,
      currentEnemyGraveyard: [],
      turn: 'player'
    })
  }

  setPlayerDeck = () => {
    this.setState({
      playerHand: [...this.props.playerFullDeck],
      playerGraveyard: [],
      turn: 'enemy'
    }, () => {setTimeout(() => this.playEnemyCard(), 200)})
  }

  fightEnd = () => {
    if(this.state.currentEnemyHP <= 0){
      this.props.openModal('victory')
    }else if(this.state.playerHP <= 0){
      this.props.openModal('lose')
    }else{
      setTimeout(() => {this.playEnemyCard()}, 200)
    }
  }

  render(){
    return(
      <div className='game-screen'>
        <div className='game-mat'>
          <div className='detail-container'>
            <Details selectedCard={this.state.playerHand[this.state.selectedCardIndex]} />
          </div>
          <div className='enemy-data'>
            <div className='enemy-img'
              style={{
                'background-image':
                  this.props.currentEnemy == 1 ?
                    `url(${slime})`
                    :
                    this.props.currentEnemy == 2 ?
                      `url(${kobold})`
                      :
                      this.props.currentEnemy == 3 ?
                        `url(${ogre})`
                        :
                        null
              }}
            ></div>
            <p>{this.props.enemies.find(enemy => enemy.id == this.props.currentEnemy).name}</p>
            <div className='enemy-stats'>
              <div className='enemy-hp'>
                <div className='enemy-blood'
                  style={{
                    'width':`${
                      this.state.currentEnemyHP/this.state.currentEnemyMaxHP*100 >= 100 ?
                        100
                        :
                        this.state.currentEnemyHP/this.state.currentEnemyMaxHP*100 <= 0 ?
                          0
                          :
                          this.state.currentEnemyHP/this.state.currentEnemyMaxHP*100
                    }%`
                  }}
                >{this.state.currentEnemyHP}/{this.state.currentEnemyMaxHP}</div>
              </div>
              <div className='enemy-deck'>
                <div className='enemy-hand'>
                  {this.state.currentEnemyHand.map(card => {
                    return <Card card={card} container='enemy-hand' playCard={this.playCard} />
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className='game-mat-right'>
            <button className='main-menu-btn' onClick={() => this.props.openModal('main menu')} >Main Menu</button><br></br>
            enemy graveyard<br></br>
            <div className='graveyard-details'>
              {this.state.currentEnemyGraveyard.map(card => {
                return <GraveyardCard card={card} setSelectedCard={this.setSelectedCard} />
              })}
            </div>
            player graveyard<br></br>
            <div className='graveyard-details'>
              {this.state.playerGraveyard.map(card => {
                return <GraveyardCard card={card} setSelectedCard={this.setSelectedCard} />
              })}
            </div>
          </div>
        </div>
        <div className='player-container' >
          <div className='player-stats' >
            <div className='player-hp' >
              <div className='player-blood'
                style={{
                  'width':`${
                    this.state.playerHP/this.state.playerMaxHP*100 >= 100 ?
                      100
                      :
                      this.state.playerHP/this.state.playerMaxHP*100 <= 0 ?
                        0
                        :
                        this.state.playerHP/this.state.playerMaxHP*100
                  }%`
                }}
              >
                <p className='hp' >{this.state.playerHP}/{this.state.playerMaxHP}</p>
              </div>
            </div>
          </div>
          <div className='player-cards-container' >
            <div className='player-hand' >
              {this.state.playerHand.map((card, index) => {
                return <Card card={card} setSelectedCard={this.setSelectedCard} selectedCardIndex={this.state.selectedCardIndex} container='player-hand' index={index} playCard={this.playCard} turn={this.state.turn} />
              })}
            </div>
            <div className='graveyard-container' onClick={this.setPlayerDeck} >
              <div className=
                {this.state.playerHand.length == 0 ?
                  'click-graveyard'
                  :
                  'graveyard' 
                }
              >
                <label className='graveyard-length'>{this.state.playerGraveyard.length}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
    
}

