package tn.esprit.similator.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import tn.esprit.similator.entity.Token;

public interface TokenRepository extends JpaRepository<Token, Long> {

    Optional<Token> findByToken(String token);
    
}
