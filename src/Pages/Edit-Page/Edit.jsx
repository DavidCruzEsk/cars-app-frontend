import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import FormTemplate from '../Shared-Components/FormTemplate';

const Edit = () => {
  const API = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const {id} = useParams();
  const [car, setCar] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${API}/${id}`, {...car, year: Number(car.year), price: Number(car.price)})
      .then(() => navigate(`/${id}`))
      .catch((err) => {
        if (err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError(err.response.data);
        }
      });
    setTimeout(() => setError(''), 3000);
  }

  useEffect(() => {
    axios
      .get(`${API}/${id}`)
      .then((res) => setCar(res.data))
      .catch((err) => navigate('*'));
  }, []);

  return (
    <section className='update-car-container'>
      <h1>Edit Car</h1>
      <FormTemplate
        car={car}
        setCar={setCar}
        handleSubmit={handleSubmit}
        error={error}
        navigate={navigate}
      />
    </section>
  );
}

export default Edit;
