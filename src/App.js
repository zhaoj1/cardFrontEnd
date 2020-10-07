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
    backgroundColor : 'rgba(250,250,250,0.75)',
    border : 'black',
    padding : '2%',
    width: '50%'
  },
  overlay: {
    zIndex:3,
    backgroundColor : 'rgba(0,0,0,0.75)'
  }
};

const cards = [
  {id: 1, name: 'big dmg', description: 'Deal 10 damage', effect_type: 'damage', effect: 10, special: true},
  {id: 2, name: 'double', description: 'Next card x2 effect', effect_type: 'buff', effect: 0, special: true},
  {id: 3, name: 'guard', description: 'Block enemy card', effect_type: 'guard', effect: 0, special: true},
  {id: 4, name: 'lil dmg', description: 'Deal 4 damage', effect_type: 'damage', effect: 4, special: false},
  {id: 5, name: 'heal', description: 'Heal 8 HP', effect_type: 'heal', effect: 8, special: false},
  {id: 6, name: 'vamp', description: 'Deal 3 damage and heal 3 HP', effect_type: 'vamp', effect: 3, special: false},
  {id: 7, name: 'dagger', description: 'Deal 2 damage and redraw 1 random card from graveyard', effect_type: 'draw', effect: 2, special: false}
]

const enemies = [
  {id: 1, name: 'Slime', hp: 30, deck: [4,4,4,5]},
  {id: 2, name: 'Kobold', hp: 50, deck: [1,4,5,6]},
  {id: 3, name: 'Orc', hp: 80, deck: [1,4,4,4]},
  {id: 4, name: 'Lich King', hp: 100, deck: [1,2,4,4]}
]

Modal.setAppElement('#root');

export default class App extends React.Component{
  
  constructor(){
    super();

    this.state = {
      cards: cards,
      enemies: enemies,
      currentEnemy: 1,
      page: 'main',
      playerFullDeck:[],
      modal: false,
      modalContents: '',
      error: false,
      errorMsg: '',
      hasSpecialCard: false
    }
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