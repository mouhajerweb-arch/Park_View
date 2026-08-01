'use client';
import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Grid2 as Grid } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useLanguage } from '../context/LanguageContext';

export default function ContactFormSection() {
  const { lang } = useLanguage();
  const [phone, setPhone] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    remarks: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (newPhone) => {
    setPhone(newPhone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const WHATSAPP_NUMBER = '963997711226';

    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    const email = form.email.trim();
    const remarks = form.remarks.trim();

    if (!firstName || !lastName || !email || !phone) {
      alert(
        lang === 'ar'
          ? 'يرجى ملء جميع الحقول المطلوبة (الاسم، البريد الإلكتروني، رقم الهاتف)'
          : 'Please fill in all required fields (Name, Email, Phone Number)'
      );
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert(
        lang === 'ar'
          ? 'يرجى إدخال عنوان بريد إلكتروني صالح'
          : 'Please enter a valid email address'
      );
      return;
    }

    let message = '🏢 *New Enquiry - Park View Yaafour* 🏢\n\n';
    message += `*Name:* ${firstName} ${lastName}\n`;
    message += `*Email:* ${email}\n`;
    message += `*Phone:* ${phone}\n`;
    if (remarks) {
      message += `*Remarks:* ${remarks}\n`;
    }
    message += '\n_Request sent from the website contact section_';

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Box
      id="contact-form-section"
      className="brochure-section"
      sx={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#FAF7F3', // Premium off-white card canvas matching theme
        py: { xs: 8, md: 12 },
        px: { xs: 3, sm: 6, md: 10, lg: 12 },
        borderBottom: '1px solid rgba(61, 54, 46, 0.05)',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="xl" sx={{ pr: { md: 8 } }}>
        <Grid
          container
          spacing={{ xs: 6, md: 10 }}
        >
          {/* Left Column: Contact details & Colorful Map */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: lang === 'ar' ? 'flex-end' : 'flex-start',
                textAlign: lang === 'ar' ? 'right' : 'left',
                width: '100%',
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Guise", sans-serif',
                  fontSize: { xs: '11px', sm: '13px' },
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  color: '#7C7368',
                  textTransform: 'uppercase',
                  mb: 1.5,
                  width: '100%',
                  textAlign: lang === 'ar' ? 'right' : 'left',
                }}
              >
                {lang === 'ar' ? 'اتصل بنا' : 'Get in Touch'}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"CS Brandis", serif',
                  fontWeight: 300,
                  fontSize: { xs: '2rem', sm: '2.4rem', md: '2.8rem' },
                  lineHeight: 1.15,
                  color: '#2B2825',
                  letterSpacing: '-0.01em',
                  mb: 5,
                  width: '100%',
                  textAlign: lang === 'ar' ? 'right' : 'left',
                }}
              >
                {lang === 'ar'
                  ? 'جاهزون للتواصل عندما تكون مستعداً'
                  : "We're Ready to Connect When You Are"}
              </Typography>

              {/* Contact Icons Row */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5, width: '100%', mb: 6 }}>
                {/* Phone */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, flexDirection: 'row' }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(90, 115, 101, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <PhoneIcon sx={{ fontSize: 18, color: '#5A7365' }} />
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: '"Silka", sans-serif',
                      fontSize: '0.94rem',
                      color: '#2B2825',
                      fontWeight: 400,
                      dir: 'ltr',
                    }}
                  >
                    +963 997 711 226
                  </Typography>
                </Box>

                {/* Email */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, flexDirection: 'row' }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(90, 115, 101, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <EmailIcon sx={{ fontSize: 18, color: '#5A7365' }} />
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: '"Silka", sans-serif',
                      fontSize: '0.94rem',
                      color: '#2B2825',
                      fontWeight: 400,
                    }}
                  >
                    sales@parkviewyaafour.com
                  </Typography>
                </Box>

                {/* Address */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, flexDirection: 'row' }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(90, 115, 101, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <LocationOnIcon sx={{ fontSize: 18, color: '#5A7365' }} />
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: '"Silka", sans-serif',
                      fontSize: '0.94rem',
                      color: '#2B2825',
                      fontWeight: 400,
                      textAlign: lang === 'ar' ? 'right' : 'left',
                    }}
                  >
                    {lang === 'ar'
                      ? 'يعفور، دمشق، سوريا - خلف البيت السويسري مباشرةً'
                      : 'Yaafour, Damascus, Syria - Directly behind Swiss House'}
                  </Typography>
                </Box>
              </Box>

              {/* Colorful Google Maps Location map (No grayscale filters applied) */}
              <Box
                sx={{
                  width: '100%',
                  height: '280px',
                  borderRadius: 0,
                  overflow: 'hidden',
                  border: '1px solid rgba(61, 54, 46, 0.08)',
                  boxShadow: '0 8px 24px rgba(61, 54, 46, 0.04)',
                }}
              >
                <iframe
                  title="Park View Location Map"
                  src="https://maps.google.com/maps?q=33.5277034,36.1118096&z=15&output=embed"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                  }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </Box>
            </Box>
          </Grid>

          {/* Right Column: Register Form Block */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: lang === 'ar' ? 'flex-end' : 'flex-start',
                width: '100%',
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Guise", sans-serif',
                  fontSize: { xs: '11px', sm: '13px' },
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  color: '#7C7368',
                  textTransform: 'uppercase',
                  mb: 1.5,
                  width: '100%',
                  textAlign: lang === 'ar' ? 'right' : 'left',
                }}
              >
                {lang === 'ar' ? 'التسجيل الحصري' : 'Register Interest'}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"CS Brandis", serif',
                  fontWeight: 300,
                  fontSize: { xs: '2rem', sm: '2.4rem', md: '2.8rem' },
                  lineHeight: 1.15,
                  color: '#2B2825',
                  letterSpacing: '-0.01em',
                  mb: 5,
                  width: '100%',
                  textAlign: lang === 'ar' ? 'right' : 'left',
                }}
              >
                {lang === 'ar'
                  ? 'استفسر اليوم واحصل على عروض الإطلاق'
                  : 'Unlock Launch Offers'}
              </Typography>

              {/* Form Input fields with dynamic dir attribute targeting Arabic RTL text flow */}
              <Box
                component="form"
                onSubmit={handleSubmit}
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                }}
              >
                {/* First Name & Last Name */}
                <Grid container spacing={3.5}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      name="firstName"
                      label={lang === 'ar' ? 'الاسم الأول' : 'First Name'}
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      fullWidth
                      variant="outlined"
                      dir={lang === 'ar' ? 'rtl' : 'ltr'}
                      slotProps={{
                        htmlInput: {
                          style: {
                            fontFamily: '"Silka", sans-serif',
                            fontSize: '14.5px',
                            color: '#2B2825',
                            padding: '16.5px 18px',
                            textAlign: lang === 'ar' ? 'right' : 'left',
                          },
                        },
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '50px',
                          backgroundColor: '#FFFFFF',
                          '& fieldset': { borderColor: 'rgba(61, 54, 46, 0.12)' },
                          '&:hover fieldset': { borderColor: '#7C7368' },
                          '&.Mui-focused fieldset': { borderColor: '#5A7365', borderWidth: '1.5px' },
                        },
                        '& .MuiInputLabel-root': {
                          fontFamily: '"Silka", sans-serif',
                          fontSize: '14px',
                          color: '#7C7368',
                          '&.Mui-focused': { color: '#5A7365' },
                          transformOrigin: lang === 'ar' ? 'top right' : 'top left',
                          left: lang === 'ar' ? 'auto' : 0,
                          right: lang === 'ar' ? 20 : 'auto',
                          transform: lang === 'ar' ? 'translate(0, 16px) scale(1)' : 'translate(20px, 16px) scale(1)',
                          '&.MuiInputLabel-shrink': {
                            transform: lang === 'ar' ? 'translate(0, -9px) scale(0.75)' : 'translate(20px, -9px) scale(0.75)',
                          },
                          mt: 0.2
                        },
                        '& .MuiOutlinedInput-notchedOutline legend': {
                          display: 'block',
                          textAlign: lang === 'ar' ? 'right' : 'left',
                          marginRight: lang === 'ar' ? '0px' : 'auto',
                          marginLeft: lang === 'ar' ? 'auto' : '0px',
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      name="lastName"
                      label={lang === 'ar' ? 'الاسم الأخير' : 'Last Name'}
                      value={form.lastName}
                      onChange={handleChange}
                      required
                      fullWidth
                      variant="outlined"
                      dir={lang === 'ar' ? 'rtl' : 'ltr'}
                      slotProps={{
                        htmlInput: {
                          style: {
                            fontFamily: '"Silka", sans-serif',
                            fontSize: '14.5px',
                            color: '#2B2825',
                            padding: '16.5px 18px',
                            textAlign: lang === 'ar' ? 'right' : 'left',
                          },
                        },
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '50px',
                          backgroundColor: '#FFFFFF',
                          '& fieldset': { borderColor: 'rgba(61, 54, 46, 0.12)' },
                          '&:hover fieldset': { borderColor: '#7C7368' },
                          '&.Mui-focused fieldset': { borderColor: '#5A7365', borderWidth: '1.5px' },
                        },
                        '& .MuiInputLabel-root': {
                          fontFamily: '"Silka", sans-serif',
                          fontSize: '14px',
                          color: '#7C7368',
                          '&.Mui-focused': { color: '#5A7365' },
                          transformOrigin: lang === 'ar' ? 'top right' : 'top left',
                          left: lang === 'ar' ? 'auto' : 0,
                          right: lang === 'ar' ? 20 : 'auto',
                          transform: lang === 'ar' ? 'translate(0, 16px) scale(1)' : 'translate(20px, 16px) scale(1)',
                          '&.MuiInputLabel-shrink': {
                            transform: lang === 'ar' ? 'translate(0, -9px) scale(0.75)' : 'translate(20px, -9px) scale(0.75)',
                          },
                          mt: 0.2
                        },
                        '& .MuiOutlinedInput-notchedOutline legend': {
                          display: 'block',
                          textAlign: lang === 'ar' ? 'right' : 'left',
                          marginRight: lang === 'ar' ? '0px' : 'auto',
                          marginLeft: lang === 'ar' ? 'auto' : '0px',
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                {/* Email Address */}
                <TextField
                  name="email"
                  type="email"
                  label={lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                  value={form.email}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                  dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  slotProps={{
                    htmlInput: {
                      style: {
                        fontFamily: '"Silka", sans-serif',
                        fontSize: '14.5px',
                        color: '#2B2825',
                        padding: '16.5px 18px',
                        textAlign: lang === 'ar' ? 'right' : 'left',
                      },
                    },
                  }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '50px',
                          backgroundColor: '#FFFFFF',
                          '& fieldset': { borderColor: 'rgba(61, 54, 46, 0.12)' },
                          '&:hover fieldset': { borderColor: '#7C7368' },
                          '&.Mui-focused fieldset': { borderColor: '#5A7365', borderWidth: '1.5px' },
                        },
                        '& .MuiInputLabel-root': {
                          fontFamily: '"Silka", sans-serif',
                          fontSize: '14px',
                          color: '#7C7368',
                          '&.Mui-focused': { color: '#5A7365' },
                          transformOrigin: lang === 'ar' ? 'top right' : 'top left',
                          left: lang === 'ar' ? 'auto' : 0,
                          right: lang === 'ar' ? 20 : 'auto',
                          transform: lang === 'ar' ? 'translate(0, 16px) scale(1)' : 'translate(20px, 16px) scale(1)',
                          '&.MuiInputLabel-shrink': {
                            transform: lang === 'ar' ? 'translate(0, -9px) scale(0.75)' : 'translate(20px, -9px) scale(0.75)',
                          },
                          mt: 0.2
                        },
                        '& .MuiOutlinedInput-notchedOutline legend': {
                          display: 'block',
                          textAlign: lang === 'ar' ? 'right' : 'left',
                          marginRight: lang === 'ar' ? '0px' : 'auto',
                          marginLeft: lang === 'ar' ? 'auto' : '0px',
                        },
                      }}
                />

                {/* Phone Input with Flag Dropdown Selection */}
                <MuiTelInput
                  defaultCountry="SY"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                  fullWidth
                  dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  label={lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                  variant="outlined"
                  MenuProps={{
                    disableScrollLock: true,
                    PaperProps: {
                      'data-lenis-prevent': 'true', // Stop Lenis from blocking mouse scroll
                      style: {
                        maxHeight: 280,
                      }
                    }
                  }}
                  slotProps={{
                    htmlInput: {
                      style: {
                        fontFamily: '"Silka", sans-serif',
                        fontSize: '14.5px',
                        color: '#2B2825',
                        padding: '16.5px 18px',
                        textAlign: lang === 'ar' ? 'right' : 'left',
                      },
                    },
                  }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '50px',
                          backgroundColor: '#FFFFFF',
                          '& fieldset': { borderColor: 'rgba(61, 54, 46, 0.12)' },
                          '&:hover fieldset': { borderColor: '#7C7368' },
                          '&.Mui-focused fieldset': { borderColor: '#5A7365', borderWidth: '1.5px' },
                        },
                        '& .MuiInputLabel-root': {
                          fontFamily: '"Silka", sans-serif',
                          fontSize: '14px',
                          color: '#7C7368',
                          '&.Mui-focused': { color: '#5A7365' },
                          transformOrigin: lang === 'ar' ? 'top right' : 'top left',
                          left: lang === 'ar' ? 'auto' : 0,
                          right: lang === 'ar' ? 20 : 'auto',
                          transform: lang === 'ar' ? 'translate(0, 16px) scale(1)' : 'translate(20px, 16px) scale(1)',
                          '&.MuiInputLabel-shrink': {
                            transform: lang === 'ar' ? 'translate(0, -9px) scale(0.75)' : 'translate(20px, -9px) scale(0.75)',
                          },
                          mt: 0.2
                        },
                        '& .MuiOutlinedInput-notchedOutline legend': {
                          display: 'block',
                          textAlign: lang === 'ar' ? 'right' : 'left',
                          marginRight: lang === 'ar' ? '0px' : 'auto',
                          marginLeft: lang === 'ar' ? 'auto' : '0px',
                        },
                      }}
                />

                {/* Remarks (optional) */}
                <TextField
                  name="remarks"
                  label={lang === 'ar' ? 'ملاحظات (اختياري)' : 'Remarks (optional)'}
                  value={form.remarks}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  slotProps={{
                    htmlInput: {
                      style: {
                        fontFamily: '"Silka", sans-serif',
                        fontSize: '14.5px',
                        color: '#2B2825',
                        padding: '16.5px 18px',
                        textAlign: lang === 'ar' ? 'right' : 'left',
                      },
                    },
                  }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '50px',
                          backgroundColor: '#FFFFFF',
                          '& fieldset': { borderColor: 'rgba(61, 54, 46, 0.12)' },
                          '&:hover fieldset': { borderColor: '#7C7368' },
                          '&.Mui-focused fieldset': { borderColor: '#5A7365', borderWidth: '1.5px' },
                        },
                        '& .MuiInputLabel-root': {
                          fontFamily: '"Silka", sans-serif',
                          fontSize: '14px',
                          color: '#7C7368',
                          '&.Mui-focused': { color: '#5A7365' },
                          transformOrigin: lang === 'ar' ? 'top right' : 'top left',
                          left: lang === 'ar' ? 'auto' : 0,
                          right: lang === 'ar' ? 20 : 'auto',
                          transform: lang === 'ar' ? 'translate(0, 16px) scale(1)' : 'translate(20px, 16px) scale(1)',
                          '&.MuiInputLabel-shrink': {
                            transform: lang === 'ar' ? 'translate(0, -9px) scale(0.75)' : 'translate(20px, -9px) scale(0.75)',
                          },
                          mt: 0.2
                        },
                        '& .MuiOutlinedInput-notchedOutline legend': {
                          display: 'block',
                          textAlign: lang === 'ar' ? 'right' : 'left',
                          marginRight: lang === 'ar' ? '0px' : 'auto',
                          marginLeft: lang === 'ar' ? 'auto' : '0px',
                        },
                      }}
                />

                {/* Standard Theme Solid Button */}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: '#2B2825', // Primary Theme dark charcoal slate
                    color: '#FFFFFF',
                    fontWeight: 500,
                    fontSize: '14px',
                    fontFamily: '"Guise", sans-serif',
                    textTransform: 'none',
                    borderRadius: '50px',
                    py: 2,
                    mt: 3,
                    boxShadow: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      backgroundColor: '#5A7365', // Hover transitions elegantly to theme Sage Green accent!
                      boxShadow: 'none',
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  {lang === 'ar' ? 'سجل اهتمامك الآن' : 'Register Your Interest'}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
