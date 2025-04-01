import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import ReceiptIcon from '@mui/icons-material/Receipt';

const Orders = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Mock data - replace with actual data from your backend
  const orders = [
    {
      id: 'ORD001',
      date: '2024-03-15',
      total: 299.99,
      status: 'Delivered',
      items: 3,
    },
    {
      id: 'ORD002',
      date: '2024-03-10',
      total: 149.99,
      status: 'Processing',
      items: 2,
    },
    {
      id: 'ORD003',
      date: '2024-03-05',
      total: 199.99,
      status: 'Shipped',
      items: 1,
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'success';
      case 'processing':
        return 'warning';
      case 'shipped':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Order History
        </Typography>

        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      component={RouterLink}
                      to={`/orders/${order.id}`}
                      variant="outlined"
                      size="small"
                      startIcon={<ReceiptIcon />}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {orders.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <ReceiptIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Orders Found
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              You haven't placed any orders yet.
            </Typography>
            <Button
              component={RouterLink}
              to="/products"
              variant="contained"
              color="primary"
            >
              Start Shopping
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Orders; 