import react from 'react';
import './loader.css'

function Loader(){
    return(
        <div classname="loader-wrap">
            <div className="spinner" aria-hidden="true"></div>
            <p className="loader-text">cargando...</p>
            </div>
    )
}
export default Loader;