import { useState } from 'react';

const SubmitForm = ({ success, setSuccess, error, setError }) => {
  const carFormInitialData = {
    id: '',
    brand: '',
    name: '',
    releaseYear: '',
    color: '',
  };

  const [carFormData, setCarFormData] = useState(carFormInitialData);
  // const [error, setError] = useState(null);
  // const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarFormData({
      ...carFormData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isNaN(carFormData.id) && carFormData.id !== '') {
      carFormData.id = parseInt(carFormData.id);
      const res = await fetch('http://localhost:3001/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carFormData),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setError(null);
        setSuccess(data.message);
        setCarFormData(carFormInitialData);
      } else if (data.status === 'fail') {
        setSuccess(null);
        setError(data.message);
      }
    } else {
      setError('ID must be a number');
    }
  };
  return (
    <>
      <form id="cars-form" onSubmit={handleSubmit} autoComplete="off">
        {/**
         * TODO: Update the form fields with inputs for
         *    ID, Brand, Name, ReleaseYear and Color
         * Make required changes to  const carFormInitialData
         * */}
        <label>
          ID:
          <input
            name="id"
            type="text"
            value={carFormData.id}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Brand:
          <input
            name="brand"
            type="text"
            value={carFormData.brand}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Name:
          <input
            name="name"
            type="text"
            value={carFormData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Release Year:
          <input
            name="releaseYear"
            type="text"
            value={carFormData.releaseYear}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Color:
          <input
            name="color"
            type="text"
            value={carFormData.color}
            onChange={handleInputChange}
          />
        </label>
        <input type="submit" value="Submit" />
        {error && <p className="error-label">{error}</p>}
        {success && <p className="success-label">{success}</p>}
        {}
      </form>
      {/**
       * TODO: Update the code below to see any new proprties added to carFormData
       * */}
      <p>
        ID: {carFormData.id}, Brand: {carFormData.brand}, Name:{' '}
        {carFormData.name}, Release Year: {carFormData.year}, Color:{' '}
        {carFormData.color}
      </p>
    </>
  );
};

export default SubmitForm;
