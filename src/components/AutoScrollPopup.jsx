'use client';
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useLanguage } from '../context/LanguageContext';
import { client } from '../sanity/client';

const fallbackPopup = {
  enabled: true,
  scrollThreshold: 1400,
  imageUrl: '/images/interiors-terrace.jpg',
  eyebrow: {
    en: 'Exclusive Invitation',
    ar: 'دعوة حصرية',
  },
  headline: {
    en: 'Own Your Sanctuary',
    ar: 'امتلك ملاذك الخاص',
  },
  description: {
    en: 'Connect with our prestige sales associates directly on WhatsApp to download pricing guides, floor layouts, and launch offers.',
    ar: 'تواصل معنا مباشرة عبر واتساب لتلقي تفاصيل المخططات، الأسعار الحالية، وعروض الإطلاق الحصرية للمشروع.',
  },
  buttonText: {
    en: 'Connect via WhatsApp',
    ar: 'تواصل عبر واتساب ↗',
  },
  whatsappNumber: '963997711226',
  whatsappMessage: {
    en: 'Hello, I would like to receive more details and launch offers for the Park View Yaafour project.',
    ar: 'مرحباً، أود الحصول على مزيد من المعلومات والتفاصيل حول مشروع بارك فيو يعفور.',
  },
};

export default function AutoScrollPopup() {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [popupData, setPopupData] = useState(fallbackPopup);

  useEffect(() => {
    let active = true;

    client
      .fetch(`*[_type == "autoScrollPopupSettings" && _id == "autoScrollPopupSettings"][0] {
        enabled,
        scrollThreshold,
        eyebrow,
        headline,
        description,
        buttonText,
        whatsappNumber,
        whatsappMessage,
        imagePath,
        "imageUrl": image.asset->url
      }`)
      .then((data) => {
        if (active && data) {
          setPopupData({ ...fallbackPopup, ...data });
        }
      })
      .catch((err) => console.warn('Error fetching auto scroll popup settings:', err));

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!popupData.enabled) return;

      if (sessionStorage.getItem('parkview_scroll_popup_shown')) return;

      if (window.scrollY > (popupData.scrollThreshold || fallbackPopup.scrollThreshold)) {
        setIsOpen(true);
        sessionStorage.setItem('parkview_scroll_popup_shown', 'true');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [popupData.enabled, popupData.scrollThreshold]);

  const handleWhatsAppRedirect = () => {
    const whatsappNumber = popupData.whatsappNumber || fallbackPopup.whatsappNumber;
    const message = popupData.whatsappMessage?.[lang] || popupData.whatsappMessage?.en || fallbackPopup.whatsappMessage.en;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  const displayEyebrow = popupData.eyebrow?.[lang] || popupData.eyebrow?.en || fallbackPopup.eyebrow.en;
  const displayHeadline = popupData.headline?.[lang] || popupData.headline?.en || fallbackPopup.headline.en;
  const displayDescription = popupData.description?.[lang] || popupData.description?.en || fallbackPopup.description.en;
  const displayButtonText = popupData.buttonText?.[lang] || popupData.buttonText?.en || fallbackPopup.buttonText.en;
  const displayImageUrl = popupData.imageUrl || popupData.imagePath || fallbackPopup.imageUrl;

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
          },
        },
      }}
      PaperProps={{
        sx: {
          maxWidth: { xs: '90%', md: '750px' },
          width: '100%',
          backgroundColor: '#FAF8F5',
          borderRadius: 0,
          border: '1px solid rgba(124, 115, 104, 0.25)',
          boxShadow: '0 30px 60px rgba(30, 26, 22, 0.15)',
          overflow: 'hidden',
          m: 2,
        },
      }}
    >
      <DialogContent sx={{ p: 0, position: 'relative' }}>
        <IconButton
          onClick={() => setIsOpen(false)}
          sx={{
            position: 'absolute',
            top: 16,
            right: lang === 'ar' ? 'auto' : 16,
            left: lang === 'ar' ? 16 : 'auto',
            color: '#FAF8F5',
            backgroundColor: 'rgba(30, 26, 22, 0.25)',
            zIndex: 10,
            '&:hover': {
              backgroundColor: 'rgba(30, 26, 22, 0.45)',
            },
          }}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: { xs: '100%', md: '45%' },
              height: { xs: '200px', md: 'auto' },
              minHeight: { md: '420px' },
              backgroundImage: `url("${displayImageUrl}")`,
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
                backgroundColor: 'rgba(30, 26, 22, 0.1)',
              },
            }}
          />

          <Box
            sx={{
              width: { xs: '100%', md: '55%' },
              p: { xs: 4, sm: 5 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: lang === 'ar' ? 'flex-end' : 'flex-start',
              textAlign: lang === 'ar' ? 'right' : 'left',
            }}
          >
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
              {displayEyebrow}
            </Typography>

            <Typography
              sx={{
                fontFamily: '"CS Brandis", serif',
                fontWeight: 300,
                fontSize: { xs: '1.6rem', sm: '1.9rem' },
                color: '#2B2825',
                lineHeight: 1.25,
                mb: 2.5,
              }}
            >
              {displayHeadline}
            </Typography>

            <Typography
              sx={{
                fontFamily: '"Silka", sans-serif',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: '#7C7368',
                mb: 4,
                fontWeight: 300,
              }}
            >
              {displayDescription}
            </Typography>

            <Button
              onClick={handleWhatsAppRedirect}
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#2B2825',
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
                  backgroundColor: '#5A7365',
                  boxShadow: 'none',
                },
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              {displayButtonText}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
