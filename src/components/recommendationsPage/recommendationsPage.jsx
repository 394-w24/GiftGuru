import React from "react";
import BottomNavbar from "../bottomNavBar/bottomNavBar";
import Header from "../header/header";
import {
    Container,
    FormControl,
    Box,
    Typography,
  } from "@mui/material";
import { useLocation } from "react-router-dom";
import RecommendationCard from "./RecommendationCard";
import Grid from '@mui/system/Unstable_Grid';
const RecommendationsPage = () => {
    const location = useLocation();
    const rec = location.state ? location.state.recommendation : ""; 
    const pairs = []
    for(var i = 1; i < rec.length; i+=2){
        const curProd = rec[i].split(',')[0];
        const curDesc = rec[i+1].split('\n')[0]; 
        pairs.push([curProd, curDesc]); 
    }
    return (
        <Box
            sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "80vh",
            width: "100%",
            paddingBottom: "60px",
          }}>
        
            <Header/>
            <div>
                <Container
                    maxWidth="sm"
                    style={{ marginTop: "70px", marginBottom: "70px" }}>

                    <Typography variant="body2" gutterBottom >
                        Recommendations Page
                    </Typography>
            
                    <BottomNavbar style={{ position: "fixed", bottom: 0, width: "100%" }} />
                </Container>
            </div>
            <Grid container spacing={4} columns={18}>
            {pairs.map(pair => {
                return (
                    <RecommendationCard pair={pair}/> 
                );
            })}
            </Grid>
        </Box>
    )
}

export default RecommendationsPage;