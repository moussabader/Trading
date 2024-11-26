package tn.esprit.similator.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.similator.entity.Holding;

@Repository
public interface HoldingRepo extends JpaRepository<Holding, Long> {

}
