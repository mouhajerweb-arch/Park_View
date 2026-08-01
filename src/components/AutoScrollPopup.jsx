'use client';
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useLanguage } from '../context/LanguageContext';

export default function AutoScrollPopup() {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if popup was already shown in this browser session
      if (sessionStorage.getItem('parkview_scroll_popup_shown')) return;

      // Scroll threshold: trigger after scrolling 1400px (roughly 2 large sections)
      if (window.scrollY > 1400) {
        setIsOpen(true);
        sessionStorage.setItem('parkview_scroll_popup_shown', 'true');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppRedirect = () => {
    const WHATSAPP_NUMBER = '963997711226';
    const message = lang === 'ar'
      ? 'مرحباً، أود الحصول على مزيد من المعلومات والتفاصيل حول مشروع بارك فيو يعفور.'
      : 'Hello, I would like to receive more details and launch offers for the Park View Yaafour project.';
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      scroll="body"
      slotProps={{
        backdrop: {
          style: {
            backgroundColor: 'rgba(30, 26, 22, 0.45)',
            backdropFilter: 'blur(10px)',
          }
        }
      }}
      PaperProps={{
        sx: {
          maxWidth: { xs: '90%', md: '750px' },
          width: '100%',
          backgroundColor: '#FAF8F5', // Theme off-white ivory card background
          borderRadius: 0, // Architectural zero border radius
          border: '1px solid rgba(124, 115, 104, 0.25)', 
          boxShadow: '0 30px 60px rgba(30, 26, 22, 0.15)',
          overflow: 'hidden',
          m: 2
        }
      }}
    >
      <DialogContent sx={{ p: 0, position: 'relative' }}>
        {/* Close Button */}
        <IconButton 
          onClick={() => setIsOpen(false)} 
          sx={{ 
            position: 'absolute', 
            top: 16, 
            right: lang === 'ar' ? 'auto' : 16, 
            left: lang === 'ar' ? 16 : 'auto',
            color: '#FAF8F5', // Visible over dark image
            backgroundColor: 'rgba(30, 26, 22, 0.25)',
            zIndex: 10,
            '&:hover': {
              backgroundColor: 'rgba(30, 26, 22, 0.45)'
            }
          }}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>

        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            width: '100%'
          }}
        >
          {/* Lifestyle Render Image */}
          <Box
            sx={{
              width: { xs: '100%', md: '45%' },
              height: { xs: '200px', md: 'auto' },
              minHeight: { md: '420px' },
              backgroundImage: 'url("/images/interiors-terrace.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(30, 26, 22, 0.1)'
              }
            }}
          />

          {/* Text Content and Action */}
          <Box
            sx={{
              width: { xs: '100%', md: '55%' },
              p: { xs: 4, sm: 5 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: lang === 'ar' ? 'flex-end' : 'flex-start',
              textAlign: lang === 'ar' ? 'right' : 'left'
            }}
          >
            {/* Tagline */}
            <Typography
              sx={{
                fontFamily: '"Guise", sans-serif',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                color: '#7C7368',
                textTransform: 'uppercase',
                mb: 1.5,
              }}
            >
              {lang === 'ar' ? 'دعوة حصرية' : 'Exclusive Invitation'}
            </Typography>

            {/* Title */}
            <Typography
              sx={{
                fontFamily: '"CS Brandis", serif',
                fontWeight: 300,
                fontSize: { xs: '1.6rem', sm: '1.9rem' },
                color: '#2B2825',
                lineHeight: 1.25,
                mb: 2.5
              }}
            >
              {lang === 'ar' ? 'امتلك ملاذك الخاص' : 'Own Your Sanctuary'}
            </Typography>

            {/* Description */}
            <Typography
              sx={{
                fontFamily: '"Silka", sans-serif',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: '#7C7368',
                mb: 4,
                fontWeight: 300
              }}
            >
              {lang === 'ar'
                ? 'تواصل معنا مباشرةً عبر واتساب لتلقي تفاصيل المخططات، الأسعار الحالية، وعروض الإطلاق الحصرية للمشروع.'
                : 'Connect with our prestige sales associates directly on WhatsApp to download pricing guides, floor layouts, and launch offers.'}
            </Typography>

            {/* WhatsApp CTA Button */}
            <Button
              onClick={handleWhatsAppRedirect}
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#2B2825', // Brand dark slate
                color: '#FFFFFF',
                fontWeight: 500,
                fontSize: '13px',
                fontFamily: '"Guise", sans-serif',
                textTransform: 'none',
                borderRadius: '50px',
                py: 1.8,
                boxShadow: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1.2,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  backgroundColor: '#5A7365', // Transitions to Sage Green
                  boxShadow: 'none',
                },
              }}
            >
              {/* WhatsApp SVG Icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              {lang === 'ar' ? 'تواصل عبر واتساب ↗' : 'Connect via WhatsApp'}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
