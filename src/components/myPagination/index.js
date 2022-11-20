import React from "react";
import Pagination from '@mui/material/Pagination';

const MyPagination = ({page, setPage, totalPages}) => {
  const handleChange = (e, p) => {
    setPage(p)
  }

  return(
    <div style={{    
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",}}
    >
      <div style={{
        position: "fixed",
        bottom: 0,
        zIndex: 200,
        background: "green",
        padding: "10px 80px",
        color: "white",
        width: "100%",
      }}>
        <Pagination 
        style={{
          display: "flex",
          justifyContent: "center",
        }} 
        variant='outlined' 
        page={page}
        onChange={handleChange}
        count={totalPages}
        />
      </div>
    </div>
  );
}


export default MyPagination