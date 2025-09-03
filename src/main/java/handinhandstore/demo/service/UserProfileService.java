package handinhandstore.demo.service;

import handinhandstore.demo.dto.UpdateUserProfileRequestDTO;
import handinhandstore.demo.model.entity.User;
import handinhandstore.demo.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class UserProfileService {

    private final UserRepository userRepository;

    public UserProfileService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public User updateUserProfile(Long userId, UpdateUserProfileRequestDTO dto) {
        // Fetch user or throw exception if not found
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        // Update fields (only if not null to allow partial updates)
        if (dto.getFullName() != null) user.setFullName(dto.getFullName());
        if (dto.getPhoneNumber() != null) user.setPhoneNumber(dto.getPhoneNumber());
        if (dto.getAddress() != null) user.setAddress(dto.getAddress());
        if (dto.getBio() != null) user.setBio(dto.getBio());

        // Update the updatedAt field manually (PreUpdate also works, but we ensure it here)
        user.setUpdatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }
}
