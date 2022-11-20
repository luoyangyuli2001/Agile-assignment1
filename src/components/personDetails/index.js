import React from "react";
import Typography from "@mui/material/Typography";
import PersonMovieList from "../personMovieList";

const PersonDetails = ({ person }) => {

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
      <PersonMovieList person={person}/>
    </>
  );
};
export default PersonDetails;