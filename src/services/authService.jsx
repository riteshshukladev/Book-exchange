

export const AuthHelper = async ({ actionType, data }) => {
  console.log(`${import.meta.env.VITE_API_URL}/${actionType}`);
  console.log(data, actionType);
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${actionType}`, {
      
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`${response.message}:${response.status}`);
    }

    const responseData = await response.json();
    
    if (responseData.token) {
      
      localStorage.setItem('token', responseData.token);
    }

    return responseData;
  } catch (error) {
    if (error instanceof TypeError) {
      console.log(error.message);
      throw new Error(error.message);
    } else {
      console.log(error.message);
      throw new Error( error.message);
    }
  }
};

export const logout = () => {
  // localStorage.removeItem('email');
  localStorage.removeItem('token')
};

export const getCurrentUser = () => {
  return localStorage.getItem('token');
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

