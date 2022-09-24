import React, { useState, useEffect } from 'react';
import SubmitForm from './SubmitForm';
import CarList from './CarList';

function Cars() {
  const [success, setSuccess] = useState(null);
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/cars')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setCars(data.data);
        } else if (data.status === 'fail') {
          setError(data.message);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [success]);

  console.log('rendering');
  return (
    <>
      <SubmitForm
        success={success}
        setSuccess={setSuccess}
        error={error}
        setError={setError}
      />
      <CarList success={success} setSuccess={setSuccess} cars={cars} />
    </>
  );
}

export default Cars;
