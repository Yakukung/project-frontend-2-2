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
import { map } from 'rxjs/operators';

import axios from 'axios';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MatButtonModule, HttpClientModule, MatChipsModule,MatChipListbox],
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  rankingData: any[] = [];
  selectedDate: string = '';
  dateOptions: string[] = [];
  Latest: string = '';
  yesterday: string = '';
  two_days_ago: string = '';
  three_days_ago: string = '';
  four_days_ago: string = '';
  five_days_ago: string = '';
  six_days_ago: string = '';
  

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) {}

  ngOnInit() {
    this.fetchDateOptions();
  }

  async fetchDateOptions() {
    const HOST: string = 'https://project-frontend-2-2.vercel.app';
    const url = `${HOST}/facemash/ranking/date-options`;
  
    try {
      const response = await axios.get(url);
  
      if (Array.isArray(response.data.dateOptions)) {
        this.dateOptions = response.data.dateOptions;
  
        this.six_days_ago = this.dateOptions[0];
        this.five_days_ago = this.dateOptions[1];
        this.four_days_ago = this.dateOptions[2];
        this.three_days_ago = this.dateOptions[3];
        this.two_days_ago = this.dateOptions[4];
        this.yesterday = this.dateOptions[5];
        this.Latest = this.dateOptions[6]; // Set Latest to the default date
  
        // Call filterByDate with the default date
        this.filterByDate(this.Latest);
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

    const HOST: string = 'https://project-frontend-2-2.vercel.app';
    const url = `${HOST}/facemash/ranking/data?selectedDate=${selectedDate}`;

    try {
      const response = await axios.post(url);
      console.log('Response from server:', response);

      // Assuming the server response is an array of ranking data
      this.rankingData = response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  

  
  
  
}
