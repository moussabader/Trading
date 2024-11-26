package tn.esprit.similator.config;

import java.util.Optional;
import org.springframework.security.core.Authentication;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import tn.esprit.similator.entity.User;

public class ApplicationAuditAware implements AuditorAware<Long>{

    @Override
    public Optional<Long> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || 
            !authentication.isAuthenticated() || 
            authentication instanceof AnonymousAuthenticationToken ) {
            return Optional.empty();
        }
        User userPrincipal = (User) authentication.getPrincipal();
        return Optional.ofNullable(userPrincipal.getId());
    }
    
}
