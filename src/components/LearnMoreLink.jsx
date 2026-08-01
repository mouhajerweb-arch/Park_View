'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container, Button } from '@mui/material';
import { useLanguage } from '../context/LanguageContext';

export default function LearnMoreLink({ path, bg = '#FFFFFF' }) {
  const router = useRouter();
  const { lang } = useLanguage();

  return (
    <Box 
      sx={{ 
        width: '100%', 
        backgroundColor: bg, 
        pb: 10,
        pt: 2,
        // borderBottom: '1px solid rgba(29, 29, 28, 0.04)'
      }}
    >
      <Container 
        maxWidth="xl" 
        sx={{ 
          display: 'flex',
          paddingLeft: "0 !important",
          justifyContent: 'flex-start'
        }}
      >
        <Button 
          onClick={() => router.push(path)}
          variant="text" 
          sx={{ 
            fontFamily: '"Guise", sans-serif', // Using Guise for links/buttons as per font swap request
            fontSize: '0.8rem', 
            fontWeight: 500, 
            color: 'rgb(29, 29, 28)',
            borderBottom: '1.5px solid rgb(29, 29, 28)',
            borderRadius: 0,
            px: 0,
            pb: 0.6,
            letterSpacing: '0.05em',
            textTransform: 'none',
            transition: 'all 0.3s ease',
            '&:hover': {
              color: '#3D362E',
              borderColor: '#3D362E',
              backgroundColor: 'transparent',
              // transform: 'translateY(-1px)',
              '& .arrow': {
                transform: lang === 'ar' ? 'translateX(-4px)' : 'translateX(4px)'
              }
            }
          }}
        >
          {lang === 'ar' ? 'تعرف على المزيد' : 'Learn More'}
          <span 
            className="arrow" 
            style={{ 
              display: 'inline-block', 
              marginLeft: lang === 'ar' ? '0' : '6px',
              marginRight: lang === 'ar' ? '6px' : '0',
              transition: 'transform 0.25s ease' 
            }}
          >
            {lang === 'ar' ? '←' : '→'}
          </span>
        </Button>
      </Container>
    </Box>
  );
}
