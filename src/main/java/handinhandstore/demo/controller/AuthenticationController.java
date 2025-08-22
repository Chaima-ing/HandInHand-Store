package handinhandstore.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;

import handinhandstore.demo.model.entity.User;
import handinhandstore.demo.service.AuthenticationService;
import handinhandstore.demo.service.EmailService;
import handinhandstore.demo.service.PasswordResetService;

@RestController
public class AuthenticationController {

    private final AuthenticationService authService;
    private final PasswordResetService resetService;

    @Autowired
    private EmailService emailService;

    public AuthenticationController(AuthenticationService authService, PasswordResetService resetService) {
        this.authService = authService;
        this.resetService = resetService;
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

        // Save token with transaction
        resetService.createOrUpdateResetToken(email, code);

        return "Reset code sent to " + email;
    }
}



