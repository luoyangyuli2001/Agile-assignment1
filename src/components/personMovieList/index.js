import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const PersonMovieList = ({movies}) => {
  const handleEnter = (e) => {
    e.target.style.color = 'blue';
  } 

  const handleLeave = (e) => {
    e.target.style.color = 'black';
  } 

  return (
    <>
      <Typography variant="h4" sx={{marginTop: "20px"}}>
        Known For
      </Typography>
      <ImageList sx={{
        width: "100%", 
        height: 320,
        gridAutoFlow: "column",
        gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr)) !important",
        gridAutoColumns: "minmax(160px, 1fr)"
      }}>
        {movies.map((m) => (
          <Link to={`/movies/${m.id}`} key={m.id} style={{color: "black",textDecoration: "none"}} >
              <ImageListItem>
              <img
                src={`https://image.tmdb.org/t/p/w500/${m.poster_path}`}
                alt={m.poster_path}
              />
              <ImageListItemBar
                title={m.title}
                position="below"
              />
            </ImageListItem>
          </Link>
        ))}
      </ImageList>
      <Typography variant="h4" sx={{marginTop: "20px"}}>
        Acting
      </Typography>
      <Paper component="ul" >
        {movies.map((m) => (
          <li key={m.id}>
            <Link to={`/movies/${m.id}`} 
              key={m.id} 
              style={{color: "black",textDecoration: "none"}} 
              onMouseEnter={(e)=> handleEnter(e)}
              onMouseLeave={(e)=> handleLeave(e)}>
              <Typography sx={{marginTop: "5px"}}>
                {m.year + " " + m.title}
              </Typography>
            </Link>
          </li>
        ))}
      </Paper>
    </>
  )
};

export default PersonMovieList;