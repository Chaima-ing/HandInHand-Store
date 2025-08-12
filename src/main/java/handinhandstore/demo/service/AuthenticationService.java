package handinhandstore.demo.service;

import org.springframework.stereotype.Service;
import java.util.Optional;

import handinhandstore.demo.model.entity.User;
import handinhandstore.demo.repository.AuthenticationRepository;

@Service
public class AuthenticationService {
    private final AuthenticationRepository authRepo;

    public AuthenticationService(AuthenticationRepository authRepo) {
        this.authRepo = authRepo;
    }

    public User register(User user) {
        return authRepo.save(user);
    }

    public User getById(Long id) {
        Optional<User> userOptional = authRepo.findById(id);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            System.out.println("-------------------------------User found: " );
            return user;
        } else {
            System.out.println("-------------------------------User NOT found");
            return null; // or throw a custom exception
        }
    }

    public boolean login(Long id, String password) {
        Optional<User> userOptional = authRepo.findUserByIdAndPassword(id, password);
        return userOptional.isPresent();
    }
}
