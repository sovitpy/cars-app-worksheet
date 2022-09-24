import { useState } from 'react';

const EditModal = ({ car, show, setShow, success, setSuccess }) => {
  const carFormInitialData = {
    id: car.id,
    brand: car.brand,
    name: car.name,
    releaseYear: car.releaseYear,
    color: car.color,
  };
  const [carFormData, setCarFormData] = useState(carFormInitialData);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCarFormData({ ...carFormData, [name]: value });
  };

  const handleEdit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3001/cars', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carFormData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setError(null);
          setSuccess(data.message);
        } else if (data.status === 'fail') {
          setSuccess(null);
          setError(data.message);
        }
      });
  };

  return (
    <div className="modal-bg">
      {show && (
        <div className="modal-content">
          <form id="cars-form" onSubmit={handleEdit}>
            <h2 className="form-heading">Edit Car</h2>
            <label>
              ID:
              <input
                readOnly
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
            <input type="submit" value="Save" />
            <button
              className="close"
              onClick={() => {
                setSuccess(null);
                setError(null);
                setShow(false);
              }}
            >
              Close
            </button>
            {error && <p className="error-label">{error}</p>}
            {success && <p className="success-label">{success}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default EditModal;
