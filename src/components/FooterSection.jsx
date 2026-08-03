'use client';
import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid2 as Grid } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useLanguage } from '../context/LanguageContext';
import { client } from '../sanity/client';

const getSocialIcon = (platform) => {
  switch (platform) {
    case 'facebook':
      return <FacebookIcon sx={{ fontSize: 16 }} />;
    case 'twitter':
      return <TwitterIcon sx={{ fontSize: 16 }} />;
    case 'instagram':
      return <InstagramIcon sx={{ fontSize: 16 }} />;
    case 'whatsapp':
      return <WhatsAppIcon sx={{ fontSize: 16 }} />;
    default:
      return null;
  }
};

export default function FooterSection() {
  const { lang } = useLanguage();
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    let active = true;
    client
      .fetch(`*[_type == "footerSettings" && _id == "footerSettings"][0]`)
      .then((data) => {
        if (active && data) {
          setFooterData(data);
        }
      })
      .catch((err) => console.warn('Error fetching footer settings:', err));
    return () => {
      active = false;
    };
  }, []);

  // Column 1
  const col1Title = footerData?.col1Title?.[lang] || footerData?.col1Title?.en || (
    lang === 'ar' ? 'معيار جديد للمعيشة' : 'A New Standard of Living'
  );
  const col1Text = footerData?.col1Text?.[lang] || footerData?.col1Text?.en || (
    lang === 'ar'
      ? 'مجمع سكني معاصر يوفر مزيجاً تحديداً بين الطبيعة الخلابة ووسائل الراحة الحديثة لحياة عائلية متكاملة.'
      : 'A modern residential retreat combining breathtaking landscape gardens and premium comforts for balanced living.'
  );
  const socialLinks = footerData?.socialLinks || [
    { platform: 'facebook', url: '#' },
    { platform: 'twitter', url: '#' },
    { platform: 'instagram', url: '#' },
    { platform: 'whatsapp', url: 'https://wa.me/963997711226' }
  ];

  // Column 2
  const col2Title = footerData?.col2Title?.[lang] || footerData?.col2Title?.en || (
    lang === 'ar' ? 'العنوان' : 'The Address'
  );
  const col2Text = footerData?.col2Text?.[lang] || footerData?.col2Text?.en || (
    lang === 'ar'
      ? `وجهة سكنية بارزة في وادي يعفور. عنوان مخصص للنخبة، موقع متميز في يعفور خلف البيت السويسري مباشرة • ١٥ دقيقة إلى وسط دمشق * وصول مباشر إلى طريق دمشق - بيروت * متصل بأوتوستراد الديماس`
      : `A landmark residential destination in Yaafour Valley. An Address Reserved for the Few Prime location in Yaafour Directly behind the Swiss House • 15 minutes to central Damascus * Direct access to Damascus–Beirut Road * Connected to Dimas Highway`
  );

  // Column 3
  const col3Title = footerData?.col3Title?.[lang] || footerData?.col3Title?.en || (
    lang === 'ar' ? 'اتصل بنا' : 'Contact Us'
  );
  const displayPhone = footerData?.phone || '+963 11 4068';
  const displayEmail = footerData?.email || 'info@parkview.community';
  const displayAddress = footerData?.address?.[lang] || footerData?.address?.en || (
    lang === 'ar'
      ? 'يعفور، دمشق، سوريا - خلف البيت السويسري'
      : 'Yaafour, Damascus, Syria - Behind Swiss House'
  );

  // Bottom
  const copyrightText = footerData?.copyrightText?.[lang] || footerData?.copyrightText?.en || (
    lang === 'ar' ? 'بارك فيو يعفور. جميع الحقوق محفوظة.' : 'Park View Yaafour. All rights reserved.'
  );

  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: '#F6F2EC', // Clean light stone beige matching rest of the website theme (no dark backgrounds)
        color: '#2B2825', 
        pt: { xs: 8, md: 10 }, 
        pb: 5,
        borderTop: '1px solid rgba(43, 40, 37, 0.08)',
        overflow: 'hidden'
      }}
    >
      {/* 3-Column Detailed Information Links Grid */}
      <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 6, md: 10, lg: 12 }, mb: 6 }}>
        <Grid container spacing={{ xs: 6, md: 8 }} sx={{ borderBottom: '1px solid rgba(43, 40, 37, 0.08)', pb: 6 }}>
          {/* Column 1: Heading & Description */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box 
              sx={{ 
                width: 60, 
                height: 3, 
                backgroundColor: '#2B2825', 
                mb: 2.5,
                ml: lang === 'ar' ? 'auto' : 0,
                mr: lang === 'ar' ? 0 : 'auto',
              }} 
            />
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"CS Brandis", serif',
                fontWeight: 400,
                fontSize: '1.5rem',
                lineHeight: 1.3,
                color: '#2B2825',
                mb: 2.5,
                textAlign: lang === 'ar' ? 'right' : 'left',
              }}
            >
              {col1Title}
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Silka", sans-serif',
                fontSize: '0.88rem',
                lineHeight: 1.7,
                color: '#7C7368',
                fontWeight: 300,
                mb: 3,
                textAlign: lang === 'ar' ? 'right' : 'left',
              }}
            >
              {col1Text}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1.5, justifyContent: lang === 'ar' ? 'flex-end' : 'flex-start' }}>
              {socialLinks.map((social, idx) => (
                <Box
                  key={idx}
                  component="a"
                  href={social.url}
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    border: '1px solid rgba(43, 40, 37, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#7C7368',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      backgroundColor: '#2B2825',
                      borderColor: '#2B2825',
                      color: '#FAF7F3'
                    }
                  }}
                >
                  {getSocialIcon(social.platform)}
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Column 2: The Address Detail */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Silka", sans-serif',
                fontWeight: 600,
                fontSize: '0.92rem',
                letterSpacing: '0.1em',
                color: '#2B2825',
                textTransform: 'uppercase',
                mb: 2.5,
                textAlign: lang === 'ar' ? 'right' : 'left',
              }}
            >
              {col2Title}
            </Typography>
            <Typography
              sx={{
                fontFamily: '"Silka", sans-serif',
                fontSize: '0.88rem',
                lineHeight: 1.8,
                color: '#6B6661',
                fontWeight: 300,
                whiteSpace: 'pre-line',
                textAlign: lang === 'ar' ? 'right' : 'left',
              }}
            >
              {col2Text}
            </Typography>
          </Grid>

          {/* Column 3: Contact Details */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Silka", sans-serif',
                fontWeight: 600,
                fontSize: '0.92rem',
                letterSpacing: '0.1em',
                color: '#2B2825',
                textTransform: 'uppercase',
                mb: 2.5,
                textAlign: lang === 'ar' ? 'right' : 'left',
              }}
            >
              {col3Title}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>
              {/* Phone detail */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexDirection: 'row' }}>
                <PhoneIcon sx={{ fontSize: 16, color: '#7C7368' }} />
                <Typography sx={{ fontFamily: '"Silka", sans-serif', fontSize: '0.88rem', color: '#6B6661', fontWeight: 300, dir: 'ltr' }}>
                  {displayPhone}
                </Typography>
              </Box>

              {/* Email detail */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexDirection: 'row' }}>
                <EmailIcon sx={{ fontSize: 16, color: '#7C7368' }} />
                <Typography sx={{ fontFamily: '"Silka", sans-serif', fontSize: '0.88rem', color: '#6B6661', fontWeight: 300 }}>
                  {displayEmail}
                </Typography>
              </Box>

              {/* Address detail */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, flexDirection: 'row' }}>
                <LocationOnIcon sx={{ fontSize: 16, color: '#7C7368', mt: 0.2 }} />
                <Typography sx={{ fontFamily: '"Silka", sans-serif', fontSize: '0.88rem', color: '#6B6661', fontWeight: 300, textAlign: lang === 'ar' ? 'right' : 'left' }}>
                  {displayAddress}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Copyright Footer Credits */}
      <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 6, md: 10, lg: 12 } }}>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography sx={{ fontFamily: '"Silka", sans-serif', fontSize: '0.78rem', color: 'rgba(43, 40, 37, 0.6)' }}>
            &copy; {new Date().getFullYear()} {copyrightText}
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, flexDirection: 'row' }}>
            <Typography component="a" href="#" sx={{ fontFamily: '"Silka", sans-serif', fontSize: '0.78rem', color: 'rgba(43, 40, 37, 0.6)', textDecoration: 'none', '&:hover': { color: '#2B2825' } }}>
              {lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Typography>
            <Typography component="a" href="#" sx={{ fontFamily: '"Silka", sans-serif', fontSize: '0.78rem', color: 'rgba(43, 40, 37, 0.6)', textDecoration: 'none', '&:hover': { color: '#2B2825' } }}>
              {lang === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
