import React from "react";
import { Link, Navigate } from "react-router-dom";

class AddPerson extends React.Component {
    //NOTE: This is a plain State, NOT a React Hook
    state = {
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        redirect: false
    };
    add = (e) => {
        //Prevent the default behaviour of the form -> i.e. to stop the page from refreshing when the form is submitted 
        e.preventDefault();
        // const navigate = useNavigate();
        if(this.state.firstName === "" || this.state.lastName === "" || this.state.email === "" || this.state.company === "") {
            alert("All the fields are mandatory!");
            return;
        }
        this.props.addPersonHandler(this.state);
        //Clear the internal state after the person is saved. ALSO set state to redirect to the home page
        this.setState({name: "", email: "", redirect: true});
        //this.props.history.push("/"); <== Did Not Work...because this is a class component!!!
    }
    render() {
        return (
            <div className="ui main"  style={{padding: "5px 10px"}}>
                <h2>Add Person</h2>
                { 
                     this.state.redirect && <Navigate to='/' replace={true}/>
                }
                <form className="ui form" onSubmit={this.add}>
                    <div className="field">
                        <label>First Name</label>
                        <input 
                            type="text" 
                            name="firstName" 
                            placeholder="First Name" 
                            value={this.state.firstName}
                            onChange={(e) => this.setState({firstName: e.target.value})}/>
                    </div>
                    <div className="field">
                        <label>Last Name</label>
                        <input 
                            type="text" 
                            name="lastName" 
                            placeholder="Last Name" 
                            value={this.state.lastName}
                            onChange={(e) => this.setState({lastName: e.target.value})}/>
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
                    <div className="field">
                        <label>Company</label>
                        <input 
                            type="text" 
                            name="company" 
                            placeholder="Company" 
                            value={this.state.company}
                            onChange={(e) => this.setState({company: e.target.value})}/>
                    </div>

                    <button className="ui button blue">Add</button>
                    <Link to="/">
                        <button className="ui button cancel">Cancel</button>
                    </Link>
                </form>
            </div>
        );
    }
}

export default AddPerson;