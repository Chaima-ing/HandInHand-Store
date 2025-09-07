package handinhandstore.demo.controller;

import handinhandstore.demo.dto.ChangePasswordRequestDTO;
import handinhandstore.demo.dto.UpdateUserProfileRequestDTO;
import handinhandstore.demo.model.entity.User;
import handinhandstore.demo.service.UserProfileImageService;
import handinhandstore.demo.service.UserProfileService;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/users")
public class UserProfileController {

    private final UserProfileService userProfileService;
    private final UserRepository userRepository;

    public UserProfileController(UserProfileService userProfileService, UserRepository userRepository) {
        this.userProfileService = userProfileService;
        this.userRepository = userRepository;
    }

    @PatchMapping("/{userId}/change-password")
    public ResponseEntity<?> changePassword(
            @PathVariable Long userId,
            @RequestBody ChangePasswordRequestDTO dto) {
        try {
            userProfileService.changePassword(userId, dto);

            User updatedUser = userRepository.findById(userId).orElseThrow();
            updatedUser.setPasswordUpdatedAt(LocalDateTime.now());
            userRepository.save(updatedUser);

            return ResponseEntity.ok(Map.of(
                "message", "Password updated successfully",
                "lastUpdated", updatedUser.getPasswordUpdatedAt()
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
}
