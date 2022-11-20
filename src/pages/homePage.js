import React, { useEffect, useState } from "react";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import Header from "../components/headerMovieList";
import FilterCard from "../components/filterMoviesCard";
import MovieList from "../components/movieList";
import Grid from "@mui/material/Grid";


const HomePage = () => {
  const [moviesData, setMoviesData] = useState([])
  const [page, setPage] = useState(1);
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [sortFilter, setSortFilter] = useState("popularity.desc")
  const [runtimeFilter, setRuntimeFilter] = useState([0,390])
  const [userScoreFilter, setUserScoreFilter] = useState([0,10])
  const genreId = Number(genreFilter);

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "sort") setSortFilter(value);
    else if (type === "runtime") setRuntimeFilter(value);
    else if (type === "score") setUserScoreFilter(value);
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&sort_by=${sortFilter}&include_adult=false&with_runtime.gte=${runtimeFilter[0]}&with_runtime.lte=${runtimeFilter[1]}&vote_average.gte=${userScoreFilter[0]}&vote_average.lte=${userScoreFilter[1]}&include_video=false&page=${page}`
    )
    .then(response => response.json())
    .then(json => {
      setMoviesData(prev => [...prev, ...json.results]);
    })
  }, [page]); //eslint-disable-line

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&sort_by=${sortFilter}&include_adult=false&with_runtime.gte=${runtimeFilter[0]}&with_runtime.lte=${runtimeFilter[1]}&vote_average.gte=${userScoreFilter[0]}&vote_average.lte=${userScoreFilter[1]}&include_video=false&page=1`
    )
    .then(response => response.json())
    .then(json => {
      setMoviesData(json.results)
    })
  }, [sortFilter, runtimeFilter,userScoreFilter])

  const handleScroll = () => {
    if(window.innerHeight + document.documentElement.scrollTop + 1 >= document
      .documentElement.scrollHeight) {
        setPage(prev => prev + 1)
      }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [])

  const title="Discover Movies"
  let displayedMovies = moviesData
  .filter((m) => {
    return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
  })
  .filter((m) => {
    return genreId > 0 ? m.genre_ids.includes(genreId) : true;
  });

  return (
    <Grid container sx={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <Grid key="find" item xs={2}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            sortFilter={sortFilter}
            runtimeFilter={runtimeFilter}
            userScoreFilter={userScoreFilter}
          />
        </Grid>
        <Grid item xs={10} sx={{ display: "flex", flexWrap: "wrap",}}>
          {}
          <MovieList action={(movie) => {return <AddToFavoritesIcon movie={movie} />}} 
            movies={displayedMovies} pageType={"discover"} />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default HomePage;