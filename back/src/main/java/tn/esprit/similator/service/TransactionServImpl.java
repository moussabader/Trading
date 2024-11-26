package tn.esprit.similator.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.similator.entity.Transaction;
import tn.esprit.similator.repository.TransactionRepo;

import java.util.List;

@Service
@AllArgsConstructor
public class TransactionServImpl implements ITransactionService {

    TransactionRepo transactionRepo;

    public List<Transaction> retrieveAllTransactions() {
        return transactionRepo.findAll();
    }

    public Transaction retrieveTransaction(Long transactionId) {
        return transactionRepo.findById(transactionId).get();
    }

    public Transaction addTransaction(Transaction usr) {
        return transactionRepo.save(usr);
    }

    public void removeTransaction(Long transactionId) {
        transactionRepo.deleteById(transactionId);
    }

    public Transaction modifyTransaction(Transaction transaction) {
        return transactionRepo.save(transaction);
    }
}
