import React from 'react';
import MainMenu from './MainMenu'
import Game from './Game'
import EditDeck from './EditDeck'
import './App.css'

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
    this.setState({
      playerFullDeck: [...this.state.playerFullDeck, card]
    })
  }

  render(){
    return(
      <div className='main-container'>
        {this.state.page == 'main' ?
          <MainMenu editDeck={this.editDeck} />
          :
          this.state.page == 'edit' ?
            <EditDeck startGame={this.startGame} cards={this.state.cards} setCardToDeck={this.setCardToDeck} playerFullDeck={this.state.playerFullDeck} />
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