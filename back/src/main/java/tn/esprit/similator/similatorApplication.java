package tn.esprit.similator;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.crypto.password.PasswordEncoder;

import tn.esprit.similator.entity.Role;
import tn.esprit.similator.entity.User;
import tn.esprit.similator.entity.UserRole;
import tn.esprit.similator.repository.RoleRepository;
import tn.esprit.similator.repository.UserRepo;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableAsync
public class similatorApplication {

	public static void main(String[] args) {
		SpringApplication.run(similatorApplication.class, args);
	}

	@Bean
	public CommandLineRunner runner(RoleRepository roleRepository, UserRepo userRepo, PasswordEncoder passwordEncoder) {
		return args -> {
			if (roleRepository.findByName(UserRole.CUSTOMER.name()).isEmpty()) {
				roleRepository.save(
						Role.builder().name(UserRole.CUSTOMER.name()).build());
			}
			if (roleRepository.findByName(UserRole.ADMIN.name()).isEmpty()) {
				roleRepository.save(
						Role.builder().name(UserRole.ADMIN.name()).build());
			}
			if (userRepo.findByFullname("admin").isEmpty()) {
				var adminRole = roleRepository.findByName(UserRole.ADMIN.name())
                                        .orElseThrow(
                                            () -> new IllegalStateException("ROLE ADMIN was not initialized")
                                            );
				userRepo.save(
						User.builder()
								.fullname("admin")
								.email("admin@gmail.com")
								.password(passwordEncoder.encode("admin123"))
								.phonenumber("00000000")
								.accountLocked(false)
                            	.enabled(true)
                            	.roles(List.of(adminRole))
								.build());
			}
		};
	}

}
