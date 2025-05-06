import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Paper,
  Rating,
  IconButton,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { productService } from '../services/api';
import { useCart } from '../context/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const theme = useTheme();

  useEffect(() => {
    fetchFeaturedProducts();
    fetchCategories();
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error parsing favorites:', error);
        setFavorites([]);
      }
    }
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await productService.getAllProducts();
      setFeaturedProducts(response.data.slice(0, 4));
    } catch (err) {
      setError(err.message);
    }
  };

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

  const handleAddToCart = (productId) => {
    addToCart(productId);
  };

  const toggleFavorite = (productId) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.includes(productId)
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
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
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '60vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Container>
          <Box sx={{ color: 'white', maxWidth: '600px' }}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              {t('home.welcome', 'Welcome to Our Store')}
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
              {t('home.subtitle', 'Discover amazing products at great prices')}
            </Typography>
            <Button
              component={Link}
              to="/products"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ShoppingCartIcon />}
              sx={{ 
                m: 2,
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: 'transform 0.2s ease-in-out',
                }
              }}
            >
              {t('home.shopNow', 'Shop Now')}
            </Button>
            <Button
              component={Link}
              to="/categories"
              variant="outlined"
              color="inherit"
              size="large"
              sx={{
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: 'transform 0.2s ease-in-out',
                  
                }
              }}
            >
              {t('home.browseCategories', 'Browse Categories')}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Featured Products */}
      <Container sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            {t('home.featuredProducts', 'Featured Products')}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {t('home.featuredSubtitle', 'Check out our most popular products')}
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {featuredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.title}
                  sx={{ objectFit: 'contain', p: 2 }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography gutterBottom variant="h6" component="h3">
                      {product.title}
                    </Typography>
                    <IconButton
                      onClick={() => toggleFavorite(product.id)}
                      color={favorites.includes(product.id) ? 'error' : 'default'}
                    >
                      {favorites.includes(product.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {product.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating value={product.rating.rate} readOnly precision={0.5} />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({product.rating.count})
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
                    {t('product.addToCart', 'Add to Cart')}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Categories */}
      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              {t('home.categories', 'Shop by Category')}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {t('home.categoriesSubtitle', 'Explore our wide range of categories')}
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {categories.map((category) => (
              <Grid item key={category} xs={12} sm={6} md={4}>
                <Card
                  component={Link}
                  to={`/products?category=${category}`}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    }
                  }}
                >
                  <CardContent sx={{ 
                    flexGrow: 1, 
                    textAlign: 'center',
                    p: 4,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
                    color: 'white',
                  }}>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                      {t(`categories.${category}.description`, `Browse our ${category} collection`)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 