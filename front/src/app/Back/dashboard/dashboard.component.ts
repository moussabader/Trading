import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  ngOnInit() {
    this.renderCandleChart();
}

renderCandleChart() {
  const options = {
    chart: {
      type: 'candlestick',
      height: 350
    },
    series: [{
      data: [
        {
          x: new Date(1538778600000),
          y: [6629.81, 6650.5, 6623.04, 6633.33]
        },
        {
          x: new Date(1538780400000),
          y: [6632.01, 6643.59, 6620, 6630.11]
        },
        {
          x: new Date(1538782200000),
          y: [6630.71, 6648.95, 6623.34, 6635.65]
        },
        {
          x: new Date(1538784000000),
          y: [6635.65, 6651, 6629.67, 6638.24]
        },
        {
          x: new Date(1538785800000),
          y: [6638.24, 6640, 6620, 6624.47]
        },
        {
          x: new Date(1538787600000),
          y: [6624.53, 6636.03, 6621.68, 6624.31]
        },
        {
          x: new Date(1538789400000),
          y: [6624.61, 6632.2, 6617, 6626.02]
        },
        {
          x: new Date(1538791200000),
          y: [6627, 6632.2, 6610.92, 6620.57]
        },
        {
          x: new Date(1538793000000),
          y: [6620.71, 6624.99, 6610.94, 6618.89]
        },
        {
          x: new Date(1538794800000),
          y: [6618.89, 6624.9, 6615, 6621.44]
        },
        {
          x: new Date(1538796600000),
          y: [6621.45, 6632.5, 6619.02, 6628.57]
        },
        {
          x: new Date(1538798400000),
          y: [6628.68, 6634.38, 6623.54, 6630.13]
        },
        {
          x: new Date(1538800200000),
          y: [6630.13, 6633.87, 6618, 6623.75]
        },
        {
          x: new Date(1538802000000),
          y: [6623.75, 6628.53, 6619.03, 6623.31]
        },
        {
          x: new Date(1538803800000),
          y: [6623.31, 6630.99, 6616.81, 6628.2]
        },
        {
          x: new Date(1538805600000),
          y: [6628.2, 6633.13, 6622.23, 6629.06]
        }
      ]
    }],
    xaxis: {
      type: 'datetime'
    },
    title: {
      text: 'CandleStick Chart Example',
      align: 'left'
    }
  };

  const chart = new ApexCharts(document.querySelector("#candle"), options);
  chart.render();
}

}
