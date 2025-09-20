import {Link} from 'react-router-dom';
import React from "react";

function error(){
    return(
        <div>
            <h1>Error 404</h1>
            <p>La página que buscas no existe</p>
            <Link to="/">Volver al inicio</Link>
        </div>
    )
}

export default error;