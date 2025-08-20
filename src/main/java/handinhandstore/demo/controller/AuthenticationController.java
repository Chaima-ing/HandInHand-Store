package handinhandstore.demo.controller;

import org.springframework.web.bind.annotation.*;

import handinhandstore.demo.model.entity.User;
import handinhandstore.demo.service.AuthenticationService;

@RestController
public class AuthenticationController {

    private final AuthenticationService authService;

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
        return authService.userRegisteration(user);
    }
}



