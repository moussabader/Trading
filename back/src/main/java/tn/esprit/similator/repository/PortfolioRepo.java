package tn.esprit.similator.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.similator.entity.Portfolio;

@Repository
public interface PortfolioRepo extends JpaRepository<Portfolio, Long> {

}
