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
  selector: 'app-all-stat',
  standalone: true,
  imports: [NavbarComponent, CommonModule, MatButtonModule, HttpClientModule],
  templateUrl: './all-stat.component.html',
  styleUrl: './all-stat.component.scss'
})
export class AllStatComponent implements OnInit, OnDestroy {

  user_id: string = '';
  chart: any;
  chartData: any[] = [];
  private chartSubscription: Subscription;
  postIds: number[] = [];
  user_type: any;
  view_user_id: any;
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
      this.user_id = params['user_id'];
      this.user_type = params['user_type'];
      this.admin_id = params['admin_id'];
      this.view_user_id = params['view_user_id'];

      console.log('user_id: ', this.user_id);
      console.log('admin_id: ', this.admin_id);
      console.log('view_user_id: ',this.view_user_id);
      console.log('user_type: ', this.user_type);
      
      if(this.view_user_id === undefined ){
        this.fetchGraphAllPost(this.user_id);
        console.log("1");
      }
      if(this.user_id === this.view_user_id){
        this.fetchGraphAllPost(this.user_id);
        console.log("2");
      }
      if(this.view_user_id !== undefined && this.user_id !== this.view_user_id){
        this.fetchGraphAllPost(this.view_user_id);
        console.log("3");
      }
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

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.user_id = params['user_id'];
      this.user_type = params['user_type'];
      this.admin_id = params['admin_id'];
      this.view_user_id = params['view_user_id'];

      console.log('user_id: ', this.user_id);
      console.log('admin_id: ', this.admin_id);
      console.log('view_user_id: ',this.view_user_id);
      console.log('user_type: ', this.user_type);
    
      if(this.view_user_id === undefined ){
        this.fetchGraphAllPost(this.user_id);
        console.log("1");
      }
      if(this.user_id === this.view_user_id){
        this.fetchGraphAllPost(this.user_id);
        console.log("2");
      }
      if(this.view_user_id !== undefined && this.user_id !== this.view_user_id){
        this.fetchGraphAllPost(this.view_user_id);
        console.log("3");
      }
   
    });
  }
  
  fetchGraphAllPost(user_id: string): void {
    const url = `https://project-backend-2-2.onrender.com/facemash/stat/show-user-post-all`;
  
    this.chartSubscription = this.httpClient
      .post<any[]>(url, { user_id })
      .subscribe(
        (data: any[]) => {
          console.log("Data received from server:", data);
          this.chartData = data;
          this.postIds = Array.from(new Set(this.chartData.map(item => item.post_id)));
          this.renderGraphPostAll(); // ย้ายไปนี่
        },
        (error) => {
          console.error('Error fetching graph data:', error);
        }
      );
  }
  
  renderGraphPostAll(): void {
    if (!this.chartData || this.chartData.length === 0) {
      console.error('No data available to render the graph');
      return;
    }
    
    
    this.postIds.forEach(postId => {
      const dataForPost = this.chartData.filter(item => item.post_id === postId);
      const labels = dataForPost.map(item => item.vote_date);
      const ratings = dataForPost.map(item => item.newRating);
      const borderColor = '#' + (Math.random().toString(16) + '000000').substring(2, 8);


      
      this.chart = new Chart('chart_' + postId, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: `Post ${postId}`,
            data: ratings,
            borderColor: borderColor,
            fill: false
          }]
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
        } as ChartOptions
      });
    });
  }

  getPostImage(postId: number): string {
    const post = this.chartData.find(item => item.post_id === postId);
    return post ? post.picture : '';
  }

  getPostFirstName(postId: number): string {
    const post = this.chartData.find(item => item.post_id === postId);
    return post ? post.first_name : '';
  }

  getPostLastName(postId: number): string {
    const post = this.chartData.find(item => item.post_id === postId);
    return post ? post.last_name : '';
  }


  backProfile(user_id: string) {
    this.router.navigate(['/profile'], { queryParams: { user_id: this.user_id, user_type: this.user_type} });
    }

    adminBackShowProfile(admin_id: string, user_type: string, view_user_id: string) {
      this.router.navigate(['/show-user-profile'], { queryParams: { admin_id: admin_id, user_type: user_type, view_user_id: view_user_id } });
      }
    viewBackShowProfile(user_id: string, user_type: string, view_user_id: string) {
      this.router.navigate(['/show-user-profile'], { queryParams: { user_id: user_id, user_type: user_type, view_user_id: view_user_id } });
      }
}