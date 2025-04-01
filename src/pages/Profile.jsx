import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Button,
  TextField,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  Card,
  CardContent,
  ListItemIcon,
} from '@mui/material';
import {
  Edit as EditIcon,
  ShoppingBag as OrderIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Person,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// Mock data for user profile and orders
const userProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 234 567 890',
  address: '123 Main St, City, Country',
  avatar: 'https://via.placeholder.com/150',
};

const orders = [
  {
    id: 1,
    date: '2024-03-01',
    status: 'Delivered',
    total: 249.98,
    items: [
      {
        id: 1,
        name: 'Product 1',
        quantity: 2,
        price: 99.99,
        image: 'https://via.placeholder.com/50',
      },
    ],
  },
  {
    id: 2,
    date: '2024-02-15',
    status: 'Processing',
    total: 149.99,
    items: [
      {
        id: 2,
        name: 'Product 2',
        quantity: 1,
        price: 149.99,
        image: 'https://via.placeholder.com/50',
      },
    ],
  },
];

const Profile = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [profileData, setProfileData] = useState(userProfile);

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleSaveProfile = () => {
    // TODO: Implement profile update functionality
    handleCloseEditDialog();
  };

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('profile.title')}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {t('profile.subtitle')}
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText primary={t('profile.personalInfo')} />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <OrderIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('profile.orders')} />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('profile.settings')} />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('profile.logout')} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('profile.personalInfo')}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Name
                  </Typography>
                  <Typography variant="body1">{profileData.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">{profileData.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body1">{profileData.phone}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Address
                  </Typography>
                  <Typography variant="body1">{profileData.address}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Edit Profile Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={profileData.name}
              onChange={(e) =>
                setProfileData({ ...profileData, name: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              value={profileData.email}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Phone"
              value={profileData.phone}
              onChange={(e) =>
                setProfileData({ ...profileData, phone: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Address"
              value={profileData.address}
              onChange={(e) =>
                setProfileData({ ...profileData, address: e.target.value })
              }
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleSaveProfile} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile; 