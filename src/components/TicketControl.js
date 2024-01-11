import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';

class TicketControl extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      mainTicketList: [],
      selectedTicket: null,
      editing: false
    };
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.state.mainTicketList.filter(ticket => ticket.id === id)[0];
    this.setState({selectedTicket: selectedTicket});
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState( {
        formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
  } else {
    this.setState(prevState => ({
      formVisibleOnPage: !prevState.formVisibleOnPage,
    }));
    }
  }

  render(){
      let currentlyVisibleState = null;
      let buttonText = null;

      if (this.state.editing) {
        currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} onEditTicket = {this.handleEditingTicketInList}/>
        buttonText = "Return to Ticket List";
      } else if (this.state.selectedTicket != null) {
        currentlyVisibleState = <TicketDetail ticket= {this.state.selectedTicket} onClickingDelete = {this.handleDeletingTicket} onClickingEdit = {this.handleEditClick} />
        buttonText = 'Return to Ticket List'
      } 
      else if (this.state.formVisibleOnPage) {
        currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList}  />;
        buttonText = "Return to Ticket List";
      } else {
        currentlyVisibleState = <TicketList ticketList={this.state.mainTicketList} onTicketSelection={this.handleChangingSelectedTicket} />;
        buttonText = "Add Ticket";
      }

      return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
        </React.Fragment>
    );
  }

  handleDeletingTicket = (id) => {
    const newMainTicketList = this.state.mainTicketList.filter(ticket => ticket.id !== id);
    this.setState({
      mainTicketList: newMainTicketList,
      selectedTicket: null
    });
  }

  handleAddingNewTicketToList = (newTicket) => {
    const newMainTicketList = this.state.mainTicketList.concat(newTicket);
    this.setState({
      mainTicketList: newMainTicketList, 
      formVisibleOnPage: false
     });
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const editedMainticketList = this.state.mainTicketList
      .filter(ticket => ticket.id !== this.state.selectedTicket.id)
      .concat(ticketToEdit);
    this.setState({
      mainTicketList: editedMainticketList,
      editing: false,
      selectedTicket: null
    });
  }

}
export default TicketControl;
