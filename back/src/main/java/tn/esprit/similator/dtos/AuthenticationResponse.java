package tn.esprit.similator.dtos;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import tn.esprit.similator.entity.User;

@Getter
@Setter
@Builder
public class AuthenticationResponse {
    private User user;
    private String token;

}
