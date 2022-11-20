import React from "react";
import Movie from "../movieCard";
import Grid from "@mui/material/Grid";

const MovieList = ({ pageType, movies, action }) => {
  var movieCards;
  if(pageType === "discover"){
    movieCards = movies.map((m) => (
      <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2} sx={{marginLeft: "30px", marginTop: "20px"}}>
        <Movie key={m.id} movie={m} action={action} />
      </Grid>
    ));
  } else {
    movieCards = movies.map((m) => (
      <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
        <Movie key={m.id} movie={m} action={action} />
      </Grid>
    ));
  }
  return movieCards;
};

export default MovieList;