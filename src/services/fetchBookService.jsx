export const fetchInitialOfFilters = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/filter/initial-filter-fetch`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Return the data directly
  } catch (err) {
    console.error("Error while fetching:", err);
    throw err;
  }
};


export const fetchFilteredBooks = async ({ authors, genres, searchTerm }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/filter/custom-filter`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ authors, genres, searchTerm }),
      }
    );

    if (!response.ok) {
      throw new Error("Error in response");
    }

    const data = await response.json();
    return data.filteredBooks;
  } catch (error) {
    console.error("Error filtering books:", error);
    throw error;
  }
};
