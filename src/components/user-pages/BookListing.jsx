import React from 'react'
import { bookList } from '../../store/bookListingStore';



const BookListing = () => {

  const { books, isAddModalOpen, isEditModal, isDeleteModalOpen, newBook, currentBooks,setIsAddModalOpened,setIsDeleteModalOpen,setIsEditModal } = bookList();


  return (
    <section>

  </section>
  )
}

export default BookListing;