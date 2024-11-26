package tn.esprit.similator.service;

import tn.esprit.similator.entity.Holding;

import java.util.List;

public interface IHoldingService {
    public List<Holding> retrieveAllHoldings();
    public Holding retrieveHolding(Long holdingId);
    public Holding addHolding(Holding hold);
    public void removeHolding(Long holdingId);
    public Holding modifyHolding(Holding holding);
}
