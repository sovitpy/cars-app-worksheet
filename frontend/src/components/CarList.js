import { useState } from 'react';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

const CarList = ({ cars, success, setSuccess }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);
  const [carToEdit, setCarToEdit] = useState(null);

  const handleEditClick = (car) => {
    setSuccess(null);
    setCarToEdit(car);
    setShowEditModal(true);
  };

  const handleDeleteClick = (car) => {
    setSuccess(null);
    setCarToDelete(car);
    setShowDeleteModal(true);
  };
  return (
    <>
      {showEditModal && (
        <EditModal
          car={carToEdit}
          show={showEditModal}
          setShow={setShowEditModal}
          success={success}
          setSuccess={setSuccess}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          car={carToDelete}
          show={showDeleteModal}
          setShow={setShowDeleteModal}
          success={success}
          setSuccess={setSuccess}
        />
      )}
      <h2>Cars Data</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Car Make</th>
            <th>Car Model</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.id}</td>
              <td>{car.brand}</td>
              <td>{car.name}</td>
              <td
                className="table-buttons"
                onClick={() => handleEditClick(car)}
              >
                ✎
              </td>
              <td
                className="table-buttons"
                onClick={() => handleDeleteClick(car)}
              >
                🗑
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CarList;
