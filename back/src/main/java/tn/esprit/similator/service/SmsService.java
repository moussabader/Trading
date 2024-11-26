package tn.esprit.similator.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.rest.api.v2010.account.ValidationRequest;
import com.twilio.type.PhoneNumber;

import jakarta.annotation.PostConstruct;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import tn.esprit.similator.entity.Token;
import tn.esprit.similator.entity.User;
import tn.esprit.similator.repository.TokenRepository;
import tn.esprit.similator.repository.UserRepo;

@Service
@RequiredArgsConstructor
public class SmsService {

    @Value("${twilio.account_sid}")
    private String accountSid;
    @Value("${twilio.auth_token}")
    private String authToken;
    @Value("${twilio.phone_number}")
    private String twilioPhoneNumber;
    @Autowired
    private final AuthenticationService authService;
    private final TokenRepository tokenRepository;
    private final UserRepo userRepo;

    @PostConstruct
    private void initTwilio() {
        Twilio.init(accountSid, authToken);
    }

    public void sendSms(String to) {
        System.out.println(to);
        var user = userRepo.findByPhonenumber(to)
                                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        String code = authService.generateAndSaveActivationToken(user);
        String message = "Your reset code is: " + code;
        Message.creator(new PhoneNumber(to), new PhoneNumber(twilioPhoneNumber), message).create();
    }

    public Boolean verifyCode(String code) {
        Optional<Token> savedCode = tokenRepository.findByToken(code);
        // if code invalid
        if (!savedCode.isPresent()) {
            return false;
        }
        // if code expired
        if(LocalDateTime.now().isAfter(savedCode.get().getExpiredAt())) {
            sendSms(savedCode.get().getUser().getPhonenumber());
            return false;
        }
        savedCode.get().setValidatedAt(LocalDateTime.now());
        return true;
    }
}
