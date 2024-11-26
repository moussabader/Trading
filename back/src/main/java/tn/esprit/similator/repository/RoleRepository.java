package tn.esprit.similator.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.similator.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(String roleName);
    
}

