import { getCurrentUser } from './authService';
import { useBookList } from '@/store/bookListingStore';

const BookManipulation = {
  async fetchBooks(setBooks) {

    
    const user = getCurrentUser();
    // if (!user || !user.token) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user}`
        },
      });

      if (!response.ok) {
        console.log("in the response checking");
        throw new Error('HTTP error ' + response.status + response.message);
      }
      const data = await response.json();

    
      setBooks(data.data);
    } catch (error) {
      console.error('Error fetching books:', error.message);
      throw error.message
    }
  },

  async handleAddBook(newBook,setBooks,closeAddModal,clearNewBook) {
    // const { newBook, setNewBook } = useBookList();
    const user = getCurrentUser();
    console.log(user + newBook.title + newBook.author);
    // if (!user || !user.token) return;
    // console.log('in to the try lobby')
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books/add`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user}`
        },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) {
        console.log("in the response checking");
        throw new Error('HTTP error ' + response.status + response.message);
        
      }

      // setNewBook({ title: '', author: '', genre: [] });
      await this.fetchBooks(setBooks);
      clearNewBook();
      closeAddModal();
    } catch (error) {
      console.error('Error adding book:', error);
      throw error.message
    }
  },

  async handleEditBook(currentBook,setBooks,closeEditModal) {
   
    const user = getCurrentUser();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user}`
        },
        body: JSON.stringify(currentBook),
      });

      if (!response.ok) {
        console.log("in the response checking");
        throw new Error('HTTP error ' + response.status);
      }

      await this.fetchBooks(setBooks);
      closeEditModal();
      console.log('in the body of edit')
    } catch (error) {
      console.error('Error editing book:', error);
      throw error.message
    }
  },

  async handleDeleteBook(id,setBooks,closeDeleteModal) {
    const user = getCurrentUser();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/books/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user}`
        },
      });

      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }

      await this.fetchBooks(setBooks);
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error.message
    }
  }
};

export default BookManipulation;