package handinhandstore.demo.service;

import handinhandstore.demo.model.entity.*;
import handinhandstore.demo.model.enums.ProductStatus;
import handinhandstore.demo.repository.OrderRepository;
import handinhandstore.demo.repository.ProductRepository;
import handinhandstore.demo.repository.UserRepository;
import handinhandstore.demo.model.enums.OrderStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Order createOrder(Order order, Long buyerId) {
        // Validate buyer exists
        Optional<User> buyerOptional = userRepository.findById(buyerId);
        if (!buyerOptional.isPresent()) {
            throw new RuntimeException("Buyer not found with ID: " + buyerId);
        }
        
        User buyer = buyerOptional.get();
        order.setBuyer(buyer);
        
        // Calculate totals and validate products
        BigDecimal totalAmount = BigDecimal.ZERO;
        BigDecimal totalDonation = BigDecimal.ZERO;
        
        for (OrderItem item : order.getItems()) {
            Product product = item.getProduct();
            
            // Validate product exists and is available
            if (product == null || product.getStatus() != ProductStatus.AVAILABLE) {
                throw new RuntimeException("Product not available: " + 
                    (product != null ? product.getTitle() : "Unknown"));
            }
            
            // Use product's donation percentage or seller's default
            BigDecimal donationPercentage = product.getDonationPercentage();
            if (donationPercentage == null) {
                donationPercentage = product.getSeller().getDefaultDonationPercentage();
            }
            
            // Calculate item price and donation
            BigDecimal itemPrice = BigDecimal.valueOf(product.getFixedPrice());
            BigDecimal itemTotal = itemPrice.multiply(BigDecimal.valueOf(item.getQuantity()));
            BigDecimal itemDonation = itemTotal.multiply(donationPercentage)
                                              .divide(BigDecimal.valueOf(100));
            
            // Set item details
            item.setPrice(itemPrice);
            item.setDonationPercentage(donationPercentage);
            item.setOrder(order);
            
            // Update totals
            totalAmount = totalAmount.add(itemTotal);
            totalDonation = totalDonation.add(itemDonation);
            
            // Update product status to sold
            product.setStatus(ProductStatus.SOLD);
            productRepository.save(product);
        }
        
        // Set order totals
        order.setTotalAmount(totalAmount);
        order.setDonationAmount(totalDonation);
        
        return orderRepository.save(order);
    }

    @Transactional
    public Order updateOrderStatus(Long orderId, OrderStatus newStatus) {
        Optional<Order> orderOptional = orderRepository.findById(orderId);
        if (!orderOptional.isPresent()) {
            throw new NoSuchElementException("Order not found with ID: " + orderId);
        }
    
        Order order = orderOptional.get();
        order.setStatus(newStatus);
    
        return orderRepository.save(order);
    }

    @Transactional
    public Order updateOrder(Long orderId, Order updatedOrder) {
        Optional<Order> existingOrderOptional = orderRepository.findById(orderId);
        if (!existingOrderOptional.isPresent()) {
            throw new NoSuchElementException("Order not found with ID: " + orderId);
        }
    
        Order existingOrder = existingOrderOptional.get();
    
        // Update fields that can be modified
        if (updatedOrder.getShippingAddress() != null) {
            existingOrder.setShippingAddress(updatedOrder.getShippingAddress());
        }
    
        if (updatedOrder.getPaymentMethod() != null) {
            existingOrder.setPaymentMethod(updatedOrder.getPaymentMethod());
        }
    
        if (updatedOrder.getPaymentStatus() != null) {
            existingOrder.setPaymentStatus(updatedOrder.getPaymentStatus());
        }
    
        if (updatedOrder.getStatus() != null) {
            existingOrder.setStatus(updatedOrder.getStatus());
        }
    
        return orderRepository.save(existingOrder);
    }

    public List<Order> getOrdersByBuyer(Long buyerId) {
        return orderRepository.findByBuyerId(buyerId);
    }

    public Optional<Order> getOrderById(Long orderId) {
        return orderRepository.findById(orderId);
    }
}