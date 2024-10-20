export const getFoods = async () => {
    const response = await fetch('http://localhost/backend/api/get_food.php');
    return await response.json();
};

export const createFood = async (formData) => {
    await fetch('http://localhost/backend/api/create_food.php', {
      method: 'POST',
      body: formData,
    });
};

export const updateFood = async (id, formData) => {
    await fetch(`http://localhost/backend/api/update_food.php?id=${id}`, {
      method: 'POST',
      body: formData,
    });
};

export const deleteFood = async (id) => {
    await fetch(`http://localhost/backend/api/delete_food.php?id=${id}`, {
      method: 'DELETE',
    });
};

// This is your existing getFoodById function
export const getFoodById = async (id) => {
    const response = await fetch(`http://localhost/backend/api/all-food.php/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch food details');
    }
    return await response.json();
};

// New getAllFoods function to fetch all foods
export const getAllFoods = async () => {
    const response = await fetch('http://localhost/backend/api/all-food.php');
    if (!response.ok) {
      throw new Error('Failed to fetch all food items');
    }
    return await response.json();
};
