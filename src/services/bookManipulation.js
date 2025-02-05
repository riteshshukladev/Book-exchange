import { refreshToken } from './protectedAuthService';

const BookManipulation = {
  async fetchBooks() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          const refreshed = await refreshToken();
          if (refreshed) {
            return BookManipulation.fetchBooks();
          }
          throw new Error('Authentication failed');
        }
        throw new Error('Error fetching books');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching books:', error.message);
      throw error;
    }
  },

  async handleAddBook(newBook, setBooks, closeAddModal, clearNewBook) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books/add`, {
        method: 'POST',
        credentials: 'include',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) {
        if (response.status === 401) {
          const refreshed = await refreshToken();
          if (refreshed) {
            return BookManipulation.handleAddBook(newBook, setBooks, closeAddModal, clearNewBook);
          }
          throw new Error('Authentication failed');
        }
        throw new Error('Error adding book');
      }

      await this.fetchBooks(setBooks);
      clearNewBook();
      closeAddModal();
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    }
  },

  async handleEditBook(currentBook, setBooks, closeEditModal) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books/edit`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentBook),
      });

      if (!response.ok) {
        if (response.status === 401) {
          const refreshed = await refreshToken();
          if (refreshed) {
            return BookManipulation.handleEditBook(currentBook, setBooks, closeEditModal);
          }
          throw new Error('Authentication failed');
        }
        throw new Error('Error editing book');
      }

      await this.fetchBooks(setBooks);
      closeEditModal();
    } catch (error) {
      console.error('Error editing book:', error);
      throw error;
    }
  },

  async handleDeleteBook(id, setBooks, closeDeleteModal) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          const refreshed = await refreshToken();
          if (refreshed) {
            return BookManipulation.handleDeleteBook(id, setBooks, closeDeleteModal);
          }
          throw new Error('Authentication failed');
        }
        throw new Error('Error deleting book');
      }

      await this.fetchBooks(setBooks);
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  }
};

export default BookManipulation;