package tn.esprit.similator.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.similator.entity.Portfolio;
import tn.esprit.similator.service.IPortfolioService;

import java.util.List;

@Tag(name = "Portfolio class")
@RestController
@AllArgsConstructor
@RequestMapping("/portfolio")
@CrossOrigin(origins = "*")
public class PortfolioController {

    IPortfolioService portfolioServ;
    
    @GetMapping("/Get-all-portfolios")
    public List<Portfolio> getPortfolios() {
        List<Portfolio> listUtsers = portfolioServ.retrieveAllPortfolios();
        return listUtsers;
    }
    
    @GetMapping("/Get-portfolio/{portfolio-id}")
    public Portfolio retrievePortfolio(@PathVariable("portfolio-id") Long portfolioId) {
        Portfolio portfolio = portfolioServ.retrievePortfolio(portfolioId);
        return portfolio;
    }

    @PostMapping("/Add-Portfolio")
    public Portfolio addPortfolio(@RequestBody Portfolio p) {
        Portfolio portfolio = portfolioServ.addPortfolio(p);
        return portfolio;
    }
    @PutMapping("/modify-portfolio")
    public Portfolio modifyPortfolio(@RequestBody Portfolio p) {
        Portfolio portfolio = portfolioServ.modifyPortfolio(p);
        return portfolio;
    }

    @DeleteMapping("/remove-portfolio/{portfolio-id}")
    public void removePortfolio(@PathVariable("portfolio-id") Long portfolioId) {
        portfolioServ.removePortfolio(portfolioId);
    }
    

}
