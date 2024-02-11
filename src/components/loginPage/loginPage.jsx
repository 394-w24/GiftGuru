import { useRef, useState, useEffect, Suspense } from "react";
import Gift from "./gift";
import { Canvas } from "@react-three/fiber";
import { Environment, CameraShake } from "@react-three/drei";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./loginPage.less";

const LoginPage = () => {
  const loginRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrollToLogin = () => {
    loginRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => e.preventDefault();
  const fillInTestAccount = () => {
    setEmail("test@example.com");
    setPassword("testpassword");
  };

  useEffect(() => {
    const handleScroll = () => {
      const bg = document.querySelector(".bg");
      if (bg) {
        const scrollY = window.scrollY;
        const parallaxShift = scrollY * 0.3;
        bg.style.transform = `translateY(-${parallaxShift}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="splash">
        <div className="one">
          <div></div>
        </div>
        <div className="two">
          <h2 className="splash-title">
            <span>
              GIFT&nbsp;&nbsp;&nbsp;
              <br />
              &nbsp;&nbsp;&nbsp;GURU
            </span>
          </h2>
        </div>
        <div className="three">
          <Canvas
            className="canvas"
            onClick={scrollToLogin}
            dpr={[1, 2]}
            camera={{ fov: 75, position: [-10, 8, 15] }}
          >
            <Suspense fallback={null}>
              <ambientLight />
              <Gift
                position={[0, 5, 0]}
                isHovered={isHovered}
                onHover={setIsHovered}
              />
              <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr" />
              {!isHovered && (
                <CameraShake
                  maxPitch={0.15}
                  maxRoll={0.1}
                  maxYaw={0.1}
                  pitchFrequency={0.8}
                  rollFrequency={0.8}
                  yawFrequency={0.8}
                />
              )}
            </Suspense>
          </Canvas>
          <div className="click-me" style={{ opacity: isHovered ? 1 : 0 }}>
            <span>CLICK</span>
            <span>&nbsp;&nbsp;ME!</span>
          </div>
        </div>
      </div>
      <div className="temp"></div>
      <div className="login" ref={loginRef}>
        <img
          className="bg"
          src="https://raw.githubusercontent.com/Hongda-OSU/PicGo-2.3.1/master/imgDRIP_20.png"
        />
        <div className="glass">
          <div className="title">
            <img
              className="icon"
              src="https://raw.githubusercontent.com/Hongda-OSU/PicGo-2.3.1/master/imgAvatar-UI-Unicorn-V2.svg"
            />
            <span>GiftGuru:</span>
          </div>
          <div className="slogan">
            <span>
              AI-Powered Gifting Made Personal
              <span className="wave">&nbsp;💖</span>
            </span>
          </div>
          <div className="login-container">
            <div className="email-container">
              <FormControl className="email-form">
                <OutlinedInput
                  className="email-input"
                  type={"text"}
                  value={email}
                  placeholder={"Email or phone number"}
                  sx={{
                    "& fieldset": { border: "none" },
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <AccountCircleIcon sx={{ color: "#2485ff" }} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="password-container">
              <FormControl className="password-form">
                <OutlinedInput
                  className="password-input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder={"Enter Password"}
                  sx={{
                    "& fieldset": { border: "none" },
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff sx={{ color: "#d32f2f" }} />
                        ) : (
                          <Visibility sx={{ color: "#2485ff" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
