import React from "react";
import Typography from "@mui/material/Typography";
import PersonMovieList from "../personMovieList";
import { getPersonMovies } from "../../api/tmdb-api";
import Spinner from '../spinner'
import { useQuery } from "react-query";

const PersonDetails = ({ person }) => {
  const { data , error, isLoading, isError } = useQuery(
    ["personMovies", { id: person.id }],
    getPersonMovies
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.cast.filter((movie) => movie.poster_path!==null)
  const sortedMovies = JSON.parse( JSON.stringify( movies )).sort((a,b) => (a.release_date < b.release_date ? 1 : -1 ))
  .map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      year: movie.release_date,
      poster_path: movie.poster_path,
    }
  }).filter((movie) => movie.title !== undefined)

  return (
    <>
      <Typography variant="h2" >
        {person.name}
      </Typography>
      <Typography variant="h4" sx={{marginTop: "20px"}}>
        Biography
      </Typography>
      <Typography variant="body1"  sx={{ color: "grey", marginTop: "10px" }}>
        {person.biography}
      </Typography>
      <PersonMovieList movies={sortedMovies}/>
    </>
  );
};
export default PersonDetails;