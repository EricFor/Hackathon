import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage(props) {
    const navigate = useNavigate();

    return (
        <div>
            <div className="float-right">
                <button className="btn btn-primary m-2" onClick={() => navigate("/login")}>login</button>
                <button className="btn btn-primary m-2" onClick={() => navigate("/signup")}>signup</button>
            </div>
        </div>
    );
}
