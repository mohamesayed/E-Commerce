import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Pagination,
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

const Products = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const theme = useTheme();

  const category = searchParams.get('category');
  const productsPerPage = 12;

  useEffect(() => {
    fetchData();
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error parsing favorites:', error);
        setFavorites([]);
      }
    }
  }, [category, searchTerm, sortBy]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsResponse, categoriesResponse] = await Promise.all([
        productService.getAllProducts(),
        productService.getAllCategories(),
      ]);

      let filteredProducts = productsResponse.data;

      // Filter by category
      if (category) {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === category
        );
      }

      // Filter by search term
      if (searchTerm) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Sort products
      switch (sortBy) {
        case 'price-asc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
          break;
        default:
          break;
      }

      setCategories(categoriesResponse.data);
      setProducts(filteredProducts);
      setTotalPages(Math.ceil(filteredProducts.length / productsPerPage));
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
      
      // Update localStorage
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      
      // Dispatch custom event for immediate update
      window.dispatchEvent(
        new CustomEvent('customStorageChange', {
          detail: { key: 'favorites', value: JSON.stringify(newFavorites) }
        })
      );
      
      return newFavorites;
    });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
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

  const paginatedProducts = products.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {category ? t(category, category) : t('productsTitle')}
        </Typography>

        <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label={t('search')}
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ minWidth: 200 }}
          />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>{t('sortBy')}</InputLabel>
            <Select
              value={sortBy}
              label={t('sortBy')}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="default">{t('default')}</MenuItem>
              <MenuItem value="price-asc">{t('priceAsc')}</MenuItem>
              <MenuItem value="price-desc">{t('priceDesc')}</MenuItem>
              <MenuItem value="rating">{t('rating')}</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {paginatedProducts.length === 0 ? (
          <Alert severity="info">
            {t('noResults')}
          </Alert>
        ) : (
          <>
            <Grid container spacing={4}>
              {paginatedProducts.map((product) => (
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
                        {t('addToCart')}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default Products; 