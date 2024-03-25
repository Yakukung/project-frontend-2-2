import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { MatButtonModule } from '@angular/material/button';
import { UsersPostReq } from '../../../model/users.post.req';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { MatChipListbox } from '@angular/material/chips';
import Swal from 'sweetalert2';
import axios from 'axios';
@Component({
  selector: 'app-admin-view-ranking',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MatButtonModule, HttpClientModule, MatChipsModule, MatChipListbox,],
  templateUrl: './admin-view-ranking.component.html',
  styleUrl: './admin-view-ranking.component.scss'
})
export class AdminViewRankingComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) {}
  rankingData: any[] = [];
  deltaRank: number = 0;
  selectedDate: string = '';
  dateOptions: string[] = [];
  today: string = '';
  yesterday: string = '';
  post_id: any;
  user_id: any;
  user_type: any;
  admin_id: any;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.admin_id = params['admin_id'];
      this.user_id = params['user_id'];
      this.user_type = params['user_type'];
      console.log('user_id: ', this.user_id);
    });
    this.fetchDateOptions();
  }

  async fetchDateOptions() {
    const HOST: string = 'http://localhost:3000';
    const url = `${HOST}/facemash/ranking/date-options`;
  
    try {
      const response = await axios.get(url);
  
      if (Array.isArray(response.data.dateOptions)) {
        this.dateOptions = response.data.dateOptions;
        this.selectedDate = this.dateOptions[0];
        this.yesterday = this.dateOptions[1];
        this.filterByDate(this.selectedDate);
  
      } else {
        console.error('Invalid data format. Expected an array.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  


  async filterByDate(selectedDate: string) {
    console.log('Selected Date:', selectedDate);
    this.selectedDate = selectedDate;
  
    let swalPromise;
  
    try {
      swalPromise = Swal.fire({
        background:
          '#fff url(https://firebasestorage.googleapis.com/v0/b/project-web-2-2.appspot.com/o/assets%2Fimg%2Fgif%2Fkurukuru-kururing.gif?alt=media&token=a4623ed0-82b6-4dba-92ca-9004f646fe22) center center/contain no-repeat',
        html: "<div style='position: absolute; top: 20px; left: 50%; transform: translateX(-50%); width: 100%; text-align: center;'>I will close in <b></b> milliseconds.</div>",
        padding: '4rem',
        timer: 600,
        timerProgressBar: true,
        showConfirmButton: false,
        didOpen: () => {
          const popup = Swal.getPopup();
          if (popup) {
            const timer = popup.querySelector('b');
            if (timer) {
              const timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
              }, 100);
            }
          }
        },
      });
  
      const HOST: string = 'http://localhost:3000';
      const url = `${HOST}/facemash/ranking/data?selectedDate=${selectedDate}`;
  
      const response = await axios.post(url);
      console.log('Response from server:', response);
  
      this.rankingData = response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      await swalPromise;
    }
  }
  
  

  // about(post_id: number, user_id: number) {
    about(admin_id: string, post_id: number, user_id: number, user_type: number) {
      console.log("Post_id:", post_id);
      console.log("User_id:", user_id);
      this.router.navigate(['/statistics'], { queryParams: { admin_id: admin_id, post_id: post_id, user_id: user_id, user_type: user_type} });
    }
    
  
}
