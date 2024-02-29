import React from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Container,
  Divider,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import BottomNavbar from "../bottomNavBar/bottomNavBar";
import Header from "../header/header";

const RecommendationDetailPage = ({ test, testState }) => {
  const { state } = useLocation();
  let recommendation;
  if (test) {
    recommendation = testState.recommendation;
  } else {
    recommendation = state.recommendation;
  }

  // Function to truncate text if needed
  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "auto",
        width: "100%",
        paddingBottom: "60px",
      }}
    >
      <Header />
      <Container maxWidth="sm" style={{ marginTop: "75px" }}>
        <Box sx={{ minWidth: 200 }}>
          <Box sx={{ p: 2 }}>
            <Card sx={{ mb: 2 }}>
              <CardMedia
                component="img"
                data-testid="thumbnail"
                sx={{ width: "200px", margin: "auto" }}
                image={recommendation.thumbnail}
                alt={truncateText(recommendation.title, 20)}
              />
              <Box sx={{ p: 2 }}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  data-testid="title"
                >
                  {recommendation.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  data-testid="price"
                >
                  ${recommendation.extracted_price.toFixed(2)}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  data-testid="rating"
                >
                  <StarHalfIcon
                    sx={{
                      width: 18,
                      height: 18,
                    }}
                  />
                  {recommendation.rating}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  data-testid="reviews"
                >
                  <VisibilityIcon
                    sx={{
                      width: 18,
                      height: 18,
                    }}
                  />
                  {recommendation.reviews}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  data-testid="delivery"
                >
                  {recommendation.delivery}
                </Typography>
              </Box>
            </Card>

            <Card
              id="source"
              sx={{
                backgroundColor: "#f0f8ff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "40px",
                margin: "auto",
                marginBottom: "10px",
                padding: 2,
              }}
            >
              <CardActionArea
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "start",
                }}
                onClick={() =>
                  (window.location.href = recommendation.product_link)
                }
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: 60,
                    height: 60,
                    objectFit: "contain",
                  }}
                  image="https://firebasestorage.googleapis.com/v0/b/giftguru-f7599.appspot.com/o/7115371_logo_new_shopping_google_icon.png?alt=media&token=4e7b3b4b-e5de-47c0-8221-5eca19811eab"
                  alt="Buy at Google"
                />
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ flexGrow: 1, textAlign: "center" }}
                >
                  Buy at Google
                </Typography>
              </CardActionArea>
            </Card>

            <Card
              id="compare"
              sx={{
                backgroundColor: "#f0f8ff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "40px",
                margin: "auto",
                marginBottom: "10px",
                padding: 2,
              }}
            >
              <CardActionArea
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "start",
                }}
                onClick={() => (window.location.href = recommendation.link)}
              >
                <ShoppingCartIcon
                  sx={{
                    width: 40,
                    height: 40,
                    objectFit: "contain",
                    marginLeft: 1,
                    marginRight: 2,
                  }}
                />
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ flexGrow: 1, textAlign: "center" }}
                >
                  Buy at {recommendation.source}
                </Typography>
              </CardActionArea>
            </Card>

            {recommendation["number_of_comparisons"] && (
              <Card
                id="comparisions"
                sx={{
                  backgroundColor: "#f0f8ff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "40px",
                  margin: "auto",
                  marginBottom: "10px",
                  padding: 2,
                }}
              >
                <CardActionArea
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "start",
                  }}
                  onClick={() =>
                    (window.location.href = recommendation.comparison_link)
                  }
                >
                  <CompareArrowsIcon
                    sx={{
                      width: 40,
                      height: 40,
                      objectFit: "contain",
                      marginLeft: 1,
                      marginRight: 2,
                    }}
                  />
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ flexGrow: 1, textAlign: "center" }}
                  >
                    See other comparisons
                  </Typography>
                </CardActionArea>
              </Card>
            )}
          </Box>
        </Box>
      </Container>
      <BottomNavbar sx={{ position: "fixed", bottom: 0, width: "100%" }} />
    </Box>
  );
};

export default RecommendationDetailPage;
