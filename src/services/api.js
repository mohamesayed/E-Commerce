import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productService = {
  getAllProducts: () => api.get('/products'),
  getProduct: (id) => api.get(`/products/${id}`),
  getProductById: (id) => api.get(`/products/${id}`),
  getProductsByCategory: (category) => api.get(`/products/category/${category}`),
  getAllCategories: () => api.get('/products/categories'),
};

export const cartService = {
  getCart: () => api.get('/carts/1'),
  addToCart: (productId, quantity) => api.post('/carts', {
    userId: 1,
    date: new Date(),
    products: [{ productId, quantity }],
  }),
  updateCart: (cartId, products) => api.put(`/carts/${cartId}`, {
    userId: 1,
    date: new Date(),
    products,
  }),
};

export const userService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/users', userData),
  getUser: (id) => api.get(`/users/${id}`),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
};

export default api; 