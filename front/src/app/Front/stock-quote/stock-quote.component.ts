import { Component } from '@angular/core';
import { StockQuoteService } from 'src/app/Services/stock-quote-service.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stock-quote',
  templateUrl: './stock-quote.component.html',
  styleUrls: ['./stock-quote.component.css']
})
export class StockQuoteComponent {
  stockData: any;
  symbol: string = '';
  searchResults: any[] = [];
  searchTerm: string = '';
  apiKey: string = 'GB675A5CC0KN3LWL';

  constructor(private stockQuoteService: StockQuoteService) {}
  // search symbol in order form
  searchSymbol() {
    this.symbol = this.searchTerm; 
    this.stockQuote(); 
  }
 stockQuote() {
  if (this.symbol) {
    this.stockQuoteService.getStockQuote(this.symbol, this.apiKey).subscribe(
      (data: any) => {
        console.log('API Response:', data); // Log the API response
        this.stockData = data['Global Quote'];
      },
      (error) => {
        console.error('Error fetching stock data', error);
      }
    );
  } else {
    console.error('Symbol is not set.');
  }
}





  
  /*
  onSymbolChange() {
    if (this.symbol) {
      this.stockQuoteService.getStockQuote(this.symbol).subscribe(
        (data) => {
          this.stockQuote = data['Global Quote'];
        },
        (error) => {
          console.error('Error fetching stock quote:', error);
          this.stockQuote = null; 
        }
      );
    } else {
      this.stockQuote = null;
    }
  }
  getQuote() {
    this.stockQuoteService.getStockQuote(this.symbol).subscribe(
      data => {
        console.log('Raw API response:', JSON.stringify(data, null, 2)); // Log the entire API response
        
        // Check if Global Quote exists and has properties
        if (data['Global Quote'] && Object.keys(data['Global Quote']).length > 0) {
          this.quote = data['Global Quote'];
          console.log('Extracted quote:', JSON.stringify(this.quote, null, 2)); // Log the extracted quote
        } else {
          console.error('Global Quote is empty or not found in response');
          this.quote = null; // Ensure quote is reset if empty
        }
      },
      error => {
        console.error('Error fetching stock quote:', error);
        this.quote = null; // Reset quote on error
      }
    );
  }
    */
}
