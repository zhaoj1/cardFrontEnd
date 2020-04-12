import React from 'react';
import MainMenu from './MainMenu'
import Game from './Game'
import EditDeck from './EditDeck'
import './App.css'

var deck

export default class App extends React.Component{
  
  constructor(){
    super();

    this.state = {
      cards: [],
      enemies: [],
      currentEnemy: 1,
      page: 'main',
      playerFullDeck:[]
    }
  }

  componentDidMount(){
    this.fetchCards();
    this.fetchEnemies();
  }

  fetchCards = () => {
    fetch('http://localhost:3000/cards')
    .then(resp => resp.json())
    .then(response => {
      this.setState({
        cards: response
      })
    })
  }

  fetchEnemies = () => {
    fetch('http://localhost:3000/enemies')
    .then(resp => resp.json())
    .then(response => {
      this.setState({
        enemies: response
      })
    })
  }

  editDeck = () => {
    this.setState({page:'edit'})
  }

  startGame = () => {
    this.setState({page: 'game'})
  }
  
  mainMenu = () => {
    this.setState({
      page: 'main',
      currentEnemy: 1
    })
  }

  setCardToDeck = (card) => {
    this.state.playerFullDeck.length == 9 ?
      alert('too many cards plz stop')
      :
      deck = [...this.state.playerFullDeck, card].sort(function (a,b){return (a.id - b.id)})
      this.setState({
        playerFullDeck: deck
      })
  }

  removeCardFromDeck = (card) => {
    deck = this.state.playerFullDeck
    deck.splice(deck.findIndex(deckCard => deckCard.id == card.id), 1)
    this.setState({playerFullDeck: deck})
  }

  render(){
    return(
      <div className='main-container'>
        {console.log(this.state.playerFullDeck)}
        {this.state.page == 'main' ?
          <MainMenu editDeck={this.editDeck} />
          :
          this.state.page == 'edit' ?
            <EditDeck startGame={this.startGame} cards={this.state.cards} setCardToDeck={this.setCardToDeck} playerFullDeck={this.state.playerFullDeck} removeCardFromDeck={this.removeCardFromDeck} />
            :
            this.state.page == 'game' ?
              <Game mainMenu={this.mainMenu} currentEnemyData={this.state.enemies.find(enemy => enemy.id == this.state.currentEnemy)} cards={this.state.cards}  />
              :
              null
        }
      </div>
    )
  }
}