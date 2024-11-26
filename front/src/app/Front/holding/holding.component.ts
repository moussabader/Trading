import { Component, OnInit } from '@angular/core';
import { Holding } from 'src/app/Entity/holding';
import { HoldingService } from 'src/app/Services/holding.service';

@Component({
  selector: 'app-holding',
  templateUrl: './holding.component.html',
  styleUrls: ['./holding.component.css']
})
export class HoldingComponent implements OnInit {
  holdings: Holding[] = [];

  constructor(private holdingService: HoldingService) {}

  ngOnInit(): void {
    this.getHoldings();
  }

  buyHolding(id: number): void {
    console.log(`Buying holding with ID: ${id}`);
  }

  sellHolding(id: number): void {
    console.log(`Selling holding with ID: ${id}`);
  }
  getHoldings(): void {
    this.holdingService.getAllHoldings().subscribe(
      (data: Holding[]) => {
        this.holdings = data;
      },
      (error) => {
        console.error('Error fetching holdings', error);
      }
    );
  }

  removeHolding(id: number): void {
    this.holdingService.removeHolding(id).subscribe(
      () => {
        this.holdings = this.holdings.filter(holding => holding.id !== id); // Remove the holding from the local array
      },
      (error) => {
        console.error('Error removing holding', error);
      }
    );
  }

}