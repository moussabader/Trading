package tn.esprit.similator.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.similator.entity.PlacingOrder;

@Repository
public interface PlacingOrderRepo extends JpaRepository<PlacingOrder, Long> {

}
