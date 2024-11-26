package tn.esprit.similator.service;

import tn.esprit.similator.entity.Portfolio;

import java.util.List;

public interface IPortfolioService {
    public List<Portfolio> retrieveAllPortfolios();
    public Portfolio retrievePortfolio(Long portfolioId);
    public Portfolio addPortfolio(Portfolio c);
    public void removePortfolio(Long portfolioId);
    public Portfolio modifyPortfolio(Portfolio portfolio);
}
