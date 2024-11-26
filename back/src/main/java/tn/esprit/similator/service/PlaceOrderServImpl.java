package tn.esprit.similator.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.similator.entity.PlacingOrder;
import tn.esprit.similator.repository.PlacingOrderRepo;

import java.util.List;

@Service
@AllArgsConstructor
public class PlaceOrderServImpl implements IPlacingOrderService{

    PlacingOrderRepo placingOrderRepo;
    public List<PlacingOrder> retrieveAllPlacingOrders() {
        return placingOrderRepo.findAll();
    }

    public PlacingOrder retrievePlacingOrder(Long placingOrderId) {
        return placingOrderRepo.findById(placingOrderId).get();
    }

    public PlacingOrder addPlacingOrder(PlacingOrder usr) {
        return placingOrderRepo.save(usr);
    }

    public void removePlacingOrder(Long placingOrderId) {
        placingOrderRepo.deleteById(placingOrderId);
    }

    public PlacingOrder modifyPlacingOrder(PlacingOrder placingOrder) {
        return placingOrderRepo.save(placingOrder);
    }

}
