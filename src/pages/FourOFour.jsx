import React from 'react';
import { useNavigate } from 'react-router-dom';

const FourOFour = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>404: Page Not Found</h1>
            <img id='FourOFour-image' src="" alt="fourOfour-img" />
            <button onClick={() => navigate('/')}>Home</button>
        </div>
    );
};

export default FourOFour;