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
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Network error: ' + error.message);
    } else {
      throw new Error('An error occurred during login: ' + error.message);
    }
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token')
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export const getToken = () => {
  return localStorage.getItem('token');
}


export const isAuthenticated = () => {
  const token = getToken();
  if (!token) {
    return false;
  }
  return token;
}

