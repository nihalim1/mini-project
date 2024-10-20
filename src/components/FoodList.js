import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // เพิ่ม useNavigate
import { getFoods } from '../services/api';
import './FoodList.css'; 

function FoodList() {
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // ใช้สำหรับการนำทาง

  useEffect(() => {
    getFoods()
      .then(data => setFoods(data))
      .catch(err => {
        console.error('Error fetching foods:', err);
        setError('Failed to fetch food data.');
      });
  }, []);

  const handleClick = (id) => {
    navigate(`/food/${id}`); // เมื่อคลิกให้ไปที่หน้ารายละเอียดอาหาร
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">รายการอาหาร</h1>
      <div className="row">
        {foods.length > 0 ? (
          foods.map(food => (
            <div key={food.id} className="col-md-4 mb-4" onClick={() => handleClick(food.id)}>
              <div className="card h-100 food-item">
                {food.image ? (
                  <img
                    src={`http://localhost/backend/uploads/${food.image}?t=${new Date().getTime()}`}
                    className="card-img-top food-image"
                    alt={food.name}
                  />
                ) : (
                  <div className="no-image">No image available</div>
                )}
                <div className="card-body">
                  <h5 className="card-title">{food.name}</h5>
                  <p className="card-text">{food.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No food data available.</p>
        )}
      </div>
    </div>
  );
}

export default FoodList;
