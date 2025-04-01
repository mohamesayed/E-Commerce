import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  CircularProgress,
  Alert,
  Rating,
  IconButton,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { productService } from '../services/api';
import { useCart } from '../context/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';

const Favorites = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchFavoriteProducts();
  }, []);

  const fetchFavoriteProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAllProducts();
      // In a real app, you would get the favorites from your backend
      // For now, we'll use localStorage to persist favorites
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const products = response.data.filter(product => favorites.includes(product.id));
      setFavoriteProducts(products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (productId) => {
    addToCart(productId);
  };

  const removeFromFavorites = (productId) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const newFavorites = favorites.filter(id => id !== productId);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavoriteProducts(prev => prev.filter(product => product.id !== productId));
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
    <Container sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          {t('favoritesTitle', 'My Favorites')}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {t('favoritesSubtitle', 'Your favorite products')}
        </Typography>
      </Box>

      {favoriteProducts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {t('emptyFavorites', 'No favorite products yet')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t('emptyFavoritesSubtitle', 'Add products to your favorites to see them here')}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {favoriteProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  }
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.title}
                    sx={{ objectFit: 'contain', p: 2, bgcolor: 'background.paper' }}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'background.paper',
                      '&:hover': {
                        bgcolor: 'background.paper',
                      }
                    }}
                    onClick={() => removeFromFavorites(product.id)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h3" noWrap>
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {product.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={product.rating?.rate || 0} precision={0.1} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({product.rating?.count || 0})
                    </Typography>
                  </Box>
                  <Typography variant="h6" color="primary" gutterBottom>
                    ${product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => handleAddToCart(product.id)}
                  >
                    {t('addToCart')}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favorites; 