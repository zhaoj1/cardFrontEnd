import React from 'react';
import Card from './Card';
import Details from './Details';
import GraveyardCard from './GraveyardCard';
import slime from './images/slime.png'
import kobold from './images/kobold.png'
import ogre from './images/ogre.png'
import lich from './images/lich.png'

var playerHand, enemyHand, enemyCard, multiplier, amount

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
  turn: 'player',
  playerDouble: false,
  enemyDouble: false
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
    this.state.playerDouble ? 
      multiplier = 2
      :
      multiplier = 1
    amount = card.effect * multiplier

    playerHand.splice(this.state.selectedCardIndex, 1)
    if(card.effect_type == 'damage'){
      this.setState({
        currentEnemyHP: this.state.currentEnemyHP - amount,
        playerHand: playerHand,
        selectedCardIndex: null,
        playerGraveyard: [...this.state.playerGraveyard, card],
        turn: 'enemy',
        playerDouble: false
      }, () => {this.fightEnd();})
    }else if(card.effect_type == 'heal'){
      this.setState({
        playerHP: this.state.playerHP + amount,
        playerHand: playerHand,
        selectedCardIndex: null,
        playerGraveyard: [...this.state.playerGraveyard, card],
        turn: 'enemy',
        playerDouble: false
      }, () => {this.fightEnd();})
    }else if(card.effect_type == 'vamp'){
      this.setState({
        playerHP: this.state.playerHP + amount,
        currentEnemyHP: this.state.currentEnemyHP - amount,
        playerHand: playerHand,
        selectedCardIndex: null,
        playerGraveyard: [...this.state.playerGraveyard, card],
        turn: 'enemy',
        playerDouble: false
      }, () => {this.fightEnd();})
    }else if(card.effect_type == 'buff'){
      this.setState({
        playerHand: playerHand,
        selectedCardIndex: null,
        playerGraveyard: [...this.state.playerGraveyard, card],
        turn: 'enemy',
        playerDouble: true
      }, () => {this.fightEnd();})
    }
  }

  selectEnemyCard = (hand) => {
    enemyCard = hand.splice(Math.floor(Math.random()*hand.length), 1)[0]
    if(this.state.enemyDouble && enemyCard.effect_type == 'buff'){
      this.selectEnemyCard()
    }
  }

  playEnemyCard = () => {
    enemyHand = this.state.currentEnemyHand
    this.state.enemyDouble ? 
      multiplier = 2
      :
      multiplier = 1

    if(this.state.currentEnemyHand.length == 0){
      this.setEnemyDeck();
    }else{
      this.selectEnemyCard(enemyHand);
      amount = enemyCard * multiplier

      if(enemyCard.effect_type == 'damage'){
        this.setState({
          playerHP: this.state.playerHP - enemyCard.effect,
          currentEnemyHand: enemyHand,
          currentEnemyGraveyard: [...this.state.currentEnemyGraveyard, enemyCard],
          turn: 'player',
          enemyDouble: false
        })
      }else if(enemyCard.effect_type == 'heal'){
        this.setState({
          currentEnemyHP: this.state.currentEnemyHP + enemyCard.effect,
          currentEnemyHand: enemyHand,
          currentEnemyGraveyard: [...this.state.currentEnemyGraveyard, enemyCard],
          turn: 'player',
          enemyDouble: false
        })
      }else if(enemyCard.effect_type == 'vamp'){
        this.setState({
          playerHP: this.state.playerHP - enemyCard.effect,
          currentEnemyHP: this.state.currentEnemyHP + enemyCard.effect,
          currentEnemyHand: enemyHand,
          currentEnemyGraveyard: [...this.state.currentEnemyGraveyard, enemyCard],
          turn: 'player',
          enemyDouble: false
        })
      }else if(enemyCard.effect_type == 'buff'){
        this.setState({
          currentEnemyHand: enemyHand,
          currentEnemyGraveyard: [...this.state.currentEnemyGraveyard, enemyCard],
          turn: 'player',
          enemyDouble: true
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
      turn: 'enemy',
      selectedCardIndex: null
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
          <div className='detail-container' 
            style={
              this.state.selectedCardIndex == null ? 
                {'visibility' : 'hidden'}
                :
                this.props.playerFullDeck[this.state.selectedCardIndex].effect_type == 'damage' && this.props.playerFullDeck[this.state.selectedCardIndex].effect == 8 || this.props.playerFullDeck[this.state.selectedCardIndex].effect_type == 'buff' ?
                {
                  'background-color': 'rgb(200,50,50)',
                  'visibility': 'visible'
                }
                :
                null
            }
          >
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
                        this.props.currentEnemy == 4 ?
                          `url(${lich})`
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
                ></div>
                <div className='hp-num'>{this.state.currentEnemyHP}/{this.state.currentEnemyMaxHP}</div>
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
            <button className='main-menu-btn' onClick={() => this.props.openModal('main menu')} >Main Menu</button>
            <div className='graveyard-details'>
              <label className='graveyard-labels'>ENEMY GRAVEYARD</label>
              {this.state.currentEnemyGraveyard.map(card => {
                return <GraveyardCard card={card} setSelectedCard={this.setSelectedCard} />
              })}
            </div>
            <div className='graveyard-details'>
              <label className='graveyard-labels'>PLAYER GRAVEYARD</label>
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
              ></div>
              <div className='hp-num' >{this.state.playerHP}/{this.state.playerMaxHP}</div>
            </div>
          </div>
          <div className='player-cards-container' >
            <div className='player-hand' >
              {this.state.playerHand.map((card, index) => {
                return <Card card={card} setSelectedCard={this.setSelectedCard} selectedCardIndex={this.state.selectedCardIndex} container='player-hand' index={index} playCard={this.playCard} turn={this.state.turn} />
              })}
            </div>
            <div className='graveyard-container' onClick={
              this.state.playerGraveyard.length == 0 ?
                null
                :
                this.setPlayerDeck
            } >
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

