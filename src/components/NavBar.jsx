import React from "react";
import { Link } from "react-router-dom";

export function NavBar(){
    return(
        <>
        <div style={{marginBottom: 20}}>
            <Link to={'/'}>
                <button>Home</button>
            </Link>
            <Link to={'/Admin'}>
                <button>Admin</button>
            </Link>
        </div>
            
        </>
    )
}