const API_URL = 'https://your-api-url.com/api'; // Replace with your actual API URL

export const AuthHelper = async ({actionType, data}) => {
  try {
    const response = await fetch(`${API_URL}/${actionType}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('HTTP error ' + response.status);
    }

    const data = await response.json();
    
    if (data.token) {
      // Store the token in localStorage or a more secure storage method
      localStorage.setItem('user', JSON.stringify(data));
    }

    return data;
  } catch (error) {
    // Handle and throw errors so they can be caught by the mutation
    if (error instanceof TypeError) {
      throw new Error('Network error: ' + error.message);
    } else {
      throw new Error('An error occurred during login: ' + error.message);
    }
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  // You might also want to make an API call to invalidate the token on the server
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};