import React from "react";
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
        
    const deletePersonHandler = (id) => {
        console.log("PersonsList: deletePersonHandler: ", id);
        props.removePersonById(id);
    };
    const personsListUI = props.persons.map((person) => {
        return (
            <PersonTile person={person} deleteClickHandler={deletePersonHandler} key={person.id}/>
        );
    });
    return (
        <div className="ui main">
            <h2>Persons List
                <Link to="/add" className="ui right">
                    <button className="ui button blue right">Add Person</button>
                </Link>
            </h2>
            <div className="ui celled list">
                {personsListUI}
            </div>
        </div> 
    );
}

export default PersonsList;