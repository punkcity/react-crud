import React from "react";
import { Navigate } from "react-router-dom";

class AddPerson extends React.Component {
    //NOTE: This is a plain State, NOT a React Hook
    state = {
        name: "",
        email: "",
        redirect: false
    };
    add = (e) => {
        //Prevent the default behaviour of the form -> i.e. to stop the page from refreshing when the form is submitted 
        e.preventDefault();
        // const navigate = useNavigate();
        if(this.state.name === "" || this.state.email === "") {
            alert("All the fields are mandatory!");
            return;
        }
        this.props.addPersonHandler(this.state);
        //Clear the internal state after the person is saved
        this.setState({name: "", email: ""});
        //this.props.history.push("/");
        this.state.redirect = true;
    }
    render() {
        return (
            <div className="ui main">
                <h2>Add Contact</h2>
                { 
                     this.state.redirect && <Navigate to='/' replace={true}/>
                }
                <form className="ui form" onSubmit={this.add}>
                    <div className="field">
                        <label>Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Name" 
                            value={this.state.name}
                            onChange={(e) => this.setState({name: e.target.value})}/>
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input 
                            type="text" 
                            name="email" 
                            placeholder="Work Email" 
                            value={this.state.email}
                            onChange={(e) => this.setState({email: e.target.value})}/>
                    </div>
                    <button className="ui button blue">Add</button>
                </form>

            </div>
        );
    }
}

export default AddPerson;