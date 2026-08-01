'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useLanguage } from '../context/LanguageContext';
import { useRegister } from '../context/RegisterContext';

export default function Header() {
  const { lang, toggleLanguage, t } = useLanguage();
  const { openRegister } = useRegister();
  const router = useRouter();
  const pathname = usePathname();
  
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let accumulatedDiff = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;

      // Scrolled threshold
      if (currentScrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Glitch-free smooth collapse logic with direction threshold
      if (currentScrollY <= 80) {
        setVisible(true);
        accumulatedDiff = 0;
      } else if (diff > 0) {
        if (visible) {
          setVisible(false);
        }
        accumulatedDiff = 0;
      } else {
        accumulatedDiff += Math.abs(diff);
        if (!visible && accumulatedDiff > 25) {
          setVisible(true);
          accumulatedDiff = 0;
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visible]);

  const buildPath = (id) => {
    // Home (hero) page is just the language suffix at root
    if (id === 'hero') return `/${lang}`;
    // Other pages: /{id}/{lang}
    return `/${id}/${lang}`;
  };

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    const targetPath = buildPath(id);
    if (pathname === targetPath) {
      // Scroll to top instantly if already on that page
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      router.push(targetPath);
    }
  };

  const navLinks = [
    { id: 'hero', label: t.header.nav.home },
    { id: 'about', label: t.header.nav.about },
    { id: 'location', label: t.header.nav.location },
    { id: 'residences', label: t.header.nav.residences },
    { id: 'gallery', label: t.header.nav.gallery },
    { id: 'contact', label: t.header.nav.contact },
  ];

  const isActive = (id) => {
    const targetPath = buildPath(id);
    return pathname === targetPath;
  };

  return (
    <>
      {/* Floating White Capsule Header */}
      <Box
        component="header"
        sx={{
          position: 'fixed',
          top: { xs: '12px', sm: '10px' },
          left: '50%',
          transform: visible
            ? 'translateX(-50%) translateY(0)'
            : 'translateX(-50%) translateY(-140%)',
          width: { xs: '92%', sm: '90%' },
          maxWidth: '1280px',
          zIndex: 1000,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, padding 0.3s ease, box-shadow 0.3s ease',
          backgroundColor: '#FFFFFF',
          borderRadius: '100px',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          boxShadow: scrolled
            ? '0 12px 36px rgba(0, 0, 0, 0.12)'
            : '0 8px 24px rgba(0, 0, 0, 0.06)',
          px: { xs: 2.5, sm: 3, md: 4 },
          py: { xs: 1, sm: 1.2 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '48px',
            flexDirection: 'row',
          }}
        >
          {/* Logo Branding (Left Column) */}
          <Box
            onClick={() => handleNavClick('hero')}
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              transition: 'opacity 0.2s ease',
              '&:hover': { opacity: 0.85 },
            }}
          >
            <Box
              component="img"
              src="/images/park-view-full-logo.png"
              alt="PARK VIEW Logo"
              sx={{
                height: { xs: '20px', sm: '24px', md: '26px' },
                width: 'auto',
                display: 'block',
                filter: 'brightness(0) invert(0.12)',
              }}
            />
          </Box>

          {/* Desktop Navigation Links (Middle Column) */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: { md: 2.5, lg: 3.5 },
              flexDirection: 'row',
            }}
          >
            {navLinks.map((link) => {
              const active = isActive(link.id);
              return (
                <Typography
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  sx={{
                    fontFamily: '"Guise", sans-serif',
                    fontSize: '0.86rem',
                    fontWeight: active ? 600 : 500,
                    cursor: 'pointer',
                    color: active ? '#7C7368' : '#121413',
                    pb: '2px',
                    borderBottom: active ? '2px solid #7C7368' : '2px solid transparent',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      color: '#7C7368',
                    },
                  }}
                >
                  {link.label}
                </Typography>
              );
            })}
          </Box>

          {/* Actions Section (Right Column) */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 }, flexDirection: 'row' }}>
            {/* Language Switcher Button */}
            <IconButton
              onClick={toggleLanguage}
              sx={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                backgroundColor: 'rgba(61, 54, 46, 0.05)',
                color: '#3D362E',
                border: '1px solid rgba(61, 54, 46, 0.08)',
                display: { xs: 'none', sm: 'flex' },
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: '#3D362E',
                  color: '#FFFFFF',
                },
              }}
            >
              <LanguageIcon sx={{ fontSize: 16 }} />
            </IconButton>

            {/* Language Label for Screenreaders/Tooltips */}
            <Typography
              onClick={toggleLanguage}
              sx={{
                fontFamily: '"Guise", sans-serif',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#3D362E',
                cursor: 'pointer',
                display: { xs: 'none', sm: 'block' },
                transition: 'opacity 0.2s ease',
                '&:hover': { opacity: 0.8 },
              }}
            >
              {t.header.langToggle}
            </Typography>

            {/* Register Interest CTA Button */}
            <Button
              variant="contained"
              onClick={openRegister}
              sx={{
                backgroundColor: '#3D362E',
                color: '#FFFFFF',
                borderRadius: '100px',
                px: { sm: 3, md: 3.5 },
                py: 1,
                fontSize: '0.82rem',
                fontWeight: 500,
                fontFamily: '"Guise", sans-serif',
                textTransform: 'none',
                boxShadow: 'none',
                transition: 'all 0.3s ease',
                display: { xs: 'none', sm: 'block' },
                '&:hover': {
                  backgroundColor: '#1E1A16',
                  boxShadow: 'none',
                },
              }}
            >
              {t.header.contact}
            </Button>

            {/* Mobile Hamburger Icons */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 0.5 }}>
              <IconButton
                onClick={toggleLanguage}
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: '#F4F0EA',
                  color: '#121413',
                  display: { xs: 'flex', sm: 'none' },
                }}
              >
                <LanguageIcon sx={{ fontSize: 15 }} />
              </IconButton>
              <IconButton
                onClick={() => setMobileMenuOpen(true)}
                sx={{
                  color: '#121413',
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor={lang === 'ar' ? 'left' : 'right'}
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: '290px',
            backgroundColor: '#FFFFFF',
            padding: 3,
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        {/* Close Button & Brand Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 4,
            flexDirection: lang === 'ar' ? 'row-reverse' : 'row',
          }}
        >
          <Box
            component="img"
            src="/images/park-view-full-logo.png"
            alt="PARK VIEW Logo"
            sx={{
              height: '20px',
              width: 'auto',
              filter: 'brightness(0) invert(0.12)',
            }}
          />
          <IconButton onClick={() => setMobileMenuOpen(false)} sx={{ color: '#121413' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Links List */}
        <List sx={{ flexGrow: 1 }}>
          {navLinks.map((link) => {
            const active = isActive(link.id);
            return (
              <ListItem disablePadding key={link.id} sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => handleNavClick(link.id)}
                  sx={{
                    borderRadius: '12px',
                    textAlign: lang === 'ar' ? 'right' : 'left',
                    color: active ? '#7C7368' : '#121413',
                    backgroundColor: active ? 'rgba(61, 54, 46, 0.05)' : 'transparent',
                    py: 1.5,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#F4F0EA',
                      color: '#7C7368',
                    },
                  }}
                >
                  <ListItemText
                    primary={link.label}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: '0.95rem',
                        fontWeight: active ? 600 : 500,
                        fontFamily: '"Guise", sans-serif',
                        color: 'inherit',
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        {/* Drawer Footer CTA */}
        <Box sx={{ pt: 2, borderTop: '1px solid rgba(0, 0, 0, 0.06)' }}>
          <Button
            fullWidth
            variant="contained"
            onClick={openRegister}
            sx={{
              backgroundColor: '#3D362E',
              color: '#FFFFFF',
              borderRadius: '100px',
              py: 1.4,
              fontWeight: 500,
              fontFamily: '"Guise", sans-serif',
              textTransform: 'none',
              mb: 2.5,
              '&:hover': {
                backgroundColor: '#1E1A16',
              },
            }}
          >
            {lang === 'ar' ? 'سجّل اهتمامك' : 'Connect with us'}
          </Button>

          {/* Language Toggle */}
          <Button
            fullWidth
            onClick={toggleLanguage}
            startIcon={<LanguageIcon sx={{ fontSize: 14 }} />}
            sx={{
              color: '#121413',
              borderColor: 'rgba(0, 0, 0, 0.15)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderRadius: '30px',
              py: 1,
              fontSize: '0.78rem',
              fontWeight: 500,
              fontFamily: '"Guise", sans-serif',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#F4F0EA',
              },
            }}
          >
            {t.header.langToggle}
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
