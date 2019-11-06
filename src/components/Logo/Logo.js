import React from 'react';
import Tilt from 'react-tilt';

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner pa3"> <img style={{paddingTop:'5px'}} src="https://img.icons8.com/wired/64/000000/face-id.png" alt="Nothing" /> 
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;