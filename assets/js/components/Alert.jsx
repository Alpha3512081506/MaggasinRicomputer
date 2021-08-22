import React from 'react';

const Alert = ({ Children }) => {
    return (<>
        <div className="alert alert-info">
            <marquee behavior="down" direction="">
                <strong>Avvertimento!</strong> questo sito è in fase di sviluppo<span>by ❤️❤️❤️ Alpha Barry❤️❤️❤️</span>

            </marquee>
        </div>

    </>);
}

export default Alert;