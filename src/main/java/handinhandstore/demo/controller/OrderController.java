package handinhandstore.demo.controller;

import handinhandstore.demo.dto.OrderRequest;
import handinhandstore.demo.dto.OrderResponse;
import handinhandstore.demo.dto.OrderItemRequest;
import handinhandstore.demo.dto.OrderItemResponse;
import handinhandstore.demo.model.entity.Order;
import handinhandstore.demo.model.entity.OrderItem;
import handinhandstore.demo.model.entity.Product;
import handinhandstore.demo.service.OrderService;
import handinhandstore.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest, 
                                        @RequestParam Long buyerId) {
        try {
            // Convert OrderRequest to Order entity
            Order order = new Order();
            order.setShippingAddress(orderRequest.getShippingAddress());
            order.setPaymentMethod(orderRequest.getPaymentMethod());
            
            // Create order items
            List<OrderItem> orderItems = new ArrayList<>();
            for (OrderItemRequest itemRequest : orderRequest.getItems()) {
                Optional<Product> productOptional = productService.getProductById(itemRequest.getProductId());
                if (!productOptional.isPresent()) {
                    return ResponseEntity.badRequest().body("Product not found: " + itemRequest.getProductId());
                }
                
                Product product = productOptional.get();
                OrderItem orderItem = new OrderItem();
                orderItem.setProduct(product);
                orderItem.setQuantity(itemRequest.getQuantity());
                
                orderItems.add(orderItem);
            }
            
            order.setItems(orderItems);
            
            // Create the order
            Order createdOrder = orderService.createOrder(order, buyerId);
            
            // Convert to response DTO
            OrderResponse response = convertToResponse(createdOrder);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating order: " + e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderResponse>> getOrdersByUser(@PathVariable Long userId) {
        List<Order> orders = orderService.getOrdersByBuyer(userId);
        List<OrderResponse> responses = orders.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<?> getOrderById(@PathVariable Long orderId) {
        Optional<Order> orderOptional = orderService.getOrderById(orderId);
        if (!orderOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        OrderResponse response = convertToResponse(orderOptional.get());
        return ResponseEntity.ok(response);
    }

    private OrderResponse convertToResponse(Order order) {
        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        response.setBuyerId(order.getBuyer().getId());
        response.setBuyerName(order.getBuyer().getFullName());
        response.setTotalAmount(order.getTotalAmount());
        response.setDonationAmount(order.getDonationAmount());
        response.setStatus(order.getStatus());
        response.setOrderDate(order.getOrderDate());
        response.setShippingAddress(order.getShippingAddress());
        response.setPaymentMethod(order.getPaymentMethod());
        response.setPaymentStatus(order.getPaymentStatus());
        
        // Convert order items
        List<OrderItemResponse> itemResponses = new ArrayList<>();
        for (OrderItem item : order.getItems()) {
            OrderItemResponse itemResponse = new OrderItemResponse();
            itemResponse.setProductId(item.getProduct().getId());
            itemResponse.setProductName(item.getProduct().getTitle());
            itemResponse.setQuantity(item.getQuantity());
            itemResponse.setPrice(item.getPrice());
            itemResponse.setDonationPercentage(item.getDonationPercentage());
            
            itemResponses.add(itemResponse);
        }
        
        response.setItems(itemResponses);
        return response;
    }
}