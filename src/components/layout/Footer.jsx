import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, useTheme } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.primary.main,
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              {t('footer.about.title', 'About Us')}
            </Typography>
            <Typography variant="body2">
              {t('footer.about.description', 'We are dedicated to providing the best shopping experience with quality products and excellent customer service.')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              {t('footer.quickLinks.title', 'Quick Links')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/products" color="inherit" underline="none">
                {t('footer.quickLinks.products', 'Products')}
              </Link>
              <Link component={RouterLink} to="/about" color="inherit" underline="none">
                {t('footer.quickLinks.about', 'About Us')}
              </Link>
              <Link component={RouterLink} to="/contact" color="inherit" underline="none">
                {t('footer.quickLinks.contact', 'Contact')}
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              {t('footer.contact.title', 'Contact Us')}
            </Typography>
            <Typography variant="body2">
              {t('footer.contact.email', 'Email: info@example.com')}
            </Typography>
            <Typography variant="body2">
              {t('footer.contact.phone', 'Phone: +1 234 567 890')}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Typography variant="body2" color="inherit">
            © 2024 {t('brand')}. {t('allRightsReserved')}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Link component={RouterLink} to="/about" color="inherit" sx={{ mx: 1 }}>
              {t('about')}
            </Link>
            <Link component={RouterLink} to="/products" color="inherit" sx={{ mx: 1 }}>
              {t('products')}
            </Link>
            <Link component={RouterLink} to="/contact" color="inherit" sx={{ mx: 1 }}>
              {t('contact')}
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 