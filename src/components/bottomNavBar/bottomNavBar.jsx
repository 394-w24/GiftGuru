import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import RedeemIcon from "@mui/icons-material/Redeem";
import PeopleIcon from "@mui/icons-material/People";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomeSelected = location.pathname === "/home";
  const isRecipientSelected = location.pathname === "/recipients";
  const isProfileSelected = location.pathname === "/profile";

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "50px",
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        boxShadow: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <IconButton
        sx={{
          width: "50px",
          height: "50px",
          color: isHomeSelected ? "#007580" : "	#666666",
          "&:hover .MuiSvgIcon-root, &:hover .MuiTypography-root": {
            color: "#007580",
          },
        }}
        onClick={() => navigate("/home", { state: {...location.state, }, })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isHomeSelected ? (
            <ContentPasteSearchIcon sx={{ width: "30px", height: "30px" }} />
          ) : (
            <SearchIcon sx={{ width: "30px", height: "30px" }} />
          )}
        </Box>
      </IconButton>

      <IconButton
        sx={{
          width: "50px",
          height: "50px",
          color: isRecipientSelected ? "#007580" : "#666666",
          "&:hover .MuiSvgIcon-root, &:hover .MuiTypography-root": {
            color: "#007580",
          },
        }}
        onClick={() => navigate("/recipients", { state: {...location.state, }, })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isRecipientSelected ? (
            <RedeemIcon sx={{ width: "30px", height: "30px" }} />
          ) : (
            <PeopleIcon sx={{ width: "30px", height: "30px" }} />
          )}
        </Box>
      </IconButton>

      <IconButton
        sx={{
          width: "50px",
          height: "50px",
          color: isProfileSelected ? "#007580" : "#666666",
          "&:hover .MuiSvgIcon-root, &:hover .MuiTypography-root": {
            color: "#007580",
          },
        }}
        onClick={() => navigate("/profile", { state: {...location.state, }, })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isProfileSelected ? (
            <EmojiPeopleIcon sx={{ width: "30px", height: "30px" }} />
          ) : (
            <ManageAccountsIcon sx={{ width: "30px", height: "30px" }} />
          )}
        </Box>
      </IconButton>
    </Box>
  );
};

export default BottomNavbar;
