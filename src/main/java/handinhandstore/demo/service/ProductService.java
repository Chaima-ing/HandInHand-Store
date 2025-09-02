package handinhandstore.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
        existingProduct.setCategories(updatedProduct.getCategories());
        existingProduct.setStatus(updatedProduct.getStatus());

        return productRepository.save(existingProduct);
    }

    public List<Product> getMostFeaturedDonationProducts(int limit) {
        Pageable pageable = PageRequest.of(0, limit); // first page, with "limit" items
        return productRepository.findAllByOrderByDonationPercentageDesc(pageable);
    }

     public Product findById(Long id) {
        Optional<Product> productOptional = productRepository.findById(id);

        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            return product;
        } else {
            return null; // or throw a custom exception
        }
    }

    public  List<Product> findAllProducts (){
        List<Product> listProducts = productRepository.findAllProducts();
        return listProducts;
    }

    public List<Product> searchProducts(String keyword) {
        return productRepository.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(keyword, keyword);
    }

}
