import React, { createContext, useContext, useState, useEffect } from 'react';

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
        // Load cart from localStorage on initialization
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);

            if (existingItem) {
                // check stock
                if (existingItem.quantity + quantity > product.stockQuantity) {
                    alert("❌ الكمية المطلوبة غير متوفرة");
                    return prevItems;
                }
                // If item already exists, update quantity
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                if (quantity > product.stockQuantity) {
                    alert("❌ الكمية المطلوبة غير متوفرة");
                    return prevItems;
                }
                // If new item, add to cart
                return [...prevItems, { ...product, quantity }];
            }
        });
    };
    {/*
    const getDonationTotal = () => {
        return cartItems.reduce(
            (total, item) =>
                total +
                ((item.donationPercentage || 0) / 100) * item.price * item.quantity,
            0
        );
    };*/}

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.fixedPrice * item.quantity), 0);
    };

    const getCartItemsCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const isInCart = (productId) => {
        return cartItems.some(item => item.id === productId);
    };

    const getItemQuantity = (productId) => {
        const item = cartItems.find(item => item.id === productId);
        return item ? item.quantity : 0;
    };

    const validateCart = () => {
        if (cartItems.length === 0) {
            return {
                isValid: false,
                message: "Your cart is empty. Please add some items before checkout.",
                errors: ["EMPTY_CART"]
            };
        }

        const validationErrors = [];
        const invalidItems = [];

        // Validate each item in the cart
        cartItems.forEach(item => {
            // Check if item has required properties
            if (!item.id || !item.title || !item.fixedPrice) {
                validationErrors.push("INVALID_ITEM_DATA");
                invalidItems.push(item.title || `Item ${item.id}`);
                return;
            }

            // Check if quantity is valid
            if (!item.quantity || item.quantity < 1) {
                validationErrors.push("INVALID_QUANTITY");
                invalidItems.push(item.title);
                return;
            }

            // Check stock availability (if stockQuantity exists)
            if (item.stockQuantity !== undefined && item.quantity > item.stockQuantity) {
                validationErrors.push("INSUFFICIENT_STOCK");
                invalidItems.push(`${item.title} (requested: ${item.quantity}, available: ${item.stockQuantity})`);
                return;
            }

            // Check if price is valid
            if (item.fixedPrice <= 0) {
                validationErrors.push("INVALID_PRICE");
                invalidItems.push(item.title);
                return;
            }
        });

        // Check minimum order value (optional - adjust as needed)
        const minOrderValue = 10.00; // Set your minimum order value
        const cartTotal = getCartTotal();
        if (cartTotal < minOrderValue) {
            validationErrors.push("MINIMUM_ORDER_NOT_MET");
        }

        // Check maximum order value (optional - adjust as needed)
        const maxOrderValue = 10000.00; // Set your maximum order value
        if (cartTotal > maxOrderValue) {
            validationErrors.push("MAXIMUM_ORDER_EXCEEDED");
        }

        // If there are validation errors, return them
        if (validationErrors.length > 0) {
            let message = "Cart validation failed: ";

            if (validationErrors.includes("INVALID_ITEM_DATA")) {
                message += "Some items have invalid data. ";
            }
            if (validationErrors.includes("INVALID_QUANTITY")) {
                message += "Some items have invalid quantities. ";
            }
            if (validationErrors.includes("INSUFFICIENT_STOCK")) {
                message += "Some items are out of stock or have insufficient quantity. ";
            }
            if (validationErrors.includes("INVALID_PRICE")) {
                message += "Some items have invalid prices. ";
            }
            if (validationErrors.includes("MINIMUM_ORDER_NOT_MET")) {
                message += `Minimum order value is $${minOrderValue}. Current total: $${cartTotal.toFixed(2)}. `;
            }
            if (validationErrors.includes("MAXIMUM_ORDER_EXCEEDED")) {
                message += `Maximum order value is $${maxOrderValue}. Current total: $${cartTotal.toFixed(2)}. `;
            }

            return {
                isValid: false,
                message: message.trim(),
                errors: validationErrors,
                invalidItems: invalidItems,
                cartTotal: cartTotal
            };
        }

        // Save valid cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cartItems));

        // Cart is valid
        return {
            isValid: true,
            message: "Cart is valid and ready for checkout.",
            errors: [],
            invalidItems: [],
            cartTotal: cartTotal,
            itemCount: getCartItemsCount()
        };
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,
        isInCart,
        getItemQuantity,
        validateCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
