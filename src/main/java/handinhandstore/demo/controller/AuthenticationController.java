package handinhandstore.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.Map;

import handinhandstore.demo.model.entity.User;
import handinhandstore.demo.service.AuthenticationService;
import handinhandstore.demo.service.EmailService;
import handinhandstore.demo.service.PasswordResetService;
import handinhandstore.demo.repository.PasswordResetTokenRepository;

@RestController
public class AuthenticationController {

    private final AuthenticationService authService;
    private final PasswordResetService resetService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordResetTokenRepository tokenRepo;

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
    public String forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        System.out.println("/n/n/n/n*/n*/n***Forget Password");
        System.out.println("The email is :"+email);
        String code = emailService.sendResetCode(email);

        // Save token with transaction
        resetService.createOrUpdateResetToken(email, code);

        return "Reset code sent to " + email;
    }

    @PostMapping("/verify-code")
    public String verifyCode(@RequestParam String email, @RequestParam String code) {
        return tokenRepo.findByEmailAndCode(email, code)
                .filter(token -> token.getExpiresAt().isAfter(LocalDateTime.now()))
                .map(token -> "Code verified. You can reset your password.")
                .orElse("Invalid or expired code.");
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestParam String email,
                                @RequestParam String code,
                                @RequestParam String newPassword) {
        return tokenRepo.findByEmailAndCode(email, code)
                .filter(token -> token.getExpiresAt().isAfter(LocalDateTime.now()))
                .map(token -> {
                    // Reset password via your service
                    authService.updatePassword(email, newPassword);

                    // remove used token
                    tokenRepo.delete(token);

                    return "Password reset successful!";
                })
                .orElse("Invalid or expired code.");
    }
}



