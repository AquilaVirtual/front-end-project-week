import React, { Component } from 'react';
import NoteThumbnail from './NoteThumbnail';
import { Container, Row } from 'reactstrap';
import NoteButton from './NoteButton';
 import { withRouter } from 'react-router-dom';

class Notes extends Component {  
    state = {
        notes: false
    }

    logout = () => {
        console.log("Log")
        // localStorage.getItem('token')
          localStorage.removeItem('token');
          localStorage.removeItem('userId'); 
          this.props.logout();     
          this.props.history.push('/');
              
      };

        render() { 
            console.log(this.props);
        return ( this.state.notes ? ( null) : (

            <Container>
                <h3 className="heading">Your Notes:</h3> 
                <button onClick={this.logout}>logout</button>
                <Row className="notes-section">  
                    {this.props.state.notes ?
 
 this.props.state.notes.map( note => {
     return <NoteThumbnail note={note} key={note._id}/>
    }) : this.props.history.push('/notes')
}
                </Row>
            </Container>
          )
       )
    }
}
 
export default withRouter(Notes);