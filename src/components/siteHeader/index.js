import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { logout, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {

  const navigate = useNavigate();

  const [user] = useAuthState(auth);

  const menuOptions1 = [
    { label: "Discover", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Top Rated", path: "/movies/top-rated" },
  ];

  const menuOptions2 = [
    { label: "Popular People", path: "/person/popular" },
  ];

  const menuLoginOptions = [
    { label: "Log out", path: "/logout" },
    { label: "Login", path: "/login"}
  ]

  const handleMenuSelect = (pageURL) => {
    if (pageURL === "/logout") {
      logout()
    }
    navigate(pageURL, { replace: true });
  };

  const [popover1, setPopover1] = useState({
    anchorEl: null,
  })

  const [popover2, setPopover2] = useState({
    anchorEl: null,
  })

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            flexGrow: "1" 
          }}>
            <Typography variant="h4" sx={{}}>
              TMDB Client
            </Typography>
            <IconButton
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(event) => setPopover1({ ...popover1, anchorEl: event.currentTarget })} 
              color="inherit"
              sx = {{marginLeft: "10px"}}
            >
              Movies
            </IconButton>
            <IconButton
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(event) => setPopover2({ ...popover2, anchorEl: event.currentTarget })} 
              color="inherit"
              sx = {{marginLeft: "10px"}}
            >
              People
            </IconButton>
            <Popover
              id="menu2Popover"
              open={Boolean(popover1.anchorEl)}
              onClose={() => setPopover1({ ...popover1, anchorEl: null })}
              anchorEl={popover1.anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
            >
              {menuOptions1.map((opt) => (
                <MenuItem
                  key={opt.label}
                  onClick={() => handleMenuSelect(opt.path)}
                >
                  {opt.label}
                </MenuItem>
              ))}
            </Popover>
            <Popover
              id="menu4Popover"
              open={Boolean(popover2.anchorEl)}
              onClose={() => setPopover2({ ...popover2, anchorEl: null })}
              anchorEl={popover2.anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
            >
              {menuOptions2.map((opt) => (
                <MenuItem
                  key={opt.label}
                  onClick={() => handleMenuSelect(opt.path)}
                >
                  {opt.label}
                </MenuItem>
              ))}
            </Popover>
          </Box>
          {user==null?(
            <>
              <Typography variant="h6" sx={{ flexGrow: "1" }}>
                All you ever wanted to know about Movies!
              </Typography>
                <IconButton
                key={menuLoginOptions[1].label}
                color="inherit"
                onClick={() => handleMenuSelect(menuLoginOptions[1].path)}
              >
                {menuLoginOptions[1].label}
              </IconButton>
            </>
          ) : (
            <>
              <Typography variant="h6" sx={{ flexGrow: "1" }}>
                Welcome! {user.email}
              </Typography>
              <IconButton
                key={menuLoginOptions[0].label}
                color="inherit"
                onClick={() => handleMenuSelect(menuLoginOptions[0].path)}
              >
                {menuLoginOptions[0].label}
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;