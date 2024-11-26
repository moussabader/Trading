import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent {

  portfolioId!: number;
portfolio: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.portfolioId = +params['portfolioId']; 
      if (isNaN(this.portfolioId)) {
          console.error('Invalid portfolioId:', params['portfolioId']);
      } else {
          console.log('Retrieved portfolioId:', this.portfolioId); // Log the valid id
      }
  });
  }
}
