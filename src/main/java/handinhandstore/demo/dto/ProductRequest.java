package handinhandstore.demo.dto;

import handinhandstore.demo.model.enums.PriceType;
import handinhandstore.demo.model.enums.ProductStatus;

public class ProductRequest {
    private Long sellerId;
    private String title;
    private String description;
    private PriceType priceType; // FIXED or AUCTION
    private Double fixedPrice;
    private String category;
    private ProductStatus status; // AVAILABLE, SOLD, REMOVED

    public Long getSellerId() {
        return sellerId;
    }

    public void setSellerId(Long sellerId) {
        this.sellerId = sellerId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public PriceType getPriceType() {
        return priceType;
    }

    public void setPriceType(PriceType priceType) {
        this.priceType = priceType;
    }

    public Double getFixedPrice() {
        return fixedPrice;
    }

    public void setFixedPrice(Double fixedPrice) {
        this.fixedPrice = fixedPrice;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public ProductStatus getStatus() {
        return status;
    }

    public void setStatus(ProductStatus status) {
        this.status = status;
    }
}

