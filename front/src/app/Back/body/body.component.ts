import { Component, OnChanges, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { ComponentStateService } from 'src/app/component-state.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit{
  currentComponent: string = 'dash'; 

  constructor(private componentStateService: ComponentStateService) {}

  ngOnInit() {
      this.componentStateService.currentComponent$.subscribe(component => {
          this.currentComponent = component;         
      });
  }

  
}
