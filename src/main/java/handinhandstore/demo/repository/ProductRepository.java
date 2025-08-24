package handinhandstore.demo.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import handinhandstore.demo.model.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{
   List<Product> findAllByOrderByDonationPercentageDesc(Pageable pageable);
}
