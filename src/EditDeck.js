import React from 'react';
import Card from './Card'
import Details from './Details'

class EditDeck extends React.Component{

  state = {
    selectedCard: {}
  }

  setSelectedCard = (card) => {
    this.setState({selectedCard:card})
  }

  render(){
    return(
      <div className='edit-container'>
        <button onClick={this.props.startGame}>Start Game</button>
        <div className='edit-card-container'>
          <div className='edit-card-left'>
            <div className='cards-container'>
              {this.props.cards.map(card => 
                <>
                  <Card card={card} setSelectedCard={this.setSelectedCard} selectedCard={this.state.selectedCard} setCardToDeck={this.props.setCardToDeck} container='edit' />
                </>
              )}
            </div>
            <div className='deck-editor'>
              {this.props.playerFullDeck.length == 0 ?
                null
                :
                this.props.playerFullDeck.map((card) => {
                  return <Card card={card} setSelectedCard={this.setSelectedCard} selectedCard={this.state.selectedCard} container='deck' removeCardFromDeck={this.props.removeCardFromDeck} />
                })
              }
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