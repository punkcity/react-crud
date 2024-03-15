import React from "react";
import { useNavigate } from "react-router-dom";

const PersonTile = (props) => {
    const {id, name, email} = props.person;
    const navigate = useNavigate();
    return (
        <div className="item" key={id} pid={id}>
            <i className="large user middle aligned icon"></i>
            <div className="content" onClick={() => navigate(`/persondetail/${id}`, {state:{person: props.person}})} style={{cursor:"pointer"}}>
                {/* <Link to={{pathname:`/persondetail/${id}`, state:{person: props.person}}}> */}
                    <div className="header">{name}</div>
                    <div>{email}</div>
                {/* </Link> */}
            </div>
            <i className="trash alternate outline icon"
                style={{ color: "red", marginTop: "7px" }}
                onClick={() => props.deleteClickHandler(id)}>
            </i>
        </div>
    );
};

export default PersonTile;
