import React from 'react';
import MainMenu from './MainMenu'
import Game from './Game'
import EditDeck from './EditDeck'
import './App.css'
import Modal from 'react-modal'
import Confirmation from './Confirmation'
import Instructions from './Instructions'

var deck

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
  }
};

Modal.setAppElement('#root');

export default class App extends React.Component{
  
  constructor(){
    super();

    this.state = {
      cards: [],
      enemies: [],
      currentEnemy: 1,
      page: 'main',
      playerFullDeck:[],
      modal: false,
      modalContents: ''
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
    this.state.playerFullDeck.length !== 5 ? 
      alert('deck needs to have 5 cards')
      :
      this.setState({page: 'game'})
  }

  showInstructions = () => {
    this.setState({page:'instructions'})
  }
  
  mainMenu = () => {
    this.setState({
      page: 'main',
      currentEnemy: 1,
      playerFullDeck: [],
      modal: false,
      modalContents: ''
    })
  }

  nextEnemy = () => {
      this.setState({currentEnemy: this.state.currentEnemy + 1})
      this.closeModal();
  }

  gameCompleted = () => {
    this.setState({modalContents: 'congrats'})
  }

  setCardToDeck = (card) => {
    this.state.playerFullDeck.length == 5 ?
      alert('too many cards plz stop')
      :
      this.state.playerFullDeck[0] && this.state.playerFullDeck[0].id == 1 && card.id == 1?
        alert('can only have 1 bigdmg card')
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

  openModal = (contents) => {
    this.setState({
      modal: true, 
      modalContents: contents
    })
  }

  closeModal = () => {
    this.setState({
      modal: false,
      modalContents: ''
    })
  }

  render(){
    return(
      <div className='main-container'>
        <Modal
          isOpen={this.state.modal}
          style={customStyles}
        >
          <Confirmation mainMenu={this.mainMenu} closeModal={this.closeModal} modalContents={this.state.modalContents} nextEnemy={this.nextEnemy} gameCompleted={this.gameCompleted} currentEnemy={this.state.currentEnemy} enemies={this.state.enemies} />
        </Modal>
        {this.state.page == 'main' ?
          <MainMenu editDeck={this.editDeck} showInstructions={this.showInstructions} />
          :
          this.state.page == 'edit' ?
            <EditDeck startGame={this.startGame} cards={this.state.cards} setCardToDeck={this.setCardToDeck} playerFullDeck={this.state.playerFullDeck} removeCardFromDeck={this.removeCardFromDeck} />
            :
            this.state.page == 'game' ?
              <Game mainMenu={this.mainMenu} enemies={this.state.enemies} cards={this.state.cards} playerFullDeck={this.state.playerFullDeck} currentEnemy={this.state.currentEnemy} gameWon={this.gameWon} openModal={this.openModal} />
              :
              this.state.page == 'instructions' ?
                <Instructions mainMenu={this.mainMenu} />
                :
                null
        }
      </div>
    )
  }
}