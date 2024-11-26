import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderType, PlacingOrder, Status, TradeType, TransacType } from 'src/app/Entity/placing-order';
import { PlacingOrderService } from 'src/app/Services/placing-order.service';
import { StockQuoteService } from 'src/app/Services/stock-quote-service.service';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  orderForm!: FormGroup;
  tradeTypes = Object.values(TradeType); 
  orderTypes = Object.values(OrderType);
  transacTypes = Object.values(TransacType);
  stockData: any;
  searchSymbolTerm: string = ''; 
  searchResults: any[] = [];
  searchTerm: string = '';
  apiKey: string = 'GB675A5CC0KN3LWL';
  isTradeTypeSelected: boolean = false;
  isTransacTypeSelected: boolean = false;
  isOrderTypeSelected: boolean = false;
  filteredSymbols: string[] = [];
  portfolioId!: string;  // To store the portfolioId from the route

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient,
              private placingOrderService: PlacingOrderService,
              private router: Router,
              private stockQuoteService: StockQuoteService) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      tradeType: ['', Validators.required],
      transacType: ['', Validators.required],
      orderType: ['', Validators.required],
      qty: [null, [Validators.required, Validators.min(1)]],
      price: [null],
      duration: [null, [Validators.required]],
      param: [''],
      notes: [''],
      status: ['PENDING'],
      date: [new Date()],
      symbol: ['', Validators.required],
      faceValue: [null],       
      couponRate: [null],      
      maturityDate: [null],    
      strikePrice: [null],    
      expirationDate: [null], 
      contractSize: [null],   
      expiryDate: [null],      
      nav: [null],             
      stopLoss: [null],
      takeProfit: [null],
      leverage: [null]
    });
  }
  
  onTradeTypeChange() {
    const selectedTradeType = this.orderForm.get('tradeType')?.value;
    this.isTradeTypeSelected = !!selectedTradeType;
    this.filteredSymbols = [];
    this.resetDynamicFields(selectedTradeType);
  }

  onTransacTypeChange() {
    const selectedTransacType = this.orderForm.get('transacType')?.value;
    this.isTransacTypeSelected = !!selectedTransacType;
  }

  onOrderTypeChange() {
    const selectedOrderType = this.orderForm.get('orderType')?.value;
    this.isOrderTypeSelected = !!selectedOrderType;
  }

  private resetDynamicFields(tradeType: string) {
    switch (tradeType) {
      case 'STOCKS':
        this.orderForm.patchValue({
          faceValue: null,
          couponRate: null,
          maturityDate: null,
          strikePrice: null,
          expirationDate: null,
          contractSize: null,
          expiryDate: null,
          nav: null
        });
        break;

      case 'BONDS':
        this.orderForm.patchValue({
          faceValue: null,       
          couponRate: null,      
          maturityDate: null,
          strikePrice: null,
          expirationDate: null,
          contractSize: null,
          expiryDate: null,
          nav: null
        });
        break;

      case 'OPTIONS':
        this.orderForm.patchValue({
          faceValue: null,
          couponRate: null,
          maturityDate: null,
          strikePrice: null,
          expirationDate: null,
          contractSize: null,
          expiryDate: null,
          nav: null
        });
        break;
    }
  }

  get tradeType() { return this.orderForm.get('tradeType')!.value; }
  get transacType() { return this.orderForm.get('transacType')!.value; }
  get orderType() { return this.orderForm.get('orderType')!.value; }
  get symbol(): string { return this.orderForm.get('symbol')!.value || ''; }
  get qty() { return this.orderForm.get('qty')!.value; }
  get price() { return this.orderForm.get('price')?.value; }
  get duration() { return this.orderForm.get('duration')?.value; }
  get param() { return this.orderForm.get('param')?.value; }
  get notes() { return this.orderForm.get('notes')?.value; }
  get status() { return this.orderForm.get('status')!.value; }
  get date() { return this.orderForm.get('date')!.value; }
  get faceValue() { return this.orderForm.get('faceValue')?.value; }
  get couponRate() { return this.orderForm.get('couponRate')?.value; }
  get maturityDate() { return this.orderForm.get('maturityDate')?.value; }
  get strikePrice() { return this.orderForm.get('strikePrice')?.value; }
  get expirationDate() { return this.orderForm.get('expirationDate')?.value; }
  get contractSize() { return this.orderForm.get('contractSize')?.value; }
  get expiryDate() { return this.orderForm.get('expiryDate')?.value; }
  get nav() { return this.orderForm.get('nav')?.value; }
  get stopLoss() { return this.orderForm.get('stopLoss')?.value; }
  get takeProfit() { return this.orderForm.get('takeProfit')?.value; }
  get leverage() { return this.orderForm.get('leverage')?.value; }

  logInvalidControls() {
    Object.keys(this.orderForm.controls).forEach(key => {
      const control = this.orderForm.get(key);
      if (control && control.invalid) {
        const errors = control.errors;
        console.error(`Field: ${key} is invalid`, errors);
      }
    });
  }
onSubmit(): void {
    if (this.orderForm.valid) {
      const placingOrder: PlacingOrder = this.orderForm.value;

      // Pass the portfolioId to the service when placing the order
      this.placingOrderService.addPlacingOrder(this.portfolioId, placingOrder).subscribe(
        (response) => {
          console.log('Order placed successfully', response);
          this.router.navigate(['/portfolio']);
        },
        (error) => {
          console.error('Error placing order', error);
        }
      );
    } else {
      this.logInvalidControls();
      console.error('Form is invalid');
    }
  }
  
  // Search symbol in order form
  searchSymbol() {
    this.searchSymbolTerm = this.orderForm.get('symbol')?.value;
    this.stockQuote(); 
  }  
  stockQuote() {
    if (this.searchSymbolTerm) {
      this.stockQuoteService.getStockQuote(this.searchSymbolTerm, this.apiKey).subscribe(
        (data: any) => {
          console.log('API Response:', data); 
          this.stockData = data['Global Quote'];
          //this.updateChartData(); 
        },
        (error) => {
          console.error('Error fetching stock data', error);
        }
      );
    } else {
      console.error('Symbol is not set.');
    }
  }

  

/*     chart
  ngAfterViewInit() {
    console.log('lineChartCanvas:', this.lineChartCanvas);
    this.stockQuote();
  }
  updateChartData() {
    if (this.lineChartCanvas) { // Ensure lineChartCanvas is defined
      const canvas = this.lineChartCanvas.nativeElement; // Access the canvas using ViewChild
      const ctx = canvas.getContext('2d'); // Get the 2D context

      console.log('Canvas:', canvas); // Check if canvas is not null
      console.log('Context:', ctx); // Check if context is not null

      if (!ctx) {
        console.error('Failed to get 2D context for the chart');
        return;
      }

      if (this.chart) {
        this.chart.destroy(); // Destroy previous chart instance to avoid duplication
      }

      const stockValues = [
        parseFloat(this.stockData['02. open']),
        parseFloat(this.stockData['03. high']),
        parseFloat(this.stockData['04. low']),
        parseFloat(this.stockData['05. price'])
      ];

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Open', 'High', 'Low', 'Price'],
          datasets: [
            {
              label: `Stock Data for ${this.stockData['01. symbol']}`,
              data: stockValues,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: false
            }
          }
        }
      });
    } else {
      console.error('lineChartCanvas is undefined');
    }
  }
  */
  

  

}