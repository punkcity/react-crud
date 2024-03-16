import React, {useState} from "react";
import { Link } from "react-router-dom";
import PersonTile from "./PersonTile";


const PersonsList = (props) => {
    // const persons = [
    //     {
    //         id: uuidv4(),
    //         "name": "Tom Cruise",
    //         "email": "tom@cruise.com"
    //     },
    //     {
    //         id: uuidv4(),
    //         "name": "Brad Pitt",
    //         "email": "brad@pitt.com"
    //     },
    //     {
    //         id: uuidv4(),
    //         "name": "Angelina Jolie",
    //         "email": "angel@jolie.com"
    //     }
    // ];

    //Controls display of Popup to confirm Delete Person. ALSO when popup is shown, the list will be hidden
    const [popup, setPopup] = useState({
        show: false, // initial values set to false and null
        id: null
    });

    //When the delete button is clicked, show the popup
    const deleteClickHandler = (theId) => {
        setPopup({
            show: true,
            id: theId
        });
    };

    //Now when the user confirms the delete, ACTUALLY remove the person from the list
    const deleteConfirmHandler = () => {
        props.removePersonById(popup.id);
        deleteCancelHandler();
    };

    //On cancellation of the delete, hide the popup & SHOW the list again
    const deleteCancelHandler = () => {
        setPopup({
            show: false,
            id: null
        });
    }

    const editClickHandler = (id) => {
        props.handleEditClick(id);
    }

    const personsListUI = props.persons.map((person) => {
        return (
            <PersonTile person={person} deleteClickHandler={deleteClickHandler} editClickHandler={editClickHandler} key={person._id}/>
        );
    });
    return (
        <div className="ui main" style={{padding: "5px"}}>
            <h2>Persons List
                <Link to="/add" className="ui right" style={{float: "right"}}>
                    <button className="ui button blue right">Add Person</button>
                </Link>
            </h2>
            {popup.show && (
                <Popup popupst={popup} handleDeleteTrue={deleteConfirmHandler} handleDeleteCancel={deleteCancelHandler}/>
            )}
            {!popup.show && (
                <div className="ui celled list">
                    {personsListUI}
                </div>
            )}
        </div> 
    );
}

function Popup(props) {
    return (
      <div className="modal">
        <div className="modal_box">
          <p>You sure you want to delete?</p>
          <button className="ui button" onClick={props.handleDeleteCancel}>Cancel</button>
          <button onClick={props.handleDeleteTrue} className="ui button red">
            Delete
          </button>
        </div>
      </div>
    );
}


export default PersonsList;