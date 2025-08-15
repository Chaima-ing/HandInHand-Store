package handinhandstore.demo.controller;

import java.time.LocalDateTime;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

import handinhandstore.demo.service.ProductService;
import handinhandstore.demo.dto.ProductRequest;
import handinhandstore.demo.model.entity.Product;
import handinhandstore.demo.model.entity.User;
import handinhandstore.demo.model.enums.PriceType;

@RestController
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @PostMapping("/Add-Product")
    public ResponseEntity<Map<String, Long>> publishProduct(
        @RequestPart("productRequest") ProductRequest productRequest
    ) {
        try {
        Product product = new Product();
        product.setTitle(productRequest.getTitle());
        product.setDescription(productRequest.getDescription());
        product.setPriceType(productRequest.getPriceType());
        product.setFixedPrice(productRequest.getPriceType() == PriceType.FIXED ? productRequest.getFixedPrice() : null);
        product.setCategory(productRequest.getCategory());
        product.setStatus(productRequest.getStatus());
        product.setCreatedAt(LocalDateTime.now());

        // Set seller (only ID from request)
        User seller = new User();
        seller.setId(productRequest.getSellerId());
        product.setSeller(seller);

        productService.saveProduct(product);

        Map<String, Long> response = new HashMap<>();
        response.put("productId", product.getId());
        return ResponseEntity.ok(response);

    } catch (Exception e) {
        e.printStackTrace();
        Map<String, Long> errorResponse = new HashMap<>();
        errorResponse.put("error", -1L);
        return ResponseEntity.status(500).body(errorResponse);
    }
    }

}


