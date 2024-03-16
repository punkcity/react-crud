import React from "react";
import personDetailImg from "../images/persondetail1.png";
import { Link, useLocation } from "react-router-dom";

const PersonDetail = () => {
    const {state} = useLocation();
    const {id, firstName, lastName, company, email} = state.person;
    // const {id, name, email} = {"id":"1","name":"Tom Cruise","email":"hi@hi.com"};

    return (
        <div className="main" key={id} pid={id}>
            <div className="ui card centered">
                <div className="image">
                    <img src={personDetailImg} alt="Person Detail" />
                </div>
                <div className="content">
                    <div className="header">{firstName} {lastName}</div>
                    <div className="description">{email}</div>
                    <div className="description">{company}</div>
                </div>
            </div>
            <div className="center-div">
                <Link to={"/"}>
                    <button className="ui button blue center">
                        Back to List
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PersonDetail;