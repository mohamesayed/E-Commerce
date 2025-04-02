import React from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main', mb: 3 }} />
        <Typography variant="h4" component="h1" gutterBottom>
          {t('orderSuccess')}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {t('message')}
        </Typography>

        <Paper sx={{ p: 4, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            {t('nextSteps')}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {t('nextStepsMessage')}
          </Typography>
        </Paper>

        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            startIcon={<ShoppingBagIcon />}
            onClick={() => navigate('/products')}
          >
            {t('continueShopping')}
          </Button>
          <Button
            variant="outlined"
            startIcon={<PersonIcon />}
            onClick={() => navigate('/profile')}
          >
            {t('viewOrders')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default OrderSuccess; 