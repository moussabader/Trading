package tn.esprit.similator.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.similator.entity.Transaction;
import tn.esprit.similator.service.ITransactionService;

import java.util.List;

@Tag(name = "Transaction class")
@RestController
@AllArgsConstructor
@RequestMapping("/transaction")
@CrossOrigin(origins = "*")
public class TransactionController {

    ITransactionService transactionServ;
    
    @GetMapping("/Get-all-transactions")
    public List<Transaction> getTransactions() {
        List<Transaction> listUtsers = transactionServ.retrieveAllTransactions();
        return listUtsers;
    }
    
    @GetMapping("/Get-transaction/{transaction-id}")
    public Transaction retrieveTransaction(@PathVariable("transaction-id") Long transactionId) {
        Transaction transaction = transactionServ.retrieveTransaction(transactionId);
        return transaction;
    }

    @PostMapping("/Add-Transaction")
    public Transaction addTransaction(@RequestBody Transaction asst) {
        Transaction transaction = transactionServ.addTransaction(asst);
        return transaction;
    }
    @PutMapping("/modify-transaction")
    public Transaction modifyTransaction(@RequestBody Transaction asst) {
        Transaction transaction = transactionServ.modifyTransaction(asst);
        return transaction;
    }

    @DeleteMapping("/remove-transaction/{transaction-id}")
    public void removeTransaction(@PathVariable("transaction-id") Long transactionId) {
        transactionServ.removeTransaction(transactionId);
    }


}
