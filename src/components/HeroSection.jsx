"use client";
import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import gsap from "gsap";
import { useLanguage } from "../context/LanguageContext";

export default function HeroSection() {
  const { lang, t } = useLanguage();

  const heroRef = useRef(null);
  const logoRef = useRef(null);
  const soonRef = useRef(null);
  const timerRef = useRef(null);

  // Dynamic live countdown state targeting June 30, 2027 (matching live parkview.community)
  const [timeLeft, setTimeLeft] = useState({
    days: 335,
    hours: 1,
    minutes: 40,
    seconds: 59,
  });

  useEffect(() => {
    const targetDate = new Date("June 30, 2027 11:13:00 UTC+0200");

    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        logoRef.current,
        { y: 30, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 1.1, delay: 0.25 },
      )
        .fromTo(
          soonRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6",
        )
        .fromTo(
          timerRef.current ? timerRef.current.children : [],
          { y: 15, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.08 },
          "-=0.4",
        );
    }, heroRef);

    return () => ctx.revert();
  }, [t]);

  const formatTwoDigits = (num) => String(num).padStart(2, "0");

  return (
    <Box
      id="hero"
      ref={heroRef}
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "700px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url('/images/bg2.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
        color: "#FFFFFF",
        fontFamily: '"CS Brandis", serif',
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // background:
          //   'linear-gradient(180deg, rgba(12, 16, 14, 0.45) 0%, rgba(10, 14, 12, 0.2) 40%, rgba(8, 12, 10, 0.65) 100%)',
          zIndex: 1,
        },
      }}
    >
      {/* Centralized Container for Perfect Flow and Responsiveness */}
      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: { xs: 4, sm: 6 },
        }}
      >
        {/* Brand Logo placed at the top inside the container for perfect flow and responsiveness */}
        <Box
          ref={logoRef}
          component="img"
          src="/images/park-view-full-logo.png"
          className="logo"
          alt="PARK VIEW Logo"
          sx={{
            width: { xs: "260px", sm: "340px", md: "450px" },
            maxWidth: "90vw",
            mb: { xs: 2.5, sm: 0 },
            filter: "drop-shadow(0 4px 18px rgba(0, 0, 0, 0.5))",
          }}
        />

        {/* Main "soon" Header */}
        <Typography
          ref={soonRef}
          variant="h1"
          sx={{
            fontFamily: '"CS Brandis", serif',
            fontWeight: 100,
            fontSize: { xs: "36px", sm: "50px" },
            margin: "20px 0",
            lineHeight: 1.4,
            color: "#FFFFFF",
            textShadow: "0 0 10px #000",
            textTransform: "lowercase",
          }}
        >
          {lang === 'ar' ? 'قريباً' : "SOON"}
        </Typography>

        {/* Circled Large Countdown Timer */}
        <Box
          ref={timerRef}
          className="countdown circled large"
          sx={{
            display: "flex",
            flexDirection: "row",
            direction: "ltr",
            alignItems: "center",
            justifyContent: "center",
            margin: { xs: "20px auto", sm: "40px auto" },
            height: { xs: "95px", sm: "150px" },
            zIndex: 10,
          }}
        >
          {/* Days */}
          <Box
            className="time days"
            sx={{
              width: { xs: "90px", sm: "150px" },
              height: { xs: "90px", sm: "150px" },
              borderRadius: "50%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              margin: { xs: "3px", sm: "5px" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              transition: "transform 0.3s ease, background-color 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                backgroundColor: "rgba(0, 0, 0, 0.65)",
              },
            }}
          >
            <Typography
              className="value"
              sx={{
                fontFamily: '"Silka", sans-serif',
                fontWeight: 100,
                fontSize: { xs: "30px", sm: "50px" },
                color: "#FFFFFF",
                lineHeight: 1.1,
                mb: { xs: 0.2, sm: 0.5 },
              }}
            >
              {timeLeft.days}
            </Typography>
            <Typography
              className="unit"
              sx={{
                fontFamily: '"Silka", sans-serif',
                fontSize: { xs: "8px", sm: "10px" },
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#76808f",
                lineHeight: 1.2,
              }}
            >
              Days
            </Typography>
          </Box>

          {/* Hours */}
          <Box
            className="time hours"
            sx={{
              width: { xs: "90px", sm: "150px" },
              height: { xs: "90px", sm: "150px" },
              borderRadius: "50%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              margin: { xs: "3px", sm: "5px" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              transition: "transform 0.3s ease, background-color 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                backgroundColor: "rgba(0, 0, 0, 0.65)",
              },
            }}
          >
            <Typography
              className="value"
              sx={{
                fontFamily: '"Silka", sans-serif',
                fontWeight: 100,
                fontSize: { xs: "30px", sm: "50px" },
                color: "#FFFFFF",
                lineHeight: 1.1,
                mb: { xs: 0.2, sm: 0.5 },
              }}
            >
              {formatTwoDigits(timeLeft.hours)}
            </Typography>
            <Typography
              className="unit"
              sx={{
                fontFamily: '"Silka", sans-serif',
                fontSize: { xs: "8px", sm: "10px" },
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#76808f",
                lineHeight: 1.2,
              }}
            >
              Hours
            </Typography>
          </Box>

          {/* Minutes */}
          <Box
            className="time minutes"
            sx={{
              width: { xs: "90px", sm: "150px" },
              height: { xs: "90px", sm: "150px" },
              borderRadius: "50%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              margin: { xs: "3px", sm: "5px" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              transition: "transform 0.3s ease, background-color 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                backgroundColor: "rgba(0, 0, 0, 0.65)",
              },
            }}
          >
            <Typography
              className="value"
              sx={{
                fontFamily: '"Silka", sans-serif',
                fontWeight: 100,
                fontSize: { xs: "30px", sm: "50px" },
                color: "#FFFFFF",
                lineHeight: 1.1,
                mb: { xs: 0.2, sm: 0.5 },
              }}
            >
              {formatTwoDigits(timeLeft.minutes)}
            </Typography>
            <Typography
              className="unit"
              sx={{
                fontFamily: '"Silka", sans-serif',
                fontSize: { xs: "8px", sm: "10px" },
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#76808f",
                lineHeight: 1.2,
              }}
            >
              Minutes
            </Typography>
          </Box>

          {/* Seconds */}
          <Box
            className="time seconds"
            sx={{
              width: { xs: "90px", sm: "150px" },
              height: { xs: "90px", sm: "150px" },
              borderRadius: "50%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              margin: { xs: "3px", sm: "5px" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              transition: "transform 0.3s ease, background-color 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                backgroundColor: "rgba(0, 0, 0, 0.65)",
              },
            }}
          >
            <Typography
              className="value"
              sx={{
                fontFamily: '"Silka", sans-serif',
                fontWeight: 100,
                fontSize: { xs: "30px", sm: "50px" },
                color: "#FFFFFF",
                lineHeight: 1.1,
                mb: { xs: 0.2, sm: 0.5 },
              }}
            >
              {formatTwoDigits(timeLeft.seconds)}
            </Typography>
            <Typography
              className="unit"
              sx={{
                fontFamily: '"Silka", sans-serif',
                fontSize: { xs: "8px", sm: "10px" },
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#76808f",
                lineHeight: 1.2,
              }}
            >
              Seconds
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* Bottom Right Brand Badge */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: 16, sm: 20 },
          right: { xs: 16, sm: 24 },
          width: 32,
          height: 32,
          borderRadius: "6px",
          backgroundColor: "rgba(0, 0, 0, 0.65)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="3" fill="#FFFFFF" opacity="0.9" />
          <circle cx="6" cy="6" r="1.5" fill="#FFFFFF" opacity="0.6" />
          <circle cx="18" cy="6" r="1.5" fill="#FFFFFF" opacity="0.6" />
          <circle cx="6" cy="18" r="1.5" fill="#FFFFFF" opacity="0.6" />
          <circle cx="18" cy="18" r="1.5" fill="#FFFFFF" opacity="0.6" />
        </svg>
      </Box>
    </Box>
  );
}
