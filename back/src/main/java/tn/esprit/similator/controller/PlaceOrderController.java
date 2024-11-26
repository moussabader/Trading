package tn.esprit.similator.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.similator.entity.PlacingOrder;
import tn.esprit.similator.service.IPlacingOrderService;

import java.util.List;

@Tag(name = "PlacingOrder class")
@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/placingOrder")
public class PlaceOrderController {

    IPlacingOrderService placingOrderServ;
    
    @GetMapping("/Get-all-placingOrders")
    public List<PlacingOrder> getPlacingOrders() {
        List<PlacingOrder> listUtsers = placingOrderServ.retrieveAllPlacingOrders();
        return listUtsers;
    }
    
    @GetMapping("/Get-placingOrder/{placingOrder-id}")
    public PlacingOrder retrievePlacingOrder(@PathVariable("placingOrder-id") Long placingOrderId) {
        PlacingOrder placingOrder = placingOrderServ.retrievePlacingOrder(placingOrderId);
        return placingOrder;
    }

    @PostMapping("/Add-PlacingOrder")
    public PlacingOrder addPlacingOrder(@RequestBody PlacingOrder u) {
        PlacingOrder placingOrder = placingOrderServ.addPlacingOrder(u);
        return placingOrder;
    }
    @PutMapping("/modify-placingOrder")
    public PlacingOrder modifyPlacingOrder(@RequestBody PlacingOrder usr) {
        PlacingOrder placingOrder = placingOrderServ.modifyPlacingOrder(usr);
        return placingOrder;
    }

    @DeleteMapping("/remove-placingOrder/{placingOrder-id}")
    public void removePlacingOrder(@PathVariable("placingOrder-id") Long placingOrderId) {
        placingOrderServ.removePlacingOrder(placingOrderId);
    }


}
