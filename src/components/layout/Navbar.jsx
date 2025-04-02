import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { cartItems } = useCart();

  // Load initial data from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    const savedCart = localStorage.getItem('cart');
    const savedUser = localStorage.getItem('user');
    
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        setFavorites(parsedFavorites);
        // Dispatch custom event for initial favorites count
        window.dispatchEvent(
          new CustomEvent('customStorageChange', {
            detail: { key: 'favorites', value: savedFavorites }
          })
        );
      } catch (error) {
        console.error('Error parsing favorites:', error);
        setFavorites([]);
      }
    }

    if (savedCart) {
      try {
        const cart = JSON.parse(savedCart);
        setCartCount(cart.length);
      } catch (error) {
        console.error('Error parsing cart:', error);
        setCartCount(0);
      }
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user:', error);
        setUser(null);
      }
    }
  }, []);

  // Handle storage changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'favorites') {
        try {
          const newFavorites = JSON.parse(e.newValue || '[]');
          setFavorites(newFavorites);
          // Dispatch custom event for immediate update
          window.dispatchEvent(
            new CustomEvent('customStorageChange', {
              detail: { key: 'favorites', value: e.newValue }
            })
          );
        } catch (error) {
          console.error('Error parsing favorites:', error);
          setFavorites([]);
        }
      } else if (e.key === 'cart') {
        try {
          const cart = JSON.parse(e.newValue || '[]');
          setCartCount(cart.length);
        } catch (error) {
          console.error('Error parsing cart:', error);
          setCartCount(0);
        }
      } else if (e.key === 'user') {
        try {
          setUser(e.newValue ? JSON.parse(e.newValue) : null);
        } catch (error) {
          console.error('Error parsing user:', error);
          setUser(null);
        }
      }
    };

    const handleCustomStorageChange = (e) => {
      if (e.detail.key === 'favorites') {
        try {
          const newFavorites = JSON.parse(e.detail.value || '[]');
          setFavorites(newFavorites);
        } catch (error) {
          console.error('Error parsing favorites:', error);
          setFavorites([]);
        }
      } else if (e.detail.key === 'cart') {
        try {
          const cart = JSON.parse(e.detail.value || '[]');
          setCartCount(cart.length);
        } catch (error) {
          console.error('Error parsing cart:', error);
          setCartCount(0);
        }
      }
    };

    // Listen for both storage and custom events
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('customStorageChange', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('customStorageChange', handleCustomStorageChange);
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    handleMenuClose();
    navigate('/');
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate('/profile');
  };

  const menuItems = [
    { text: t('home'), path: '/' },
    { text: t('products'), path: '/products' },
    { text: t('categories'), path: '/categories' },
    { text: t('favorites'), path: '/favorites' },
    { text: t('about'), path: '/about' },
    { text: t('contact'), path: '/contact' },
  ];

  const renderMobileMenu = () => (
    <Drawer
      variant="temporary"
      anchor="right"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Box sx={{ width: 250 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => {
                navigate(item.path);
                handleDrawerToggle();
              }}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <Divider />
          <ListItem button onClick={() => { navigate('/profile'); handleDrawerToggle(); }}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={t('profile')} />
          </ListItem>
          <ListItem button onClick={() => { handleLogout(); handleDrawerToggle(); }}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={t('logout')} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );

  const drawer = (
    <Box>
      <List>
        <ListItem button onClick={() => navigate('/')}>
          <ListItemText primary={t('home')} />
        </ListItem>
        <ListItem button onClick={() => navigate('/products')}>
          <ListItemText primary={t('products')} />
        </ListItem>
        <ListItem button onClick={() => navigate('/categories')}>
          <ListItemText primary={t('categories')} />
        </ListItem>
        <ListItem button onClick={() => navigate('/about')}>
          <ListItemText primary={t('about')} />
        </ListItem>
        <ListItem button onClick={() => navigate('/contact')}>
          <ListItemText primary={t('contact')} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => navigate('/favorites')}>
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText primary={t('favorites')} />
          <Badge badgeContent={favorites.length} color="error" />
        </ListItem>
        <ListItem button onClick={() => navigate('/cart')}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary={t('cart')} />
          <Badge badgeContent={cartCount} color="error" />
        </ListItem>
        {user ? (
          <>
            <ListItem button onClick={() => navigate('/profile')}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={t('profile')} />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={t('logout')} />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button onClick={() => navigate('/login')}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={t('login')} />
            </ListItem>
            <ListItem button onClick={() => navigate('/register')}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={t('register')} />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            {t('brand')}
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button color="inherit" onClick={() => navigate('/products')}>
                {t('products')}
              </Button>
              <Button color="inherit" onClick={() => navigate('/categories')}>
                {t('categories')}
              </Button>
              <Button color="inherit" onClick={() => navigate('/about')}>
                {t('about')}
              </Button>
              <Button color="inherit" onClick={() => navigate('/contact')}>
                {t('contact')}
              </Button>
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit" onClick={() => navigate('/favorites')}>
              <Badge badgeContent={favorites.length} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={() => navigate('/cart')}>
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {user ? (
              <>
                <IconButton
                  color="inherit"
                  onClick={handleMenuOpen}
                  sx={{ ml: 1 }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: 'secondary.main',
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleProfileClick}>
                    <PersonIcon sx={{ mr: 1 }} />
                    {t('profile.title')}
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon sx={{ mr: 1 }} />
                    {t('logout')}
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  color="inherit"
                  onClick={() => navigate('/login')}
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                  {t('login')}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate('/register')}
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                  {t('register')}
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar; 