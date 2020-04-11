import React from 'react';
import MainMenu from './MainMenu'
import Game from './Game'

export default class App extends React.Component{
  
  constructor(){
    super();

    this.state = {
      cards: [],
      enemies: [],
      currentEnemy: 1,
      page: 'main'
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

  startGame = () => {
    this.setState({page: 'game'})
  }
  
  mainMenu = () => {
    this.setState({
      page: 'main',
      currentEnemy: 1
    })
  }

  render(){
    return(
      <div>
        {this.state.page == 'main' ?
          <MainMenu startGame={this.startGame} />
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