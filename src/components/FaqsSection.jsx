'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { client } from '../sanity/client';

gsap.registerPlugin(ScrollTrigger);

export default function FaqsSection() {
  const { t, lang } = useLanguage();
  
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  // Controlled accordion state to ensure only one item is open at a time across both columns
  const [expanded, setExpanded] = useState(false);
  const [faqsList, setFaqsList] = useState([]);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const fq = t.faqs;

  // Fetch FAQs from Sanity on mount/lang change, falling back to local translations if empty
  useEffect(() => {
    let active = true;
    client
      .fetch(`*[_type == "faq"] | order(order asc)`)
      .then((data) => {
        if (!active) return;
        if (data && data.length > 0) {
          setFaqsList(
            data.map((item) => ({
              q: item.question?.[lang] || item.question?.en || '',
              a: item.answer?.[lang] || item.answer?.en || '',
            }))
          );
        } else {
          setFaqsList(fq.list);
        }
      })
      .catch((err) => {
        console.warn('Error fetching FAQs from Sanity:', err);
        if (active) {
          setFaqsList(fq.list);
        }
      });
    return () => {
      active = false;
    };
  }, [lang, fq.list]);

  useEffect(() => {
    if (faqsList.length === 0) return;

    const ctx = gsap.context(() => {
      // Reveal header
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
      );

      // Staggered reveal of accordion rows
      if (leftColRef.current && rightColRef.current) {
        gsap.fromTo(
          [leftColRef.current.children, rightColRef.current.children],
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.04,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: leftColRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [lang, faqsList]);

  // Calculate splits: ensure the left array has more questions than the right.
  const totalFaqs = faqsList.length;
  const leftCount = Math.ceil(totalFaqs / 2) + (totalFaqs % 2 === 0 ? 1 : 0);
  const leftFaqs = faqsList.slice(0, leftCount);
  const rightFaqs = faqsList.slice(leftCount);

  // Customized minimalist Expand More/Less Icon (Plus/Minus transition)
  const ExpandIcon = ({ isOpen }) => (
    <Box
      className="expand-circle"
      sx={{
        width: 18,
        height: 18,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: isOpen ? '#5A7365' : '#7C7368',
        transition: 'color 0.3s ease',
      }}
    >
      {/* Horizontal Line */}
      <Box
        sx={{
          position: 'absolute',
          width: 14,
          height: 1.5,
          backgroundColor: 'currentColor',
        }}
      />
      {/* Vertical Line (rotates and scales down to transform from Plus to Minus) */}
      <Box
        sx={{
          position: 'absolute',
          width: 1.5,
          height: 14,
          backgroundColor: 'currentColor',
          transform: isOpen ? 'rotate(90deg) scaleY(0)' : 'rotate(0deg) scaleY(1)',
          opacity: isOpen ? 0 : 1,
          transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease',
        }}
      />
    </Box>
  );

  return (
    <Box
      id="faqs"
      ref={sectionRef}
      className="brochure-section"
      sx={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#F6F2EC', // Luxury warm stone beige
        py: { xs: 6, md: 10 }, // Compact spacing for tight responsive sections integration
        px: { xs: 3, sm: 6, md: 10, lg: 12 },
        borderBottom: '1px solid rgba(61, 54, 46, 0.05)',
      }}
    >
      <Container maxWidth="xl" sx={{ pr: { md: 8 } }}>
        {/* Header */}
        <Box 
          ref={headerRef} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'flex-start',
            mb: { xs: 4, md: 6 },
            width: '100%',
            textAlign: lang === 'ar' ? 'right' : 'left'
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Silka", sans-serif',
              fontSize: { xs: '11px', sm: '13px' },
              fontWeight: 600,
              letterSpacing: '0.2em',
              color: '#7C7368',
              textTransform: 'uppercase',
              mb: 1.5,
              textAlign: lang === 'ar' ? 'right' : 'left',
              width: '100%',
            }}
          >
            {fq.subtitle}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"CS Brandis", serif',
              fontWeight: 300,
              fontSize: { xs: '2rem', sm: '2.4rem', md: '2.8rem' },
              lineHeight: 1.15,
              color: '#3D362E',
              textAlign: lang === 'ar' ? 'right' : 'left',
              width: '100%',
              letterSpacing: '-0.01em',
            }}
          >
            {fq.title}
          </Typography>
        </Box>

        {/* Two-Column Minimalist Accordion Layout */}
        {/* Uses standard flex-direction row: in LTR it flows left-to-right, in RTL it flows right-to-left. */}
        {/* This mirrors the columns natively, putting the larger leftFaqs list on the right side of the screen in Arabic. */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 0, md: 6, lg: 8 },
            alignItems: 'flex-start',
          }}
        >
          {/* Column 1 (Left in LTR, Right on screen in RTL) - Contains more FAQs */}
          <Box ref={leftColRef} sx={{ width: { xs: '100%', md: '50%' } }}>
            {leftFaqs.map((item, idx) => {
              const panelId = `left-panel-${idx}`;
              const isOpen = expanded === panelId;
              return (
                <Accordion
                  key={idx}
                  expanded={isOpen}
                  onChange={handleAccordionChange(panelId)}
                  elevation={0}
                  disableGutters
                  sx={{
                    backgroundColor: 'transparent',
                    borderBottom: '1px solid rgba(61, 54, 46, 0.08)',
                    borderRadius: 0,
                    transition: 'all 0.3s ease',
                    '&::before': { display: 'none' }, // Remove default MUI line
                    '&:first-of-type': {
                      borderTop: '1px solid rgba(61, 54, 46, 0.08)',
                    },
                    '&:hover': {
                      borderBottomColor: 'rgba(90, 115, 101, 0.3)',
                    },
                    '&.Mui-expanded': {
                      borderBottomColor: '#5A7365', // Highlight divider line when open
                    }
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandIcon isOpen={isOpen} />}
                    sx={{
                      p: { xs: 2, md: 2.5 },
                      // Use logical properties: summary content automatically mirrors under dir="rtl"
                      // Text stays right-aligned, icon stays left-aligned.
                      '& .MuiAccordionSummary-content': {
                        m: 0,
                      },
                      '& .MuiAccordionSummary-expandIconWrapper': {
                        transition: 'none', // Stop default MUI 180deg arrow rotation
                        marginInlineStart: '16px', // Automatically maps to ml in LTR and mr in RTL
                        '&.Mui-expanded': {
                          transform: 'none',
                        }
                      }
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: '"Silka", sans-serif',
                        fontWeight: 500,
                        fontSize: { xs: '0.94rem', md: '1.02rem' },
                        color: '#3D362E',
                        textAlign: lang === 'ar' ? 'right' : 'left',
                        transition: 'color 0.3s ease, font-weight 0.3s ease',
                        '.Mui-expanded &': {
                          color: '#5A7365', // turn active question text sage green
                          fontWeight: 600,
                        }
                      }}
                    >
                      {item.q}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: { xs: 2, md: 2.5 }, pb: 3, pt: 0.5 }}>
                    <Typography
                      sx={{
                        fontFamily: '"Silka", sans-serif',
                        fontWeight: 300,
                        fontSize: '0.9rem',
                        lineHeight: 1.8,
                        color: '#6B6661',
                        textAlign: lang === 'ar' ? 'right' : 'left'
                      }}
                    >
                      {item.a}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>

          {/* Column 2 (Right in LTR, Left on screen in RTL) - Contains fewer FAQs */}
          <Box ref={rightColRef} sx={{ width: { xs: '100%', md: '50%' } }}>
            {rightFaqs.map((item, idx) => {
              const panelId = `right-panel-${idx}`;
              const isOpen = expanded === panelId;
              return (
                <Accordion
                  key={idx}
                  expanded={isOpen}
                  onChange={handleAccordionChange(panelId)}
                  elevation={0}
                  disableGutters
                  sx={{
                    backgroundColor: 'transparent',
                    borderBottom: '1px solid rgba(61, 54, 46, 0.08)',
                    borderRadius: 0,
                    transition: 'all 0.3s ease',
                    '&::before': { display: 'none' },
                    '&:first-of-type': {
                      borderTop: '1px solid rgba(61, 54, 46, 0.08)',
                    },
                    '&:hover': {
                      borderBottomColor: 'rgba(90, 115, 101, 0.3)',
                    },
                    '&.Mui-expanded': {
                      borderBottomColor: '#5A7365',
                    }
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandIcon isOpen={isOpen} />}
                    sx={{
                      p: { xs: 2, md: 2.5 },
                      '& .MuiAccordionSummary-content': {
                        m: 0,
                      },
                      '& .MuiAccordionSummary-expandIconWrapper': {
                        transition: 'none',
                        marginInlineStart: '16px',
                        '&.Mui-expanded': {
                          transform: 'none',
                        }
                      }
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: '"Silka", sans-serif',
                        fontWeight: 500,
                        fontSize: { xs: '0.94rem', md: '1.02rem' },
                        color: '#3D362E',
                        textAlign: lang === 'ar' ? 'right' : 'left',
                        transition: 'color 0.3s ease, font-weight 0.3s ease',
                        '.Mui-expanded &': {
                          color: '#5A7365',
                          fontWeight: 600,
                        }
                      }}
                    >
                      {item.q}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: { xs: 2, md: 2.5 }, pb: 3, pt: 0.5 }}>
                    <Typography
                      sx={{
                        fontFamily: '"Silka", sans-serif',
                        fontWeight: 300,
                        fontSize: '0.9rem',
                        lineHeight: 1.8,
                        color: '#6B6661',
                        textAlign: lang === 'ar' ? 'right' : 'left'
                      }}
                    >
                      {item.a}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
