import React from 'react'
import { getCurrentUser } from './authService'
const token = getCurrentUser();
import { useBookList } from '@/store/bookListingStore';



const fetchBooks = async () => {

    const { setBooks } = useBookList();

    try {
        const response = await fetch('/api/books', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(token)
        });

        if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
        }
        const data = await response.json();
        setBooks(data);
    }
    catch (error) {
        console.error('Error adding book:', error);
      }
}

const handleAddBook = async () => {
    const { newBook } = useBookList();
    try {
      await fetch('/api/books/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newBook , token}),
      });
      //   setNewBook({ title: '', author: '' });
      // Lookup to clean the setNewBooks and newBook states
      fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error);
    }
};
  
const handleEditBook = async () => {
    const { currentBook } = useBookList();
    try {
        await fetch(`/api/books/edit`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({currentBook,token}),
      });
    //   setCurrentBook(null);
      fetchBooks();
    } catch (error) {
      console.error('Error editing book:', error);
    }
  };


const handleDeleteBook = async () => {
    const { currentBook } = useBookList();
    try {
        const response = await fetch('api/books/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ currentBook, token })
        })
        if (!response.ok) {
            
        }
        fetchBooks();
    }catch (error) {
        console.error('Error Deleting book:', error);
      }
    
}
  
export {fetchBooks,handleAddBook,handleEditBook,handleDeleteBook}