import { create } from "zustand";

export const bookList = create({
    books: [],
    isAddModalOpen: false,
    isEditModal: false,
    isDeleteModalOpen: false,
    newBook: {},
    currentBooks: null,

    setIsAddModalOpened: (isAddModalOpen) => (!isAddModalOpen),
    setIsDeleteModalOpen: (isDeleteModalOpen) => (isDeleteModalOpen),
    setIsEditModal: (isEditModal) => (!isEditModal)

})