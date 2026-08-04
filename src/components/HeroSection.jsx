"use client";
import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import gsap from "gsap";
import { useLanguage } from "../context/LanguageContext";
import { client, urlFor } from "../sanity/client";

export default function HeroSection() {
  const { lang, t } = useLanguage();

  const heroRef = useRef(null);
  const logoRef = useRef(null);
  const soonRef = useRef(null);
  const timerRef = useRef(null);

  const [heroData, setHeroData] = useState(null);

  // Dynamic live countdown state targeting June 30, 2027 (matching live parkview.community)
  const [timeLeft, setTimeLeft] = useState({
    days: 335,
    hours: 1,
    minutes: 40,
    seconds: 59,
  });

  useEffect(() => {
    let active = true;
    client
      .fetch(
        `*[_type == "page" && _id == "home"][0].sections[_type == "heroSection"][0] {
          ...,
          "videoUrl": backgroundVideo.asset->url
        }`
      )
      .then((data) => {
        if (active && data) {
          setHeroData(data);
        }
      })
      .catch((err) => console.warn("Error fetching hero section data:", err));
    return () => {
      active = false;
    };
  }, []);

  const countdownTarget = heroData?.countdownTarget || "2027-06-30T11:13:00+02:00";

  useEffect(() => {
    const targetDate = new Date(countdownTarget);

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
  }, [countdownTarget]);

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
  }, [heroData]);

  const formatTwoDigits = (num) => String(num).padStart(2, "0");

  const backgroundType = heroData?.backgroundType || 'image';
  const finalImageUrl = heroData?.backgroundImage 
    ? urlFor(heroData.backgroundImage).url() 
    : '/images/bg2.jpg';
  const finalVideoUrl = heroData?.videoUrl || heroData?.backgroundVideoUrl;

  const logoUrl = heroData?.logo 
    ? urlFor(heroData.logo).url() 
    : "/images/park-view-full-logo.png";

  const soonText = heroData?.soonText?.[lang] || heroData?.soonText?.en || (lang === 'ar' ? 'قريباً' : 'SOON');

  return (
    <Box
      id="hero"
      ref={heroRef}
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "50vh", sm: "85vh", md: "100vh" },
        minHeight: { xs: "500px", sm: "600px", md: "700px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: backgroundType === 'image' ? `url(${finalImageUrl})` : 'none',
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
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          zIndex: 1,
        },
      }}
    >
      {/* Background Video */}
      {backgroundType === 'video' && finalVideoUrl ? (
        <Box
          component="video"
          autoPlay
          loop
          muted
          playsInline
          src={finalVideoUrl}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />
      ) : null}

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
          mt:{xs:7.3, sm:0}
        }}
      >
        {/* Brand Logo */}
        <Box
          ref={logoRef}
          component="img"
          src={logoUrl}
          className="logo"
          alt="PARK VIEW Logo"
          sx={{
            width: { xs: "190px", sm: "300px", md: "450px" },
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
          {soonText}
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
              {lang === 'ar' ? 'أيام' : 'Days'}
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
              {lang === 'ar' ? 'ساعات' : 'Hours'}
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
              {lang === 'ar' ? 'دقائق' : 'Minutes'}
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
              {lang === 'ar' ? 'ثواني' : 'Seconds'}
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
