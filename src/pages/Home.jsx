import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [cars, setCars] = useState([]);
    const API = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API}`)
            .then(res => setCars(res.data))
            .catch(err => navigate('*'))
    }, []);

    // when marco pushes Humps, convert the cars variables into camelCase.
    return (
        <>
            <header className='car-selection-header'>
                <h1 className='cars-header'>Cars</h1>
                <h3 className='cars-selection-link'>Link</h3>
            </header>
            <div className='home-container'>
                {cars.map((car) => {
                    const { id, make, model, img_url } = car;
                    return (
                        <div className='car-portrait' key={id}>
                            <img src={img_url} alt='car-photo' width='200px' height='125px'/>
                            <div className='car-header-div'>
                                <h3 className='make-header'>{make}</h3>
                                <h2 className='model-header'><i>{model}</i></h2>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Home;