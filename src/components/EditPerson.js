import React, { useState } from "react";
import { Navigate, Link, useLocation, useNavigate } from "react-router-dom";

const EditPerson = (props) => {
    console.log("EditPerson: props: ", props);
    let fetchedState = useLocation().state.person;
    const navigate = useNavigate();
    console.log("EditPerson: state: ", fetchedState);
    let [state, setState] = useState(fetchedState);
    // const {_id, firstName, lastName, company, email} = state.person;

    //NOTE: This is a plain State, NOT a React Hook
    // state = {
    //     firstName: "",
    //     lastName: "",
    //     email: "",
    //     company: "",
    //     redirect: false
    // };
    state.redirect = false;

    const update = (event) => {
        //Prevent the default behaviour of the form -> i.e. to stop the page from refreshing when the form is submitted 
        event.preventDefault();
        // setState((state, fieldName) => {return {...state, fieldName: fieldValue}});
        
        if(state.firstName === "" || state.lastName === "" || state.email === "" || state.company === "") {
            alert("All the fields are mandatory!");
            return;
        }
        console.log("EditPerson: update: ", state);
        props.editPersonHandler(state);
        //Clear the internal state after the person is saved. ALSO set state to redirect to the home page
        // this.setState({name: "", email: "", redirect: true});
        //props.history.push("/");
        navigate("/");
    }
    return (
        <div className="ui main" style={{padding: "5px 10px"}}>
            <h2>MODIFY Person Details</h2>
            { 
                    state.redirect && <Navigate to='/' replace={true}/>
            }
            <form className="ui form" onSubmit={update}>
                <div className="field">
                    <label>First Name</label>
                    <input 
                        type="text" 
                        name="firstName" 
                        placeholder="First Name" 
                        value={state.firstName}
                        onChange={(e) => setState({...state, firstName: e.target.value})}/>
                </div>
                <div className="field">
                    <label>Last Name</label>
                    <input 
                        type="text" 
                        name="lastName" 
                        placeholder="Last Name" 
                        value={state.lastName}
                        onChange={(e) => setState({...state, lastName: e.target.value})}/>
                </div>
                <div className="field">
                    <label>Email</label>
                    <input 
                        type="text" 
                        name="email" 
                        placeholder="Work Email" 
                        value={state.email}
                        onChange={(e) => setState({...state, email: e.target.value})}/>
                </div>
                <div className="field">
                    <label>Company</label>
                    <input 
                        type="text" 
                        name="company" 
                        placeholder="Company" 
                        value={state.company}
                        onChange={(e) => setState({...state, company: e.target.value})}/>
                </div>

                <button className="ui button blue" type="submit">Save</button>
                <Link to="/">
                    <button className="ui button cancel">Cancel</button>
                </Link>
            </form>

        </div>
    );
}

export default EditPerson;