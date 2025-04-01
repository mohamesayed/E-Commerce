import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Store,
  Security,
  Support,
  Star,
  People,
  Lightbulb,
  TrendingUp,
} from '@mui/icons-material';

const About = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const teamImages = [
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        />
        <Container>
          <Typography
            variant="h2"
            color="white"
            sx={{ position: 'relative', zIndex: 1 }}
          >
            {t('aboutTitle', 'About Us')}
          </Typography>
          <Typography
            variant="h5"
            color="white"
            sx={{ position: 'relative', zIndex: 1 }}
          >
            {t('aboutSubtitle', 'We provide the best shopping experience for our customers')}
          </Typography>
        </Container>
      </Box>

      {/* Story Section */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              image="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt={t('ourStory', 'Our Story')}
              sx={{ height: '400px', borderRadius: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {t('ourStory', 'Our Story')}
            </Typography>
            <Typography variant="body1" paragraph>
              {t('storyDescription', 'Our journey began in 2020 with a mission to provide a unique shopping experience for our customers. We believe that online shopping should be easy and enjoyable for everyone. We work hard to offer high-quality products at competitive prices while ensuring excellent customer service.')}
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Store sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h4" gutterBottom>
                    1000+
                  </Typography>
                  <Typography variant="body1">{t('products', 'Products')}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Security sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h4" gutterBottom>
                    50+
                  </Typography>
                  <Typography variant="body1">{t('countries', 'Countries')}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Support sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h4" gutterBottom>
                    24/7
                  </Typography>
                  <Typography variant="body1">{t('support', 'Support')}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Star sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h4" gutterBottom>
                    4.8/5
                  </Typography>
                  <Typography variant="body1">{t('rating', 'Rating')}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
            <Typography variant="h4" gutterBottom>
              {t('ourMission', 'Our Mission')}
            </Typography>
            <Typography variant="body1" paragraph>
              {t('missionDescription', 'We strive to provide high-quality products at competitive prices while ensuring excellent customer service. We are committed to delivering a smooth and enjoyable shopping experience for our customers. We aim to be your first choice for online shopping.')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
            <CardMedia
              component="img"
              image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt={t('ourMission', 'Our Mission')}
              sx={{ height: '400px', borderRadius: 2 }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Values Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            {t('ourValues', 'Our Values')}
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Star sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    {t('quality', 'Quality')}
                  </Typography>
                  <Typography variant="body2">
                    {t('qualityDescription', 'We are committed to providing high-quality products that meet the highest standards')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <People sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    {t('customerService', 'Customer Service')}
                  </Typography>
                  <Typography variant="body2">
                    {t('customerServiceDescription', 'We put our customers first and provide them with an exceptional experience')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Lightbulb sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    {t('innovation', 'Innovation')}
                  </Typography>
                  <Typography variant="body2">
                    {t('innovationDescription', 'We constantly look for new ways to improve the shopping experience')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <TrendingUp sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    {t('growth', 'Growth')}
                  </Typography>
                  <Typography variant="body2">
                    {t('growthDescription', 'We work on continuous development and expansion of our services')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {t('ourTeam', 'Our Team')}
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
          {t('teamSubtitle', 'Meet the people who make everything possible')}
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {teamImages.map((image, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  image={image}
                  alt={`Team member ${index + 1}`}
                  sx={{ height: 300 }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t(`team${index + 1}Name`, `Team Member ${index + 1}`)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t(`team${index + 1}Role`, `Role ${index + 1}`)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default About; 