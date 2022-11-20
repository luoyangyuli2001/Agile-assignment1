import React from "react";
import PersonList from "../personList";
import Grid from "@mui/material/Grid";

function PersonListPageTemplate({ people }) {
  let displayedPeople = people
  return (
    <Grid container sx={{ padding: '20px' }}>
      <Grid item container spacing={5}>
        <PersonList people={displayedPeople}></PersonList>
      </Grid>
    </Grid>
  );
}
export default PersonListPageTemplate;