import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartOptions, registerables, ChartDataset } from 'chart.js'; // Import ChartDataset
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { Subscription } from 'rxjs';

// Register controller for line chart
Chart.register(...registerables);

interface ChartDataItem {
  post_id: number;
  newRating: number;
  picture: string;
  newRank: number;
}

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [NavbarComponent, CommonModule, MatButtonModule, HttpClientModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent implements OnInit, OnDestroy {
  chart: any;
  chartData: any[] = [];
  dataDate: any[] = [];
  dataLine: any[] = [];
  private chartSubscription;
  posts: any;
  post_id: any;
  user_id: any;
  picture: string = '';
  first_name: string = '';
  last_name: string = '';
  user_type: string = '';
  admin_id: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient
  ) {
    this.chartSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.admin_id = params['admin_id'];
      this.user_id = params['user_id'];
      this.user_type = params['user_type'];
      const post_id = params['post_id'];
      console.log('post_id: ', post_id);

        this.fetchGraphData(post_id);
    });
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.chartSubscription) {
      this.chartSubscription.unsubscribe();
    }
  }

  fetchGraphData(post_id: string): void {
    const url = `http://localhost:3000/facemash/stat/select-post`;

    this.chartSubscription = this.httpClient
      .post<any[]>(url, { post_id })
      .subscribe(
        (data: any[]) => {
          this.chartData = data;
          this.picture = data[0].picture;
          this.first_name = data[0].first_name;
          this.last_name = data[0].last_name;
          this.post_id = data[0].post_id;
          console.log(this.chartData);
          this.renderGraph();
        },
        (error) => {
          console.error('Error fetching graph data:', error);
        }
      );
  }

  renderGraph(): void {
    if (!this.chartData || this.chartData.length === 0) {
      console.error('No data available to render the graph');
      return;
    }

    const labels = this.chartData.map((item) => item.vote_date);
    const datasets = [
      {
        label: `Post ${this.chartData[0].post_id}`,
        data: this.chartData.map((item) => item.newRating),
        borderColor:
          '#' + (Math.random().toString(16) + '000000').substring(2, 8),
        fill: false,
      },
    ];

    this.chart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        legend: {
          display: true,
          position: 'bottom',
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      } as ChartOptions,
    });
  }

backRanking(user_id: string, user_type: string) {
  this.router.navigate(['/ranking'], { queryParams: { user_id: this.user_id, user_type: this.user_type} });
  }
  backAdminRanking(user_id: string, user_type: string) {
    this.router.navigate(['/admin-view-ranking'], { queryParams: { admin_id: this.admin_id, user_id: this.user_id, user_type: this.user_type} });
    }
}  