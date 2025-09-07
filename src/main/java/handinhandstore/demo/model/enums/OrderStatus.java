package handinhandstore.demo.model.enums;

public enum OrderStatus {
    PENDING,    // Order placed but not yet processed
    CONFIRMED,  // Order confirmed by seller
    SHIPPED,    // Order has been shipped
    DELIVERED,  // Order has been delivered
    CANCELLED   // Order was cancelled
}