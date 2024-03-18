import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartOptions, registerables } from 'chart.js';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; 
import Chart from 'chart.js/auto';
import { Subscription } from 'rxjs';


// Register controller for line chart
Chart.register(...registerables);

@Component({
  selector: 'app-graph',
  standalone: true,
  templateUrl: './graph.component.html',
  imports: [CommonModule, NavbarComponent, MatButtonModule, HttpClientModule ],
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, OnDestroy {
  chart: any;
  chartData: any[] = [];
  dataDate: any[]=[];
  dataLine: any[]=[];
  private chartSubscription;

  constructor(private httpClient: HttpClient) {
    this.chartSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.fetchGraphData();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.chartSubscription) {
      this.chartSubscription.unsubscribe();
    }
  }

  fetchGraphData(): void {
    this.chartSubscription = this.httpClient.get<any[]>('https://project-backend-2-2.onrender.com/facemash/graph')
      .subscribe(
        (data: any[]) => {
          this.chartData = data;
          this.renderGraph();
        },
        (error) => {
          console.error('Error fetching graph data:', error);
        }
      );
  }
  
  renderGraph(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    const labels = this.chartData.map(item => item.vote_date);
    const datasets = this.chartData[0].data.map((dataItem: { post_id: any; }) => {
      return {
        label: `Post ${dataItem.post_id}`, 
        data: this.chartData.map(item => {
          const matchingData = item.data.find((itemData: { post_id: any; }) => itemData.post_id === dataItem.post_id);
          return matchingData ? matchingData.newRating : null;
        }),
        borderColor: '#' + (Math.random().toString(16) + '000000').substring(2,8),
        fill: false
      };
    });
  
    this.chart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        legend: {
          display: true,
          position: 'bottom'
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      } as ChartOptions
    });
  }
}