package tn.esprit.similator.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.ValidationRequest;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import tn.esprit.similator.dtos.AuthenticationRequest;
import tn.esprit.similator.dtos.AuthenticationResponse;
import tn.esprit.similator.dtos.RegistrationRequest;
import tn.esprit.similator.entity.EmailTemplateName;
import tn.esprit.similator.entity.Token;
import tn.esprit.similator.entity.User;
import tn.esprit.similator.entity.UserRole;
import tn.esprit.similator.repository.RoleRepository;
import tn.esprit.similator.repository.TokenRepository;
import tn.esprit.similator.repository.UserRepo;
import tn.esprit.similator.security.JwtService;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepo userRepository;
    private final TokenRepository tokenRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final MailingService emailService;
    @Value("${application.mailing.frontend.activation-url}")
    private String activationUrl;
    @Value("${twilio.account_sid}")
    private String accountSid;
    @Value("${twilio.auth_token}")
    private String authToken;

    public void register( RegistrationRequest request) throws MessagingException {

        // Assign a defauld role : UserRole
        var userRole = roleRepository.findByName(UserRole.CUSTOMER.name())
                                        .orElseThrow(
                                            () -> new IllegalStateException("ROLE CUSTOMER was not initialized")
                                            );
        
        // Create User object and save it
        var user = User.builder()
                            .fullname(request.getUsername())
                            .email(request.getEmail())
                            .password(passwordEncoder.encode(request.getPassword()))
                            .phonenumber(request.getPhonenumber())
                            .accountLocked(false)
                            .enabled(false)
                            .roles(List.of(userRole))
                            .build();
        userRepository.save(user);
        
        // Send validation email
        sendValidationEmail(user);
    }

    private void sendValidationEmail(User user) throws MessagingException {
        var newToken = generateAndSaveActivationToken(user);
        emailService.sendEmail(
                        user.getEmail(), 
                        user.getFullname(), 
                        EmailTemplateName.ACTIVATE_ACCOUNT, 
                        activationUrl, 
                        newToken, 
                        "Account activation");
    }
    public String generateAndSaveActivationToken(User user) {
        String generatedToken = generateActivationCode(6);
        var token = Token.builder()
                            .token(generatedToken)
                            .createdAt(LocalDateTime.now())
                            .expiredAt(LocalDateTime.now().plusMinutes(15))
                            .user(user)
                            .build();                
        tokenRepository.save(token);
        return generatedToken;
    }

    private String generateActivationCode(int length) {
        String characters = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();

        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(characters.length()); // random index from 0 to 9
            codeBuilder.append(characters.charAt(randomIndex));
        }

        return codeBuilder.toString();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var auth = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(), 
                request.getPassword()
                ));
        var claims = new HashMap<String, Object>();
        var user = ((User)auth.getPrincipal());
        claims.put("username", user.getUsername());
        var jwtToken = jwtService.generateToken(claims, user);
        return AuthenticationResponse.builder()
                                        .user(user)
                                        .token(jwtToken)
                                        .build();
    }

    // @Transactional
    public void activateAccount(String token) throws MessagingException {
        Token savedToken = tokenRepository.findByToken(token)
                                                // todo - Exception has to be defined
                                                .orElseThrow(() -> new RuntimeException("Invalid token"));
        if(LocalDateTime.now().isAfter(savedToken.getExpiredAt())) {
            sendValidationEmail(savedToken.getUser());
            throw new RuntimeException("Activation token has expired. A new token has been sent to the same email adress.");
        }
        var user = userRepository.findById(savedToken.getUser().getId())
                                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setEnabled(true);
        userRepository.save(user);
        savedToken.setValidatedAt(LocalDateTime.now());
        tokenRepository.save(savedToken);
    }

    public User resetPassword(String phoneNumber, String newPassword) {
        var user = userRepository.findByPhonenumber(phoneNumber)
                                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setPassword(passwordEncoder.encode(newPassword));
        return userRepository.save(user);
    }
}
