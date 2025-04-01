import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
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
          Privacy Policy
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
            At our e-commerce platform, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
          </Typography>
          <Typography variant="body1" paragraph>
            Please read this privacy policy carefully. By using our website, you consent to the practices described in this policy.
          </Typography>
        </Box>

        {/* Information We Collect */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Information We Collect
          </Typography>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <Typography variant="body1" paragraph>
            We collect personal information that you voluntarily provide to us when you:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">Create an account</Typography>
            </li>
            <li>
              <Typography variant="body1">Place an order</Typography>
            </li>
            <li>
              <Typography variant="body1">Subscribe to our newsletter</Typography>
            </li>
            <li>
              <Typography variant="body1">Contact our customer service</Typography>
            </li>
          </ul>
          <Typography variant="body1" paragraph>
            This information may include:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">Name and contact information</Typography>
            </li>
            <li>
              <Typography variant="body1">Billing and shipping addresses</Typography>
            </li>
            <li>
              <Typography variant="body1">Payment information</Typography>
            </li>
            <li>
              <Typography variant="body1">Email address and phone number</Typography>
            </li>
          </ul>
        </Box>

        {/* How We Use Your Information */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            How We Use Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            We use the information we collect to:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">Process your orders and payments</Typography>
            </li>
            <li>
              <Typography variant="body1">Send you order confirmations and updates</Typography>
            </li>
            <li>
              <Typography variant="body1">Communicate with you about products and services</Typography>
            </li>
            <li>
              <Typography variant="body1">Improve our website and customer experience</Typography>
            </li>
            <li>
              <Typography variant="body1">Comply with legal obligations</Typography>
            </li>
          </ul>
        </Box>

        {/* Information Sharing */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Information Sharing
          </Typography>
          <Typography variant="body1" paragraph>
            We do not sell or rent your personal information to third parties. We may share your information with:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">Service providers who assist in our operations</Typography>
            </li>
            <li>
              <Typography variant="body1">Payment processors for secure transactions</Typography>
            </li>
            <li>
              <Typography variant="body1">Shipping partners to deliver your orders</Typography>
            </li>
            <li>
              <Typography variant="body1">Law enforcement when required by law</Typography>
            </li>
          </ul>
        </Box>

        {/* Data Security */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Data Security
          </Typography>
          <Typography variant="body1" paragraph>
            We implement appropriate security measures to protect your personal information, including:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">Encryption of sensitive data</Typography>
            </li>
            <li>
              <Typography variant="body1">Regular security assessments</Typography>
            </li>
            <li>
              <Typography variant="body1">Secure data storage and transmission</Typography>
            </li>
            <li>
              <Typography variant="body1">Access controls and authentication</Typography>
            </li>
          </ul>
        </Box>

        {/* Your Rights */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Your Rights
          </Typography>
          <Typography variant="body1" paragraph>
            You have the right to:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">Access your personal information</Typography>
            </li>
            <li>
              <Typography variant="body1">Correct inaccurate information</Typography>
            </li>
            <li>
              <Typography variant="body1">Request deletion of your information</Typography>
            </li>
            <li>
              <Typography variant="body1">Opt-out of marketing communications</Typography>
            </li>
          </ul>
        </Box>

        {/* Contact Us */}
        <Box>
          <Typography variant="h4" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions about this Privacy Policy, please contact us at:
          </Typography>
          <Typography variant="body1" color="primary">
            Email: privacy@ecommerce.com
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy; 