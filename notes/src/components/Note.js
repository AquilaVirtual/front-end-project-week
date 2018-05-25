import React, { Component } from 'react';
import { Container, Row, Col, Modal, ModalBody, ModalFooter, ModalHeader, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import NewNote from './NewNote';
import NoteButton from './NoteButton';


class Note extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: null,
            title: '',
            content: '',
            id: '',
            edit: false,           
            modal: false,
            delete: false
        }
    } 

    editNote = () => {
       const element = this.props.state.notes.map((note) => {
           console.log("Element", element);
            if(this.props.match.params.id === note.id.toString()) { 
               return note;
              }
            })
             return <Redirect to={`/edit/${element[0].id}`}  />         
           
    }

    toggleModal = () => {
        this.setState({modal: !this.state.modal});
    }

    deleteNote = () => {
       
        this.props.state.notes.map((note, index) => {
            if(this.props.match.params.id === note.id.toString()) { 
                this.props.state.notes.splice(index, 1);
            }            
        }) 
        this.setState({delete: true});      
      }       

    render() { 
        console.log("Notejs State", this.state.id);
        return ( 
            this.state.delete ? (
           <Redirect to="/" />
         ) :  (                            
              
                <Container>                        
                         <div className="edit-delete">
                             <div className="edit-delete">
                             <Link  className="edit" to={`/edit/${this.props.match.params.id}`}>edit </Link>                           
                             <a className="delete" onClick={this.toggleModal}>delete</a>
                             </div>
                             <Modal isOpen={this.state.modal}
                                 toggle={this.toggleModal}
                                 size="lg"
                                 className="delete-modal">
                                 <ModalBody>
                                     <p className="confirm">Are you sure you want to delete this?</p>
                                     <div className="btn-container">
                                         <div 
                                             onClick={this.deleteNote} 
                                             className="btn-holder">
                                             <NoteButton color="danger" value="Delete"/>
                                         </div>
                                         <div 
                                             onClick={this.toggleModal} 
                                             className="btn-holder">
                                             <NoteButton color="main" value="No"/>
                                         </div>
                                     </div>
                                 </ModalBody>
                             </Modal>                            
                         </div>                       
                       
                         {this.props.state.notes.map((note) => {                            
                            if(this.props.match.params.id === note.id.toString()) {                           
                           return (  <div key={note.id}>                                
                                    <Card className ="note-thumbnail">
                                        <CardBody>
                                            <CardTitle className="note-title heading">
                                                {note.title}
                                                </CardTitle >                                         
                                               <CardText>
                                            {note.content}
                                        </CardText>                                    
                                     </CardBody>
                                    </Card>                                
                                </div>)
                               }           
                            })}                           
                    </Container>
                )
            )
        
    }
}
 
 export default Note;