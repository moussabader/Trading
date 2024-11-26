import { Component, OnInit } from '@angular/core';
import { Portfolio } from 'src/app/Entity/portfolio';
import { PortfolioService } from 'src/app/Services/portfolio.service';

@Component({
  selector: 'app-list-portfolio',
  templateUrl: './list-portfolio.component.html',
  styleUrls: ['./list-portfolio.component.css']
})
export class ListPortfolioComponent implements OnInit {

  portfolios: Portfolio[] = [];

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.loadPortfolios();
  }

  loadPortfolios(): void {
    this.portfolioService.getAllPortfolios().subscribe(
      (data: Portfolio[]) => {
        this.portfolios = data;
      },
      (error) => {
        console.error('Failed to load portfolios', error);
      }
    );
  }

  // Delete a portfolio
  deletePortfolio(id: number): void {
    this.portfolioService.deletePortfolio(id).subscribe(
      () => {
        console.log('Portfolio deleted successfully');
        this.loadPortfolios();  // Reload portfolios after deletion
      },
      (error) => {
        console.error('Failed to delete portfolio', error);
      }
    );
  }
}