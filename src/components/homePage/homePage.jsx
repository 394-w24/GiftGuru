import React, { useState, useEffect } from "react";
import fs from "fs";
import "./homePage.css";
import {
  Slider,
  Stack,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Divider,
  Card,
} from "@mui/material";

import DropzoneAreaExample from "../dropZone/dropZone";
import BottomNavbar from "../bottomNavBar/bottomNavBar";
import Header from "../header/header";
import { useNavigate, useLocation } from "react-router-dom";
//import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiAPIKey = import.meta.env.VITE_GEMINI_API_KEY || "";
/*
const openai = new OpenAI({
  apiKey: openaiApiKey,
  dangerouslyAllowBrowser: true,
  organization: "org-y9B1VFvuzhsYHcpG3KJWqvKR",
});*/
const gemini = new GoogleGenerativeAI(geminiAPIKey);
//maybe pro to input both img for gift and text prompt?
const geminiModel = gemini.getGenerativeModel({model: "gemini-pro-vision"}); 

function fileToGenerativePart(content, mimeType) {
  return {
    inlineData: {
      data: content,
      mimeType
    },
  };
}
const readFileAsBase64 = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  });
};


const getGeminiRequests = async (
  sliderValue,
  ageValue,
  relationshipValue,
  genderValue,
  moreInfo,
  images
) => {
  /*const message = `Analyze styles and preferences to suggest the perfect, stress-free gift 
                  based on the following information about the person receiving this gift:
                  Budget Range: ${sliderValue}, Age Range: ${ageValue}, Who am I giving it to: ${relationshipValue}, Gender: ${genderValue}, Details: ${moreInfo}, 
                  give me 3 products with names and a short description for each product in 50 words using this following format: 
                  Recommended Product1: name of Product1\n
                  Recommended Product2: name of Product2\n
                  Recommended Product3: name of Product3.\n Also, use the uploaded images, if any is provided with text-based input, for choosing most suitable gifts for recommendation that is similar to the images' vibes!`;*/
  const message = `Can you give me set of product tags that relates to inputted images?`
  //convert image files into format acceptable by gemini! 
  const convImages = await Promise.all(
      images.map(async img => {
        const curFileContent = await readFileAsBase64(img);
        return fileToGenerativePart(curFileContent, img.type);
      })
  );
  //call to gemini! 
  const res= await geminiModel.generateContent([message, ...convImages]);
  const response = await res.response; 
  //need to convert final response as a stringified version1 
  const txt = response.text(); 
  const products = txt.split(":");
  console.log(`products: \n`)
  console.log(products); 
  return products; 
};

const HomePage = ({}) => {
  const navigate = useNavigate();
  //state keeping track of uploaded images describing gift so far! 
  const [images, setImages] = React.useState([]);
  const handleImagesChange = (newFiles) => {
    setImages((prevFiles) => [...prevFiles, ...newFiles]); 
  }; 
  const [sliderValue, setSliderValue] = React.useState([20, 40]);
  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  const [ageValue, setAgeValue] = React.useState("");
  const handleAgeChange = (event) => {
    setAgeValue(event.target.value);
  };

  const [relationshipValue, setRelationshipValue] = React.useState("");
  const handleRelationshipChange = (event) => {
    setRelationshipValue(event.target.value);
  };

  const [genderValue, setGenderValue] = useState("");
  const handleGenderChange = (event) => {
    setGenderValue(event.target.value);
  };

  const [moreInfo, setMoreInfo] = useState("");

  const [recommendation, setRecommendation] = useState("");
  console.log(`recommendation: ${recommendation}`)
  const [loading, setLoading] = useState(false);
  const handleGeneratePlan = async () => {
    setLoading(true);
    const response = await getGeminiRequests(
      sliderValue,
      ageValue,
      relationshipValue,
      genderValue,
      moreInfo,
      images
    );
    //const rec = response.choices[0].message.content
    setRecommendation(response);
    console.log(`response in handleGeneratePlan: \n`)
    console.log(response); 
    setLoading(false);
    setIsPlanGenerated(true);
    //change to recommendations page and pass on the gpt returned resp to use for rendering 
    //product recs! 
    navigate("/recommendations", {state: {recommendation: response}}); 
  };
  const [isPlanGenerated, setIsPlanGenerated] = useState(false);
  const Loader = () => {
    const [text, setText] = useState("");
    useEffect(() => {
      const interval = setInterval(() => {
        setText((prevText) => {
          if (prevText.length === 3) {
            return "";
          }
          return prevText + ".";
        });
      }, 300);
      return () => clearInterval(interval);
    }, []);
    return <h4>Recommendation is loading, please wait{text}</h4>;
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
      <div>
        <Container
          maxWidth="sm"
          style={{ marginTop: "65px", marginBottom: "75px" }}
        >
          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth sx={{ my: 2 }}>
              <DropzoneAreaExample handleImagesChange={handleImagesChange}></DropzoneAreaExample>
            </FormControl>

            <FormControl fullWidth>
              <Typography variant="body2" gutterBottom>
                OPTIONAL INPUTS
              </Typography>
            </FormControl>

            <Divider sx={{ my: 1 }} />

            <FormControl fullWidth sx={{ mb: 1 }}>
              <Typography variant="body2" gutterBottom>
                Recipient gender
              </Typography>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="demo-simple-select-label">
                Select gender
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={genderValue}
                label="Gender"
                onChange={handleGenderChange}
              >
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 1 }}>
              <Typography variant="body2" gutterBottom>
                Recipient age range
              </Typography>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="age-range-select-label">
                Select age range
              </InputLabel>
              <Select
                labelId="age-range-select-label"
                id="age-range-select"
                value={ageValue}
                label="Age Range"
                onChange={handleAgeChange}
              >
                <MenuItem value={"under 18"}>Under 18</MenuItem>
                <MenuItem value={"18-24"}>18~24</MenuItem>
                <MenuItem value={"25-30"}>25~30</MenuItem>
                <MenuItem value={"31-40"}>31~40</MenuItem>
                <MenuItem value={"41-50"}>41~50</MenuItem>
                <MenuItem value={"51-60"}>51~60</MenuItem>
                <MenuItem value={">60"}>Over 60</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 1 }}>
              <Typography variant="body2" gutterBottom>
                Relationship with recipient
              </Typography>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="demo-simple-select-label">
                Select relationship
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={relationshipValue}
                label="Relationship"
                onChange={handleRelationshipChange}
              >
                <MenuItem value={"father"}>Father</MenuItem>
                <MenuItem value={"mother"}>Mother</MenuItem>
                <MenuItem value={"brother"}>Brother</MenuItem>
                <MenuItem value={"sister"}>Sister</MenuItem>
                <MenuItem value={"spouse"}>Spouse</MenuItem>
                <MenuItem value={"friend"}>Friend</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <Typography variant="body2" gutterBottom>
                Price range
              </Typography>
            </FormControl>

            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 2 }}
              alignItems="center"
            >
              <p>$0</p>
              <Slider
                value={sliderValue}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                min={0}
                max={1000}
                sx={{
                  "& .MuiSlider-thumb": {
                    color: "#007580",
                  },
                  "& .MuiSlider-track": {
                    color: "#007580",
                  },
                  "& .MuiSlider-rail": {
                    color: "#007580",
                  },
                }}
              />
              <p>$1000</p>
            </Stack>

            <FormControl fullWidth sx={{ mb: 1 }}>
              <Typography variant="body2" gutterBottom>
                Any other information
              </Typography>
            </FormControl>

            <FormControl fullWidth sx={{ textAlign: "center", mb: 4 }}>
              <InputLabel
                id="demo-simple-select-label"
                sx={{ textAlign: "center" }}
              ></InputLabel>
              <TextField
                id="outlined-multiline-flexible"
                label="Enter Additional Information"
                multiline
                minRows={1}
                maxRows={5}
                variant="outlined"
                value={moreInfo}
                onChange={(event) => setMoreInfo(event.target.value)}
                placeholder="Enter Additional Information"
                sx={{
                  width: "100%",
                  margin: "0 auto",
                }}
              />
            </FormControl>

            <FormControl
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Button
                variant="contained"
                onClick={handleGeneratePlan}
                sx={{
                  borderRadius: 50,
                  width: "100%",
                  background: "linear-gradient(45deg, #00b859, #007580)",
                  "&:hover": {
                    transform: "scale(1.02)",
                    filter: "brightness(1.1)",
                  },
                }}
              >
                {isPlanGenerated
                  ? "Want a different one"
                  : "Get Recommendations"}
              </Button>
            </FormControl>

            {loading && <Loader sx={{ mb: 2 }} />}

            {recommendation && (
              <Box sx={{ minWidth: 200, mb: 2 }}>
                <Card>
                  <div>{recommendation}</div>
                </Card>
              </Box>
            )}
          </Box>
        </Container>
      </div>
      <BottomNavbar style={{ position: "fixed", bottom: 0, width: "100%" }} />
    </Box>
  );
};

export default HomePage;