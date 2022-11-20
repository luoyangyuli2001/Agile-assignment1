import React from "react";
import Box  from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { v4 as uuidv4 } from 'uuid';

const genderParseString = (genderNum) => {
  if (genderNum === 1) return "Female";
  else return "Male";
}

const PersonInfo = ({ person }) => {
  return (
    <Box>
      <Typography variant="h4" sx={{fontSize: "40px"}}>
        Personal Info
      </Typography>
      <Box>
        <Typography variant="subtitle1" sx={{fontSize: "25px"}}>
          Known For
        </Typography>
        <Typography variant="body1" sx={{marginBottom: "20px"}}>
          {person.known_for_department}
        </Typography>
        <Typography variant="subtitle1" sx={{fontSize: "25px"}}>
          Known Credit
        </Typography>
        <Typography variant="body1" sx={{marginBottom: "20px"}}>
          {Math.round(person.popularity)}
        </Typography>
        <Typography variant="subtitle1" sx={{fontSize: "25px"}}>
          Gender
        </Typography>
        <Typography variant="body1" sx={{marginBottom: "20px"}}>
          {genderParseString(person.gender)}
        </Typography>
        <Typography variant="subtitle1" sx={{fontSize: "25px"}}>
          Birthday
        </Typography>
        <Typography variant="body1" sx={{marginBottom: "20px"}}>
          {person.birthday}
        </Typography>
        <Typography variant="subtitle1" sx={{fontSize: "25px"}}>
          Place of Birth
        </Typography>
        <Typography variant="body1" sx={{marginBottom: "20px"}}>
          {person.place_of_birth}
        </Typography>
        <Typography variant="subtitle1" sx={{fontSize: "25px"}}>
          Also Known As
        </Typography>
        {person.also_known_as.map((n) => (
          <Typography variant="body1" key={uuidv4()} >
            {n}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};
export default PersonInfo;