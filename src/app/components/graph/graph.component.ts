import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions, registerables } from 'chart.js';

// Register controller for line chart
Chart.register(...registerables);

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  chart: any;

  constructor() { }

  ngOnInit(): void {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Sample Data',
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: '#3cba9f',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        }
      } as ChartOptions
    });
  }
}
