package tn.esprit.similator.service;

import tn.esprit.similator.entity.PlacingOrder;

import java.util.List;

public interface IPlacingOrderService {
    public List<PlacingOrder> retrieveAllPlacingOrders();
    public PlacingOrder retrievePlacingOrder(Long placingOrderId);
    public PlacingOrder addPlacingOrder(PlacingOrder c);
    public void removePlacingOrder(Long placingOrderId);
    public PlacingOrder modifyPlacingOrder(PlacingOrder placingOrder);
}
