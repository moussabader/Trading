package tn.esprit.similator.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import tn.esprit.similator.entity.Portfolio;
import tn.esprit.similator.repository.PortfolioRepo;

import java.util.List;

@Service
@AllArgsConstructor
public class PortfolioServImpl implements IPortfolioService{

    PortfolioRepo portfolioRepo;
    public List<Portfolio> retrieveAllPortfolios() {
        return portfolioRepo.findAll();
    }

    public Portfolio retrievePortfolio(Long portfolioId) {
        return portfolioRepo.findById(portfolioId).get();
    }

    public Portfolio addPortfolio(Portfolio p) {
        return portfolioRepo.save(p);
    }

    public void removePortfolio(Long portfolioId) {
        portfolioRepo.deleteById(portfolioId);
    }

    public Portfolio modifyPortfolio(Portfolio portfolio) {
        return portfolioRepo.save(portfolio);
    }
}
