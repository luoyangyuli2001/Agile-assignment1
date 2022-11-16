import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const AddToToWatchIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleAddToToWatch = (e) => {
    e.preventDefault();
    context.addToToWatch(movie);
  };

  return (
    <IconButton aria-label="add to to watch" onClick={handleAddToToWatch} >
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToToWatchIcon;