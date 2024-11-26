package tn.esprit.similator.dtos;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ResetPasswordRequest {
    private String phonenumber;
    private String newPassword;
}