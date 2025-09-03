package handinhandstore.demo.controller;

import handinhandstore.demo.dto.UpdateUserProfileRequestDTO;
import handinhandstore.demo.model.entity.User;
import handinhandstore.demo.service.UserProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserProfileController {

    private final UserProfileService userProfileService;

    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @PutMapping("/update-info/{id}")
    public ResponseEntity<User> updateUserProfile(
            @PathVariable Long id,
            @RequestBody UpdateUserProfileRequestDTO dto) {

        User updatedUser = userProfileService.updateUserProfile(id, dto);
        return ResponseEntity.ok(updatedUser);
    }
}
