package handinhandstore.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;

import handinhandstore.demo.model.entity.PasswordResetToken;
import handinhandstore.demo.model.entity.User;
import handinhandstore.demo.repository.PasswordResetTokenRepository;
import handinhandstore.demo.service.AuthenticationService;
import handinhandstore.demo.service.EmailService;

@RestController
public class AuthenticationController {

    private final AuthenticationService authService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordResetTokenRepository tokenRepo;

    public AuthenticationController(AuthenticationService authService) {
        this.authService = authService;
    }

    @GetMapping("/getUserById")
    public User getById(@RequestParam Long id) {
        System.out.println("-----------------------------------------------------------------received id");
        return authService.getById(id); 
    }

    @GetMapping("/UserLogin")
    public boolean login(
            @RequestParam String email,
            @RequestParam String password
    ) {
        boolean isAuthenticated = authService.login(email, password);
        return isAuthenticated;
    }

    @PostMapping("/UserRegistration")
    public User register(@RequestBody User user) {
        LocalDateTime now = LocalDateTime.now();
        user.setCreatedAt(now);
        user.setUpdatedAt(now);
        return authService.userRegisteration(user);
    }

    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestParam String email) {
        String code = emailService.sendResetCode(email);

        // remove old tokens for this email
        tokenRepo.deleteByEmail(email);

        // save new token with 1 min expiry
        PasswordResetToken token = new PasswordResetToken(email, code, LocalDateTime.now().plusMinutes(1));
        tokenRepo.save(token);

        return "Reset code sent to " + email;
    }
}



