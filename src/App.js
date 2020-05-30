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
    top : '50%',
    left : '50%',
    right : 'auto',
    bottom : 'auto',
    marginRight : '-50%',
    transform : 'translate(-50%, -50%)',
    backgroundColor : 'rgba(80,80,150,0.85)',
    border : 'black'
  },
  overlay: {
    zIndex:3,
    backgroundColor : 'rgba(0,0,0,0.75)'
  }
};

Modal.setAppElement('#root');

export default class App extends React.Component{
  
  constructor(){
    super();

    this.state = {
      cards: [],
      enemies: [],
      currentEnemy: 4,
      page: 'main',
      playerFullDeck:[],
      modal: false,
      modalContents: '',
      error: false,
      errorMsg: '',
      hasSpecialCard: false
    }
  }

  componentDidMount(){
    this.fetchCards();
    this.fetchEnemies();
  }

  fetchCards = () => {
    fetch('https://fantasy-redraw.herokuapp.com/cards')
    .then(resp => resp.json())
    .then(response => {
      this.setState({
        cards: response
      })
    })
  }

  fetchEnemies = () => {
    fetch('https://fantasy-redraw.herokuapp.com/enemies')
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
      this.setState({
        error: true,
        errorMsg: 'Deck needs to have 5 cards'
      })
      :
      this.setState({
        page: 'game',
        error: false,
        errorMsg: ''
      })
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
      modalContents: '',
      hasSpecialCard: false
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
    this.setState({
      error: false,
      errorMsg: ''
    })
    this.state.playerFullDeck.length == 5 ?
      this.setState({
        error: true,
        errorMsg: 'Deck cannot exceed 5 cards'
      })
      :
      this.state.hasSpecialCard && card.special ?
        this.setState({
          error: true,
          errorMsg: 'Deck can only have a single special card'
        })
        :
        deck = [...this.state.playerFullDeck, card].sort(function (a,b){return (a.id - b.id)})
        
        card.special ? 
          this.setState({
            playerFullDeck: deck,
            hasSpecialCard: true
          })
          :
          this.setState({
            playerFullDeck: deck
          })
  }

  removeCardFromDeck = (card) => {
    deck = this.state.playerFullDeck
    deck.splice(deck.findIndex(deckCard => deckCard.id == card.id), 1)
    this.setState({
      playerFullDeck: deck,
      error: false,
      errorMsg: ''
    })
    if(card.special){this.setState({hasSpecialCard: false})}
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
            <EditDeck startGame={this.startGame} cards={this.state.cards} setCardToDeck={this.setCardToDeck} playerFullDeck={this.state.playerFullDeck} removeCardFromDeck={this.removeCardFromDeck} error={this.state.error} errorMsg={this.state.errorMsg} mainMenu={this.mainMenu} />
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