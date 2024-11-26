package tn.esprit.similator.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.similator.entity.Holding;
import tn.esprit.similator.repository.HoldingRepo;

import java.util.List;

@Service
@AllArgsConstructor
public class HoldingServImpl implements IHoldingService{

    HoldingRepo holdingRepo;
    public List<Holding> retrieveAllHoldings() {
        return holdingRepo.findAll();
    }

    public Holding retrieveHolding(Long holdingId) {
        return holdingRepo.findById(holdingId).get();
    }

    public Holding addHolding(Holding p) {
        return holdingRepo.save(p);
    }

    public void removeHolding(Long holdingId) {
        holdingRepo.deleteById(holdingId);
    }

    public Holding modifyHolding(Holding holding) {
        return holdingRepo.save(holding);
    }
}
