package tn.esprit.similator.dtos;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PasswordVerificationRequest {

    private Long userId;

    private String typedPassword;
    
}
