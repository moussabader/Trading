package tn.esprit.similator.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import tn.esprit.similator.dtos.PasswordVerificationRequest;
import tn.esprit.similator.entity.User;
import tn.esprit.similator.service.IUserService;

import java.util.List;

@Tag(name = "User class")
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {

    @Autowired
    private IUserService userServ;
    private PasswordEncoder passwordEncoder;


    @GetMapping("/get-all-users")
    public List<User> getAllUsers() {
        return userServ.retrieveAllUsers();
    }

    @GetMapping("/get-user/{userId}")
    public User getUserById(@PathVariable Long userId) {
        return userServ.retrieveUser(userId);
    }

    @PostMapping("/add-user-and-assign-portfolio")
    public User addUserAndAssignPortfolio(@RequestBody User user) {
        return userServ.addUserAndAssignPortfolio(user);
    }

    @PutMapping("/modify-user")
    public User modifyUser(@RequestBody User user) {
        return userServ.modifyUser(user);
    }

    @DeleteMapping("/remove-user/{userId}")
    public void removeUser(@PathVariable Long userId) {
        userServ.removeUser(userId);
    }

    @PostMapping("/verify-password")
    public ResponseEntity<Boolean> verifyPassword(@RequestBody PasswordVerificationRequest request) {
    User user = userServ.retrieveUser(request.getUserId());
    boolean isValid = passwordEncoder.matches(request.getTypedPassword(), user.getPassword());
    return ResponseEntity.ok(isValid);
    }
    @PutMapping("/change-status")
    public ResponseEntity<User> changeStatus(@RequestParam Boolean status, @RequestParam Long userId ) {
        return ResponseEntity.ok(userServ.changeStatus(status, userId));
    }

    // @PostMapping("/register")
    // public ResponseEntity<String> registerUser(@RequestBody User user) {
    //     try {
    //         userServ.registerUser(user);
    //         return ResponseEntity.ok("Registration successful. Please check your email to confirm.");
    //     } catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    //     }
    // }

    // @PostMapping("/login")
    // public ResponseEntity<User> loginUser(@RequestBody Map<String, String> loginData) {
    //     try {
    //         String email = loginData.get("email");
    //         String password = loginData.get("password");
    //         User userAuth = userServ.loginUser(email, password);
    //         return ResponseEntity.ok(userAuth);
    //     } catch (Exception e) {
    //         return ResponseEntity.status(BAD_REQUEST).build();
    //     }
    // }
}