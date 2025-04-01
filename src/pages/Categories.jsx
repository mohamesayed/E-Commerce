import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { productService } from '../services/api';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await productService.getAllCategories();
      setCategories(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryImage = (category) => {
    switch (category.toLowerCase()) {
      case 'electronics':
        return 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg';
      case 'jewelery':
        return 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg';
      case "men's clothing":
        return 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg';
      case "women's clothing":
        return 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg';
      default:
        return 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('categories')}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          {t('browseCategories')}
        </Typography>

        <Grid container spacing={4}>
          {categories.map((category) => (
            <Grid item key={category} xs={12} sm={6} md={4}>
              <Card
                onClick={() => navigate(`/products?category=${category}`)}
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={getCategoryImage(category)}
                  alt={category}
                  sx={{ objectFit: 'contain', p: 2, backgroundColor: '#f5f5f5' }}
                />
                <CardContent sx={{ 
                  textAlign: 'center',
                  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
                  color: 'white',
                }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    {t(`${category}Description`, `Browse our ${category} collection`)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Categories; 