


export const fetchInitialOfFilters = async ({ initialSetAuthors, initialSetGenres,setArrivedContent }) => {
    try {
        const [authorData, GenreData, FilteredData] =
            await Promise.all(
                ['/api/filter/all-authors', '/api/filter/all-genres', '/api/filter/all-books'].map( async (val) => {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}${val}`);

                    if (!response.ok) {
                        console.log('error in response');
                    }
                    else {
                        return response.json();
                    }
                }) 
            )
        initialSetAuthors(authorData);
        initialSetGenres(GenreData);
        setArrivedContent(FilteredData)

    }
    catch (err) {
        throw new Error('error while fetching' + err);
    }
}