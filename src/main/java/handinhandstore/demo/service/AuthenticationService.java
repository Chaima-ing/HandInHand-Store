package handinhandstore.demo.service;

import org.springframework.stereotype.Service;
import java.util.Optional;

import handinhandstore.demo.model.entity.User;
import handinhandstore.demo.repository.AuthenticationRepository;
import handinhandstore.demo.repository.PasswordResetTokenRepository;
import jakarta.transaction.Transactional;

@Service
public class AuthenticationService {
    private final AuthenticationRepository authRepo;
    private final PasswordResetTokenRepository tokenRepo;

    public AuthenticationService(AuthenticationRepository authRepo, PasswordResetTokenRepository tokenRepo) {
        this.authRepo = authRepo;
        this.tokenRepo = tokenRepo;
    }

    public User userRegisteration(User user) {
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

    public boolean login(String email, String password) {
        Optional<User> userOptional = authRepo.findUserByEmailAndPassword(email, password);
        return userOptional.isPresent();
    }


    @Transactional
    public void updatePassword(String email, String newPassword) {
        Optional<User> optUser = authRepo.findByEmail(email);
        if (optUser.isPresent()) {
            User user = optUser.get();
            user.setPassword(newPassword);
            authRepo.save(user);
        }
        tokenRepo.deleteByEmail(email);
    }
}
