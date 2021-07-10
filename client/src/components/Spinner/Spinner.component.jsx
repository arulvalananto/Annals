import React from 'react'
import "./Spinner.style.scss";

const Spinner = ({invert}) => {
    return (
        <div className={`spinner ${invert && "spinner--invert"}`}>
            {!invert && <div className="spinner__object"></div>}
        </div>
    )
}

export default Spinner;
