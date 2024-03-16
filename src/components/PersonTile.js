import React from "react";
import { Link, useNavigate } from "react-router-dom";

const PersonTile = (props) => {
    const {_id, firstName, lastName, email} = props.person;
    const navigate = useNavigate();

    return (
        <div className="item" key={_id} id={_id}>
            <i className="edit alternate outline icon"
                style={{ color: "teal", paddingTop: ".7em", cursor: "pointer"}}
                onClick={() => navigate(`/personedit/${_id}`, {state:{person: props.person}})}>
            </i>
            <i className="large user middle aligned icon"></i>
            <div className="content" onClick={() => navigate(`/persondetail/${_id}`, {state:{person: props.person}})} style={{cursor:"pointer"}}>
                {/* <Link to={{pathname:`/persondetail/${id}`, state:{person: props.person}}}> */}
                    <div className="header">{firstName} {lastName}</div>
                    <div>{email}</div>
                {/* </Link> */}
            </div>
            <i className="trash alternate outline icon"
                style={{ color: "red", paddingTop: ".7em", cursor: "pointer"}}
                onClick={() => props.deleteClickHandler(_id)}>
            </i>
        </div>
    );
};

export default PersonTile;
