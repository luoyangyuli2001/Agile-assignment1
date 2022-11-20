import React, { useState } from "react";
import { getTopRatedMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import MyPagination from "../components/myPagination";

const TopRatedMoviesPage = () => {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isError }  = useQuery(
    ['topRated', {page}], 
    getTopRatedMovies
    )

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const totalPages = data.total_pages;
  const movies = data.results;

  return (
    <>
      <PageTemplate
        title="Top Rated Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
        }}
      />
      <MyPagination page={Number(page)} setPage={setPage} totalPages={Number(totalPages-30)}/>
    </>
  );
};

export default TopRatedMoviesPage;