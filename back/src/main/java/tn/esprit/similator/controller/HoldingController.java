package tn.esprit.similator.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.similator.entity.Holding;
import tn.esprit.similator.service.IHoldingService;

import java.util.List;

@Tag(name = "Holding class")
@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/holding")
public class HoldingController {

    IHoldingService holdingServ;
    
    @GetMapping("/Get-all-holdings")
    public List<Holding> getHoldings() {
        List<Holding> listUtsers = holdingServ.retrieveAllHoldings();
        return listUtsers;
    }
    
    @GetMapping("/Get-holding/{holding-id}")
    public Holding retrieveHolding(@PathVariable("holding-id") Long holdingId) {
        Holding holding = holdingServ.retrieveHolding(holdingId);
        return holding;
    }

    @PostMapping("/Add-Holding")
    public Holding addHolding(@RequestBody Holding u) {
        Holding holding = holdingServ.addHolding(u);
        return holding;
    }
    @PutMapping("/modify-holding")
    public Holding modifyHolding(@RequestBody Holding usr) {
        Holding holding = holdingServ.modifyHolding(usr);
        return holding;
    }

    @DeleteMapping("/remove-holding/{holding-id}")
    public void removeHolding(@PathVariable("holding-id") Long holdingId) {
        holdingServ.removeHolding(holdingId);
    }


}
