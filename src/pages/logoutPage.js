import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => navigate('/'), 2000);
  }, [navigate]);
  return (
    <>
      <span>Please </span>
      <Link to={"/"}>
        click here 
      </Link>
      <span> if you are not redirected within a few seconds</span>
    </>
  );
}

export default LogoutPage;