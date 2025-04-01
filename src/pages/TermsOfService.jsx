import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const TermsOfService = () => {
  const { t } = useTranslation();
  const theme = useTheme();

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
          Terms of Service
        </Typography>
        <Typography variant="h5" sx={{ maxWidth: 800, mx: 'auto' }}>
          Last updated: {new Date().toLocaleDateString()}
        </Typography>
      </Box>

      <Paper sx={{ p: 4 }}>
        {/* Introduction */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Introduction
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to our e-commerce platform. By accessing or using our website, you agree to be bound by these Terms of Service. Please read them carefully before proceeding.
          </Typography>
          <Typography variant="body1" paragraph>
            These terms govern your access to and use of our website, including any content, functionality, and services offered on or through our platform.
          </Typography>
        </Box>

        {/* Definitions */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Definitions
          </Typography>
          <Typography variant="body1" paragraph>
            For the purposes of these Terms of Service:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">
                "Website" refers to our e-commerce platform and all its pages
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                "User," "you," and "your" refer to individuals accessing or using our website
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                "We," "us," and "our" refer to our company and its affiliates
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                "Content" refers to all materials available on our website
              </Typography>
            </li>
          </ul>
        </Box>

        {/* Account Terms */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Account Terms
          </Typography>
          <Typography variant="body1" paragraph>
            To use our website, you must:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">Be at least 18 years old</Typography>
            </li>
            <li>
              <Typography variant="body1">Provide accurate and complete information</Typography>
            </li>
            <li>
              <Typography variant="body1">Maintain the security of your account</Typography>
            </li>
            <li>
              <Typography variant="body1">Accept responsibility for all activities under your account</Typography>
            </li>
          </ul>
        </Box>

        {/* Order Terms */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Order Terms
          </Typography>
          <Typography variant="body1" paragraph>
            When placing an order:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">All prices are subject to change without notice</Typography>
            </li>
            <li>
              <Typography variant="body1">We reserve the right to refuse service to anyone</Typography>
            </li>
            <li>
              <Typography variant="body1">Orders are subject to availability</Typography>
            </li>
            <li>
              <Typography variant="body1">We may limit quantities available for purchase</Typography>
            </li>
          </ul>
        </Box>

        {/* Payment Terms */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Payment Terms
          </Typography>
          <Typography variant="body1" paragraph>
            Regarding payments:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">All payments must be made in full at the time of purchase</Typography>
            </li>
            <li>
              <Typography variant="body1">We accept various payment methods as indicated on our website</Typography>
            </li>
            <li>
              <Typography variant="body1">Prices are subject to applicable taxes and shipping fees</Typography>
            </li>
            <li>
              <Typography variant="body1">We are not responsible for any bank fees or charges</Typography>
            </li>
          </ul>
        </Box>

        {/* Shipping Terms */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Shipping Terms
          </Typography>
          <Typography variant="body1" paragraph>
            Regarding shipping:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">Shipping times are estimates and not guaranteed</Typography>
            </li>
            <li>
              <Typography variant="body1">We are not responsible for delays beyond our control</Typography>
            </li>
            <li>
              <Typography variant="body1">Shipping costs are calculated based on location and weight</Typography>
            </li>
            <li>
              <Typography variant="body1">International shipping may be subject to customs fees</Typography>
            </li>
          </ul>
        </Box>

        {/* Return Policy */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Return Policy
          </Typography>
          <Typography variant="body1" paragraph>
            Our return policy includes:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">30-day return window for most items</Typography>
            </li>
            <li>
              <Typography variant="body1">Items must be unused and in original packaging</Typography>
            </li>
            <li>
              <Typography variant="body1">Return shipping costs may be the responsibility of the customer</Typography>
            </li>
            <li>
              <Typography variant="body1">Refunds will be processed within 14 business days</Typography>
            </li>
          </ul>
        </Box>

        {/* Intellectual Property */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Intellectual Property
          </Typography>
          <Typography variant="body1" paragraph>
            All content on our website, including but not limited to:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">Text, graphics, logos, and images</Typography>
            </li>
            <li>
              <Typography variant="body1">Product descriptions and specifications</Typography>
            </li>
            <li>
              <Typography variant="body1">Software and code</Typography>
            </li>
            <li>
              <Typography variant="body1">Design and layout</Typography>
            </li>
          </ul>
          <Typography variant="body1" paragraph>
            is the property of our company and is protected by intellectual property laws.
          </Typography>
        </Box>

        {/* Limitation of Liability */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Limitation of Liability
          </Typography>
          <Typography variant="body1" paragraph>
            We shall not be liable for:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">Indirect, incidental, or consequential damages</Typography>
            </li>
            <li>
              <Typography variant="body1">Loss of profits or data</Typography>
            </li>
            <li>
              <Typography variant="body1">Service interruptions or errors</Typography>
            </li>
            <li>
              <Typography variant="body1">Third-party actions or content</Typography>
            </li>
          </ul>
        </Box>

        {/* Changes to Terms */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Changes to Terms
          </Typography>
          <Typography variant="body1" paragraph>
            We reserve the right to:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">Modify these terms at any time</Typography>
            </li>
            <li>
              <Typography variant="body1">Update our policies and procedures</Typography>
            </li>
            <li>
              <Typography variant="body1">Change our services or features</Typography>
            </li>
            <li>
              <Typography variant="body1">Discontinue any part of our website</Typography>
            </li>
          </ul>
        </Box>

        {/* Contact Information */}
        <Box>
          <Typography variant="h4" gutterBottom>
            Contact Information
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions about these Terms of Service, please contact us at:
          </Typography>
          <Typography variant="body1" color="primary">
            Email: legal@ecommerce.com
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default TermsOfService; 