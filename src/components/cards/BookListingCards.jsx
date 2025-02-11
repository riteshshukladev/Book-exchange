import React, { useCallback } from "react";
import { Card, CardContent, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Edit, Trash2 } from "lucide-react";

const BookListingCard = React.memo(({ book, onEdit, onDelete }) => {
  
  const handleEdit = useCallback(() => onEdit(book), [onEdit, book]);
  const handleDelete = useCallback(() => onDelete(book), [onDelete, book]);

  return (
    <Card key={book.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex gap-4">
        {/* Image and other content */}
        <div className="flex flex-col justify-end">
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-semibold text-black font-josephine">
              {book.title}
            </h2>
            <p className="text-gray-800 mb-1 font-kreon text-base tracking-wide">
              Author: {book.author}
            </p>
            <p className="text-gray-800 mb-1 font-kreon text-base tracking-wide">
              Genre: {book.genre}
            </p>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export default BookListingCard;
