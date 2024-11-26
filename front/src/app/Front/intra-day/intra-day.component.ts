import { Component, OnInit } from '@angular/core';
import { IntradayService } from 'src/app/Services/IntradayService';

@Component({
  selector: 'app-intra-day',
  templateUrl: './intra-day.component.html',
  styleUrls: ['./intra-day.component.css']
})
export class IntraDayComponent implements OnInit {

  stockData: any;
  symbol: string = 'MSFT';  
  interval: string= '5min';
  constructor(private stockService: IntradayService) {}

  ngOnInit(): void {
    this.stockService.getStockData(this.symbol, this.interval).subscribe((data) => {
      this.stockData = data;
    });
  }
}