import React from 'react';
import Card from './Card'
import Details from './Details'

class EditDeck extends React.Component{

  state = {
    selectedCard: {},
    errorMsg: null
  }

  setSelectedCard = (card) => {
    this.setState({selectedCard:card})
  }

  render(){
    return(
      <div className='edit-container'>
        <div className='editDeckButton-container' >
          <button className='editDeckButton' onClick={this.props.startGame}>Start Game</button>
        </div>
        <div className='edit-card-container'>
          <div className='edit-card-left'>
            <div className='cards-container'>
              <p className='edit-labels'>AVAILABLE CARDS</p>
              {this.props.cards.map(card => 
                <>
                  <Card card={card} setSelectedCard={this.setSelectedCard} selectedCard={this.state.selectedCard} setCardToDeck={this.props.setCardToDeck} container='edit' />
                </>
              )}
            </div>
            <div className='deck-editor'>
              <p className='edit-labels'>CURRENT DECK</p>
              {this.props.playerFullDeck.length == 0 ?
                null
                :
                this.props.playerFullDeck.map((card) => {
                  return <Card card={card} setSelectedCard={this.setSelectedCard} selectedCard={this.state.selectedCard} container='deck' removeCardFromDeck={this.props.removeCardFromDeck} />
                })
              }
            </div>
            <div className='instructions'>
              <p className='edit-labels'>INSTRUCTIONS</p>
              <div className='instructions-text'>
                <p>Click on a card to select and view details. Click on a selected card to add or remove from player hand.</p>
                <p>Player Hand MUST contain 5 cards.</p>
                <p>Limit to 1 -BIGDMG- card, other cards have no limit.</p>
              </div>
            </div>
          </div>
          <div className='edit-card-right'>
            <Details selectedCard={this.state.selectedCard} />
          </div>
        </div>
      </div>
    )
  }
}

export default EditDeck