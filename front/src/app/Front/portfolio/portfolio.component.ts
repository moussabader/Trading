import { Component, OnInit } from '@angular/core';
import { Portfolio } from 'src/app/Entity/portfolio';
import { PortfolioService } from 'src/app/Services/portfolio.service';
import { StockQuoteService } from 'src/app/Services/stock-quote-service.service';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit{
  //marketStatus: any;
  portfolios: Portfolio[] = [];
  searchResults: any[] = [];
  searchTerm: string = '';//keywore= symbol
  apiKey: string = 'GB675A5CC0KN3LWL__'; 
  
  constructor(private stockQuoteService: StockQuoteService,   
              private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.fetchPortfolios();
    //this.fetchMarketStatus();
  }
  fetchPortfolios() {
    this.portfolioService.getAllPortfolios().subscribe((data: Portfolio[]) => {
      this.portfolios = data;
      console.log(this.portfolios); 
    });
  }
// search if Market Open/ closed
search() {
  if (this.searchTerm) {
    this.stockQuoteService.searchStockSymbols(this.searchTerm, this.apiKey).subscribe(
      (data: any) => {
        this.searchResults = data.bestMatches; 
      },
      (error) => {
        console.error('Error fetching stock data', error);
      }
    );
  }
}


  /*
  fetchMarketStatus() {
    this.marketStatusService.getMarketStatus().subscribe(
      (data) => {
        this.marketStatus = data;
        console.log(this.marketStatus); 
      },
      (error) => {
        console.error('Error fetching market status:', error);
      }
    );
  }
    */



  
}
