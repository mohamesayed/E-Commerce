import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Paper,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';

// Mock data for FAQs
const faqs = [
  {
    category: 'General',
    questions: [
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through our payment partners.',
      },
      {
        question: 'How do I track my order?',
        answer:
          'Once your order is shipped, you will receive a tracking number via email. You can use this number to track your order status on our website or the shipping carrier\'s website.',
      },
      {
        question: 'What is your return policy?',
        answer:
          'We offer a 30-day return policy for most items. Products must be unused and in their original packaging. Please contact our customer service team to initiate a return.',
      },
    ],
  },
  {
    category: 'Shipping',
    questions: [
      {
        question: 'How long does shipping take?',
        answer:
          'Standard shipping typically takes 3-5 business days within the continental US. International shipping times vary by location. Express shipping options are available for faster delivery.',
      },
      {
        question: 'Do you ship internationally?',
        answer:
          'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. Please check our shipping calculator for specific rates to your country.',
      },
      {
        question: 'What are your shipping costs?',
        answer:
          'Shipping costs are calculated based on your location and order weight. Free shipping is available for orders over $50 within the continental US.',
      },
    ],
  },
  {
    category: 'Account & Orders',
    questions: [
      {
        question: 'How do I create an account?',
        answer:
          'Click the "Sign Up" button in the top right corner of the website. Fill in your details, including email and password, and follow the verification process.',
      },
      {
        question: 'How do I reset my password?',
        answer:
          'Click the "Forgot Password" link on the login page. Enter your email address, and we will send you instructions to reset your password.',
      },
      {
        question: 'Can I modify my order after placing it?',
        answer:
          'Orders can be modified within 24 hours of placement. Please contact our customer service team immediately if you need to make changes to your order.',
      },
    ],
  },
  {
    category: 'Product Information',
    questions: [
      {
        question: 'How do I know if an item is in stock?',
        answer:
          'Product availability is shown on each product page. Items marked as "In Stock" are ready to ship. "Out of Stock" items can be added to your wishlist for notifications when they become available.',
      },
      {
        question: 'Do you offer product warranties?',
        answer:
          'Yes, most products come with a manufacturer\'s warranty. Warranty details are listed on individual product pages. We also offer extended warranty options for eligible items.',
      },
      {
        question: 'How do I find my size?',
        answer:
          'Each product page includes a size guide with detailed measurements. We recommend measuring yourself and comparing with our size charts for the best fit.',
      },
    ],
  },
];

const FAQ = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const filteredFaqs = faqs.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.questions.length > 0);

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Typography variant="h5" sx={{ maxWidth: 800, mx: 'auto' }}>
          Find answers to common questions about our products, services, and policies.
        </Typography>
      </Box>

      {/* Search Bar */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* FAQ Categories */}
      {filteredFaqs.map((category) => (
        <Box key={category.category} sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            {category.category}
          </Typography>
          {category.questions.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === `${category.category}-${index}`}
              onChange={handleAccordionChange(`${category.category}-${index}`)}
              sx={{ mb: 1 }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${category.category}-${index}-content`}
                id={`${category.category}-${index}-header`}
              >
                <Typography>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      ))}

      {/* Contact Support Section */}
      <Paper sx={{ p: 4, mt: 6, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Still have questions?
        </Typography>
        <Typography variant="body1" paragraph>
          Can't find the answer you're looking for? Please contact our support team.
        </Typography>
        <Typography variant="body1" color="primary">
          Email: support@ecommerce.com
        </Typography>
      </Paper>
    </Container>
  );
};

export default FAQ; 