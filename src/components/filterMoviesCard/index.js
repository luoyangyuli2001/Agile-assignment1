import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'
import { Slider } from "@mui/material";
import Box from "@mui/material/Box"

function valuetext(value) {
  return `${value} min`;
}

const formControl = 
  {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)"
  };

export default function FilterMoviesCard(props) {

  const { data, error, isLoading, isError } = useQuery("genres", getGenres);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data.genres;
  if (genres[0].name !== "All"){
    genres.unshift({ id: "0", name: "All" });
  }

  const sortOptions = [
    { id: 0, name: "popularity.desc"},
    { id: 1, name: "popularity.asc"},
    { id: 2, name: "release_date.desc"},
    { id: 3, name: "release_date.asc"},
    { id: 4, name: "revenue.desc"},
    { id: 5, name: "revenue.asc"},
    { id: 6, name: "primary_release_date.desc"},
    { id: 7, name: "primary_release_date.asc"},
    { id: 8, name: "original_title.desc"},
    { id: 9, name: "original_title.asc"},
    { id: 10, name: "vote_average.desc"},
    { id: 11, name: "vote_average.asc"},
    { id: 12, name: "vote_count.desc"},
    { id: 13, name: "vote_count.asc"},
  ]

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); // NEW
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleSortChange = (e) => {
    handleChange(e, "sort", e.target.value);
  };

  const handleRuntimeChange = (e) => {
    handleChange(e, "runtime", e.target.value);
  };

  const handleUserScoreChange = (e) => {
    handleChange(e, "score", e.target.value);
  };


  return (
    <Card 
      sx={{
        maxWidth: 345,
        backgroundColor: "rgb(204, 204, 0)"
      }} 
      variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>
        <TextField
          sx={{...formControl}}
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
        />
        <FormControl sx={{...formControl}}>
          <TextField
            select
            label="Genre"
            id="genre-select"
            value={props.genreFilter}
            onChange={handleGenreChange}
            variant="filled"
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </TextField>
        </FormControl>
        <FormControl sx={{...formControl}}>
          <TextField
            select
            label="Sort"
            id="sort-select"
            value={props.sortFilter}
            onChange={handleSortChange}
            variant="filled"
          >
            {sortOptions.map((sort) => {
              return (
                <MenuItem key={sort.id} value={sort.name}>
                  {sort.name}
                </MenuItem>
              );
            })}
          </TextField>
        </FormControl>
        <Typography variant="h6" >
            Filter
        </Typography>
        <Box sx={{marginLeft:"20px" ,width: "80%"}}>
          <Typography variant="body1" >
            Runtime
          </Typography>
          <Slider
            value={props.runtimeFilter} 
            onChange={handleRuntimeChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            step={15}
            marks
            min={0}
            max={390}
          />
        </Box>
        <Box sx={{marginLeft:"20px" ,width: "80%"}}>
          <Typography variant="body1" >
            Score
          </Typography>
          <Slider
            value={props.userScoreFilter} 
            onChange={handleUserScoreChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            step={1}
            marks
            min={0}
            max={10}
          />
        </Box>
      </CardContent>
      <CardMedia
        sx={{ height: 300 }}
        image={img}
        title="Filter"
      />
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}