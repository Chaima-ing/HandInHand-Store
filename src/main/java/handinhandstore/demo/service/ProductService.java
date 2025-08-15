package handinhandstore.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import handinhandstore.demo.repository.ProductRepository;
import handinhandstore.demo.model.entity.Product;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public void saveProduct(Product product) {
        productRepository.save(product);
    } 

    public void deleteProduct(Long id){
       productRepository.deleteById(id);
    }

     public Product updateProduct(Long id, Product updatedProduct) {
        Optional<Product> existingProductOpt = productRepository.findById(id);

        if (existingProductOpt.isEmpty()) {
            throw new RuntimeException("Product not found with id: " + id);
        }

        Product existingProduct = existingProductOpt.get();

        // Update fields
        existingProduct.setTitle(updatedProduct.getTitle());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setPriceType(updatedProduct.getPriceType());
        existingProduct.setFixedPrice(updatedProduct.getFixedPrice());
        existingProduct.setCategory(updatedProduct.getCategory());
        existingProduct.setImageUrl(updatedProduct.getImageUrl());
        existingProduct.setStatus(updatedProduct.getStatus());

        return productRepository.save(existingProduct);
    }
}
