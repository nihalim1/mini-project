import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllFoods } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FoodDetail.css'; // Custom CSS for additional styling

function FoodDetail() {
  const { id } = useParams(); // Get the food ID from the URL
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch all food data from API
    getAllFoods()
      .then((data) => {
        if (id) {
          // Filter to get the food item by id if an id is present in URL
          const foodItem = data.find(item => item.id.toString() === id);
          if (foodItem) {
            setFoods([foodItem]); // Set single food in an array
          } else {
            setError('Food item not found.');
          }
        } else {
          setFoods(data); // Set all food data if no specific id is in the URL
        }
        setLoading(false);  // Stop loading
      })
      .catch((err) => {
        console.error('Error fetching food data:', err);
        setError('Failed to fetch food data.');
        setLoading(false);  // Stop loading on error
      });
  }, [id]); // Dependency array includes 'id' so it re-fetches if the ID changes

  // Display error message if there's an error
  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  // Display loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // If no food data is found
  if (!foods || foods.length === 0) {
    return <p>No food details available.</p>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Food Details</h1>
      <div className="row justify-content-center">
        {foods.map((food) => (
          <div key={food.id} className="col-md-6 mb-4">
            <div className="card food-card shadow-sm">
              <img
                src={`http://localhost/backend/uploads/${food.image}?t=${new Date().getTime()}`}
                className="card-img-top food-card-img"
                alt={food.name}
              />
              <div className="card-body">
                <h5 className="card-title">{food.name}</h5>
                <p className="card-text">{food.description}</p>
                {food.details && <p className="card-text">{food.details}</p>}
                <p className="card-text">
                  <small className="text-muted">Created at: {new Date(food.created_at).toLocaleString()}</small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodDetail;
