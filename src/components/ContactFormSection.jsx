'use client';
import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, TextField, Button, Grid2 as Grid } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useLanguage } from '../context/LanguageContext';
import { client } from '../sanity/client';

const getPhoneHref = (phone) => `tel:${String(phone || '').replace(/[^\d+]/g, '')}`;
const getMapHref = (address, latitude, longitude) => {
  const query = latitude && longitude ? `${latitude},${longitude}` : address || '';
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
};

export default function ContactFormSection({ sectionData }) {
  const { lang } = useLanguage();
  const [phone, setPhone] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    remarks: ''
  });

  const [contactData, setContactData] = useState(sectionData || null);

  useEffect(() => {
    if (sectionData) {
      setContactData(sectionData);
      return;
    }

    let active = true;
    client
      .fetch(`*[_type == "page" && _id == "home"][0].sections[_type == "contactFormSection"][0]`)
      .then((data) => {
        if (active && data) {
          setContactData(data);
        }
      })
      .catch((err) => console.warn('Error fetching contact form section data:', err));
    return () => {
      active = false;
    };
  }, [sectionData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (newPhone) => {
    setPhone(newPhone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const WHATSAPP_NUMBER = contactData?.whatsappNumber || '963997711226';

    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    const email = form.email.trim();
    const remarks = form.remarks.trim();

    const missingFieldsMsg = contactData?.errorMessage?.[lang] || contactData?.errorMessage?.en || (
      lang === 'ar'
        ? 'يرجى ملء جميع الحقول المطلوبة (الاسم، البريد الإلكتروني، رقم الهاتف)'
        : 'Please fill in all required fields (Name, Email, Phone Number)'
    );

    if (!firstName || !lastName || !email || !phone) {
      alert(missingFieldsMsg);
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

  // Resolve dynamic values
  const displayPhone = contactData?.phone || '+963 11 4068';
  const displayEmail = contactData?.email || 'info@parkview.community';
  const displayAddress = contactData?.address?.[lang] || contactData?.address?.en || (
    lang === 'ar'
      ? 'يعفور، دمشق، سوريا - خلف البيت السويسري مباشرةً'
      : 'Yaafour, Damascus, Syria - Directly behind Swiss House'
  );

  const displayEyebrow = contactData?.eyebrow?.[lang] || contactData?.eyebrow?.en || (
    lang === 'ar' ? 'اتصل بنا' : 'Get in Touch'
  );
  const displayTitle = contactData?.title?.[lang] || contactData?.title?.en || (
    lang === 'ar'
      ? 'جاهزون للتواصل عندما تكون مستعداً'
      : "We're Ready to Connect When You Are"
  );

  const displayFormEyebrow = contactData?.formEyebrow?.[lang] || contactData?.formEyebrow?.en || (
    lang === 'ar' ? 'التسجيل الحصري' : 'Register Interest'
  );
  const displayFormTitle = contactData?.formTitle?.[lang] || contactData?.formTitle?.en || (
    lang === 'ar'
      ? 'استفسر اليوم واحصل على عروض الإطلاق'
      : 'Unlock Launch Offers'
  );

  const mapLatitude = contactData?.mapLatitude || 33.5277034;
  const mapLongitude = contactData?.mapLongitude || 36.1118096;
  const mapEmbedUrl = contactData?.mapEmbedUrl || `https://maps.google.com/maps?q=${mapLatitude},${mapLongitude}&z=15&output=embed`;

  const labelFirstName = contactData?.formLabels?.firstName?.[lang] || contactData?.formLabels?.firstName?.en || (
    lang === 'ar' ? 'الاسم الأول' : 'First Name'
  );
  const labelLastName = contactData?.formLabels?.lastName?.[lang] || contactData?.formLabels?.lastName?.en || (
    lang === 'ar' ? 'الاسم الأخير' : 'Last Name'
  );
  const labelEmail = contactData?.formLabels?.email?.[lang] || contactData?.formLabels?.email?.en || (
    lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'
  );
  const labelPhone = contactData?.formLabels?.phone?.[lang] || contactData?.formLabels?.phone?.en || (
    lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'
  );
  const labelRemarks = contactData?.formLabels?.remarks?.[lang] || contactData?.formLabels?.remarks?.en || (
    lang === 'ar' ? 'ملاحظات (اختياري)' : 'Any Remarks (Optional)'
  );

  const submitText = contactData?.submitButtonText?.[lang] || contactData?.submitButtonText?.en || (
    lang === 'ar' ? 'سجّل الآن' : 'Register Now'
  );

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
                {displayEyebrow}
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
                {displayTitle}
              </Typography>

              {/* Contact Icons Row */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5, width: '100%', mb: 6 }}>
                {/* Phone */}
                <Box
                  component="a"
                  href={getPhoneHref(displayPhone)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2.5,
                    flexDirection: 'row',
                    color: 'inherit',
                    textDecoration: 'none',
                    width: 'fit-content',
                    '&:hover .contact-text, &:focus-visible .contact-text': { color: '#5A7365' },
                    '&:focus-visible': { outline: '2px solid rgba(90, 115, 101, 0.35)', outlineOffset: 4 }
                  }}
                >
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
                    className="contact-text"
                    sx={{
                      fontFamily: '"Silka", sans-serif',
                      fontSize: '0.94rem',
                      color: '#2B2825',
                      fontWeight: 400,
                      dir: 'ltr',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {displayPhone}
                  </Typography>
                </Box>

                {/* Email */}
                <Box
                  component="a"
                  href={`mailto:${displayEmail}`}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2.5,
                    flexDirection: 'row',
                    color: 'inherit',
                    textDecoration: 'none',
                    width: 'fit-content',
                    '&:hover .contact-text, &:focus-visible .contact-text': { color: '#5A7365' },
                    '&:focus-visible': { outline: '2px solid rgba(90, 115, 101, 0.35)', outlineOffset: 4 }
                  }}
                >
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
                    className="contact-text"
                    sx={{
                      fontFamily: '"Silka", sans-serif',
                      fontSize: '0.94rem',
                      color: '#2B2825',
                      fontWeight: 400,
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {displayEmail}
                  </Typography>
                </Box>

                {/* Address */}
                <Box
                  component="a"
                  href={getMapHref(displayAddress, mapLatitude, mapLongitude)}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2.5,
                    flexDirection: 'row',
                    color: 'inherit',
                    textDecoration: 'none',
                    width: 'fit-content',
                    '&:hover .contact-text, &:focus-visible .contact-text': { color: '#5A7365' },
                    '&:focus-visible': { outline: '2px solid rgba(90, 115, 101, 0.35)', outlineOffset: 4 }
                  }}
                >
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
                    className="contact-text"
                    sx={{
                      fontFamily: '"Silka", sans-serif',
                      fontSize: '0.94rem',
                      color: '#2B2825',
                      fontWeight: 400,
                      textAlign: lang === 'ar' ? 'right' : 'left',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {displayAddress}
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
                  src={mapEmbedUrl}
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
                {displayFormEyebrow}
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
                {displayFormTitle}
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
                      label={labelFirstName}
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
                      label={labelLastName}
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
                  label={labelEmail}
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

                {/* Telephone Country Code Input Selector */}
                <MuiTelInput
                  defaultCountry="SY"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                  fullWidth
                  variant="outlined"
                  lang={lang}
                  dir="ltr"
                  placeholder={labelPhone}
                  MenuProps={{
                    disableScrollLock: true,
                    PaperProps: {
                      'data-lenis-prevent': 'true',
                      onWheel: (e) => {
                        e.stopPropagation();
                      },
                      style: {
                        maxHeight: 280,
                      }
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '50px',
                      backgroundColor: '#FFFFFF',
                      '& fieldset': { borderColor: 'rgba(61, 54, 46, 0.12)' },
                      '&:hover fieldset': { borderColor: '#7C7368' },
                      '&.Mui-focused fieldset': { borderColor: '#5A7365', borderWidth: '1.5px' },
                    },
                    '& .MuiTypography-root': {
                      fontFamily: '"Silka", sans-serif',
                      fontSize: '14.5px',
                      color: '#2B2825',
                    },
                    '& input': {
                      fontFamily: '"Silka", sans-serif',
                      fontSize: '14.5px',
                      color: '#2B2825',
                      padding: '16.5px 18px',
                    },
                  }}
                />

                {/* Remarks Multi-Line Field */}
                <TextField
                  name="remarks"
                  label={labelRemarks}
                  value={form.remarks}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  slotProps={{
                    htmlInput: {
                      style: {
                        fontFamily: '"Silka", sans-serif',
                        fontSize: '14.5px',
                        color: '#2B2825',
                        padding: '6px 4px',
                        textAlign: lang === 'ar' ? 'right' : 'left',
                      },
                    },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '24px',
                      backgroundColor: '#FFFFFF',
                      padding: '12px 18px',
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

                {/* Submitting button with luxury green backdrop fill */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    fontFamily: '"Silka", sans-serif',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    backgroundColor: '#5A7365',
                    color: '#FFFFFF',
                    borderRadius: '50px',
                    py: 2,
                    mt: 1.5,
                    boxShadow: '0 8px 24px rgba(90, 115, 101, 0.15)',
                    transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                    '&:hover': {
                      backgroundColor: '#3D4F44',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 28px rgba(90, 115, 101, 0.25)',
                    },
                  }}
                >
                  {submitText}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
