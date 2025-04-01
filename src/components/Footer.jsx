import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <AppBar position="static" sx={{ mt: 'auto' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Typography variant="body2" color="inherit">
            © 2024 {t('home.hero.title')}. {t('about.title')}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Link component={RouterLink} to="/about" color="inherit" sx={{ mx: 1 }}>
              {t('about.title')}
            </Link>
            <Link component={RouterLink} to="/products" color="inherit" sx={{ mx: 1 }}>
              {t('home.categories.title')}
            </Link>
            <Link component={RouterLink} to="/contact" color="inherit" sx={{ mx: 1 }}>
              {t('contact.title')}
            </Link>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Footer; 