'use client';
import React, { useState } from 'react';
import { Dialog, DialogContent, Box, Typography, TextField, Button, IconButton, Grid2 as Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { MuiTelInput } from 'mui-tel-input';
import { useLanguage } from '../context/LanguageContext';
import { useRegister } from '../context/RegisterContext';

export default function RegisterDrawer() {
  const { lang } = useLanguage();
  const { isOpen, closeRegister } = useRegister();
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
    message += '\n_Request sent from the website registration popup_';

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    closeRegister();
  };

  // Helper sx style for fully rounded pill-shaped input elements (matching the mockup)
  const inputStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '100px', // Fully rounded pill capsule shape
      backgroundColor: '#FFFFFF',
      fontFamily: '"Silka", sans-serif',
      transition: 'all 0.3s ease',
      paddingInlineStart: '16px', // Safe indents for pill shapes
      paddingInlineEnd: '24px',
      '& fieldset': {
        borderColor: 'rgba(61, 54, 46, 0.12)',
      },
      '&:hover fieldset': {
        borderColor: '#7C7368',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#5A7365', // Sage green branding outline
        borderWidth: '1.5px',
      },
    },
    '& .MuiOutlinedInput-input': {
      paddingInlineStart: '12px',
      paddingInlineEnd: '12px',
    },
    '& .MuiInputLabel-root': {
      fontFamily: '"Silka", sans-serif',
      fontSize: '13.5px',
      color: 'rgba(43, 40, 37, 0.55)',
      paddingInlineStart: '10px',
      paddingInlineEnd: '10px',
      '&.Mui-focused': { color: '#5A7365' },
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={closeRegister}
      scroll="body"
      slotProps={{
        backdrop: {
          style: {
            backgroundColor: 'rgba(30, 26, 22, 0.45)',
            backdropFilter: 'blur(12px)',
          }
        }
      }}
      PaperProps={{
        sx: {
          width: { xs: '92%', sm: '520px' },
          backgroundColor: '#FAF8F5', // Off-white ivory background
          borderRadius: '24px', // Rounded luxury edges
          border: '1px solid rgba(61, 54, 46, 0.08)',
          boxShadow: '0 25px 60px rgba(30, 26, 22, 0.18)',
          overflow: 'hidden',
          m: 2
        }
      }}
    >
      <DialogContent 
        dir={lang === 'ar' ? 'rtl' : 'ltr'} 
        sx={{ p: { xs: 3.5, sm: 5 }, position: 'relative' }}
      >
        {/* Close Button */}
        <IconButton 
          onClick={closeRegister} 
          sx={{ 
            position: 'absolute', 
            top: 20, 
            right: lang === 'ar' ? 'auto' : 20, 
            left: lang === 'ar' ? 20 : 'auto',
            color: '#7C7368',
            backgroundColor: 'rgba(61, 54, 46, 0.04)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: '#5A7365',
              color: '#FFFFFF'
            }
          }}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>

        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%',
          }}
        >
          {/* Subtitle */}
          <Typography
            sx={{
              fontFamily: '"Guise", sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.25em',
              color: '#7C7368',
              textTransform: 'uppercase',
              mb: 1.5,
              width: '100%',
              textAlign: 'center',
            }}
          >
            {lang === 'ar' ? 'سجّل اهتمامك' : 'REGISTER INTEREST'}
          </Typography>

          {/* Main Title */}
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"CS Brandis", serif',
              fontWeight: 300,
              fontSize: { xs: '1.75rem', sm: '2.1rem' },
              color: '#2B2825',
              lineHeight: 1.25,
              mb: 4.5, // Clean margin directly down to form fields (no horizontal separator rule)
              width: '100%',
              textAlign: 'center',
            }}
          >
            {lang === 'ar' ? 'احصل على عروض الإطلاق' : 'Unlock Launch Offers'}
          </Typography>

          {/* Form Content */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2.5,
              width: '100%',
              textAlign: lang === 'ar' ? 'right' : 'left'
            }}
          >
            {/* First Name & Last Name Side-by-Side */}
            <Grid container spacing={2.5} sx={{ flexDirection: lang === 'ar' ? 'row-reverse' : 'row' }}>
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
                        textAlign: lang === 'ar' ? 'right' : 'left',
                        direction: lang === 'ar' ? 'rtl' : 'ltr',
                      }
                    }
                  }}
                  sx={inputStyle}
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
                        textAlign: lang === 'ar' ? 'right' : 'left',
                        direction: lang === 'ar' ? 'rtl' : 'ltr',
                      }
                    }
                  }}
                  sx={inputStyle}
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
                    textAlign: lang === 'ar' ? 'right' : 'left',
                    direction: lang === 'ar' ? 'rtl' : 'ltr',
                  }
                }
              }}
              sx={inputStyle}
            />

            {/* International Phone Input with Flag Dropdown Selection */}
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
                  'data-lenis-prevent': 'true', // Prevent mouse scroll locks from Lenis smooth scroll overlay
                  style: {
                    maxHeight: 280,
                  }
                }
              }}
              slotProps={{
                htmlInput: {
                  style: {
                    textAlign: lang === 'ar' ? 'right' : 'left',
                    direction: lang === 'ar' ? 'rtl' : 'ltr',
                  }
                }
              }}
              sx={inputStyle}
            />

            {/* Remarks (optional) - Styled as a matching single-line pill field */}
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
                    textAlign: lang === 'ar' ? 'right' : 'left',
                    direction: lang === 'ar' ? 'rtl' : 'ltr',
                  }
                }
              }}
              sx={inputStyle}
            />

            {/* Elegant solid dark capsule button matching the mockup */}
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#2B2825', // Solid dark grey charcoal matching mockup
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '13.5px',
                fontFamily: '"Silka", sans-serif',
                textTransform: 'none', // Mixed case matching mockup
                borderRadius: '100px', // Fully rounded capsule matching mockup
                py: 2,
                mt: 1.5,
                boxShadow: 'none',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                '&:hover': {
                  backgroundColor: '#1E1A16', // Lighter or darker hover contrast shift
                  boxShadow: '0 8px 24px rgba(30, 26, 22, 0.12)',
                  transform: 'translateY(-1px)'
                },
                '&:active': {
                  transform: 'translateY(0)'
                }
              }}
            >
              {lang === 'ar' ? 'سجّل اهتمامك' : 'Register Your Interest'}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
