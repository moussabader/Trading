package tn.esprit.similator.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.similator.entity.Transaction;

@Repository
public interface TransactionRepo extends JpaRepository<Transaction, Long> {

}
