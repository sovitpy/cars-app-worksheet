import { useState } from 'react';

const DeleteModal = ({ car, show, setShow, success, setSuccess }) => {
  const [error, setError] = useState(null);
  const [deleted, setDeleted] = useState(null);

  const handleDelete = (car) => {
    fetch('http://localhost:3001/cars', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setDeleted(true);
          setError(null);
          setSuccess(data.message);
        } else if (data.status === 'fail') {
          setSuccess(null);
          setError(data.message);
          console.log(error);
        }
      });
  };
  return (
    <div className="modal-bg">
      <div className="modal-content delete-box">
        {!deleted && (
          <>
            <h3>Are you sure you want to delete this car?</h3>
            <button className="close" onClick={() => handleDelete(car)}>
              Yes
            </button>
            <button
              className="no-button"
              onClick={() => {
                setSuccess(null);
                setError(null);
                setShow(false);
              }}
            >
              No
            </button>
            {error && <p className="error-label">{error}</p>}
          </>
        )}
        {deleted && (
          <>
            <h3>Car Deleted!</h3>
            <button
              className="no-button"
              onClick={() => {
                setSuccess(null);
                setError(null);
                setShow(false);
                setDeleted(null);
              }}
            >
              Okay
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DeleteModal;
