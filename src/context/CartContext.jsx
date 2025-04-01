import React, { createContext, useContext, useState, useEffect } from 'react';
import { productService } from '../services/api';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Initialize cartItems from localStorage on component mount
    const savedCart = localStorage.getItem('cart');
    try {
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error parsing cart:', error);
      return [];
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Save cart to localStorage and update UI whenever it changes
  useEffect(() => {
    const cartJson = JSON.stringify(cartItems);
    localStorage.setItem('cart', cartJson);
    // Dispatch custom event for immediate update
    window.dispatchEvent(
      new CustomEvent('customStorageChange', {
        detail: { key: 'cart', value: cartJson }
      })
    );
  }, [cartItems]);

  const addToCart = async (productId) => {
    try {
      setLoading(true);
      const response = await productService.getProductById(productId);
      const product = response.data;

      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === productId);
        const newItems = existingItem
          ? prevItems.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...prevItems, { ...product, quantity: 1 }];
        
        // Dispatch custom event immediately after updating cart
        window.dispatchEvent(
          new CustomEvent('customStorageChange', {
            detail: { key: 'cart', value: JSON.stringify(newItems) }
          })
        );
        
        return newItems;
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== productId);
      // Dispatch custom event immediately after removing item
      window.dispatchEvent(
        new CustomEvent('customStorageChange', {
          detail: { key: 'cart', value: JSON.stringify(newItems) }
        })
      );
      return newItems;
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      // Dispatch custom event immediately after updating quantity
      window.dispatchEvent(
        new CustomEvent('customStorageChange', {
          detail: { key: 'cart', value: JSON.stringify(newItems) }
        })
      );
      return newItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    // Dispatch custom event immediately after clearing cart
    window.dispatchEvent(
      new CustomEvent('customStorageChange', {
        detail: { key: 'cart', value: '[]' }
      })
    );
  };

  const value = {
    cartItems,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}; 