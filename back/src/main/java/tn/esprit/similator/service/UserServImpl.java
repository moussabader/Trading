package tn.esprit.similator.service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tn.esprit.similator.entity.User;
import tn.esprit.similator.repository.UserRepo;

import java.util.List;

@Service
@AllArgsConstructor
public class UserServImpl implements IUserService {

    @Autowired
    private UserRepo userRepo;
    private PasswordEncoder passwordEncoder;


    @Override
    public User addUserAndAssignPortfolio(User user) {
        return userRepo.save(user);
    }

    @Override
    public List<User> retrieveAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public User retrieveUser(Long userId) {
        return userRepo.findById(userId).orElse(null);
    }

    @Override
    public void removeUser(Long userId) {
        userRepo.deleteById(userId);
    }

    @Override
    public User modifyUser(User user) {
        User updatedUser = userRepo.findById(user.getId()).orElse(null);
        updatedUser.setFullname(user.getFullname());
        updatedUser.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(updatedUser);
    }

    @Override
    public User changeStatus(Boolean status, Long userId) {
        User updatedUser = userRepo.findById(userId).orElse(null);
        updatedUser.setEnabled(status);
        return userRepo.save(updatedUser);
    }

    // @Override
    // public User registerUser(User user) throws Exception {
    //     if (userRepo.findByEmail(user.getEmail()).isPresent()) {
    //         throw new Exception("Email already in use.");
    //     }
    //     if (userRepo.findByUsername(user.getUsername()).isPresent()) {
    //         throw new Exception("Username already taken.");
    //     }
    //     user.setPassword(user.getPassword()); // Just save the plain password or hash it yourself
    //     user.setRole(UserRole.CUSTOMER);
    //     user.setEnabled(true);  // Activer automatiquement pour simplifier
    //     return userRepo.save(user);
    // }

    // @Override
    // public User loginUser(String email, String password) throws Exception {
    //     Optional<User> userOpt = userRepo.findByEmail(email);
    //     if (userOpt.isEmpty()) {
    //         throw new Exception("User not found.");
    //     }
    //     User user = userOpt.get();
    //     if (!password.equals(user.getPassword())) {  // Vérifie si le mot de passe correspond
    //         throw new Exception("Invalid password.");
    //     }
    //     if (!user.isEnabled()) {
    //         throw new Exception("User account is not activated.");
    //     }
    //     return user;  // Login réussi
    // }
}