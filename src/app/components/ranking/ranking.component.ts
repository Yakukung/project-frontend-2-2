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
import { GraphComponent } from "../graph/graph.component";

@Component({
    selector: 'app-ranking',
    standalone: true,
    templateUrl: './ranking.component.html',
    styleUrls: ['./ranking.component.scss'],
    imports: [CommonModule, NavbarComponent, MatButtonModule, HttpClientModule, MatChipsModule, MatChipListbox, GraphComponent]
})
export class RankingComponent implements OnInit {
  rankingData: any[] = [];

  deltaRank: number = 0;

  selectedDate: string = '';
  dateOptions: string[] = [];
  today: string = '';
  yesterday: string = '';
  two_days_ago: string = '';
  three_days_ago: string = '';
  four_days_ago: string = '';
  five_days_ago: string = '';
  six_days_ago: string = '';
  seven_days_ago: string = '';
  

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) {}

  ngOnInit() {
    this.fetchDateOptions();
  }

  async fetchDateOptions() {
    const HOST: string = 'http://localhost:3000';
    const url = `${HOST}/facemash/ranking/date-options`;
  
    try {
      const response = await axios.get(url);
  
      if (Array.isArray(response.data.dateOptions)) {
        this.dateOptions = response.data.dateOptions;
        this.yesterday = this.dateOptions[0];
        this.today = this.dateOptions[1];
 
  
        this.filterByDate(this.today);
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

    const HOST: string = 'http://localhost:3000';
    const url = `${HOST}/facemash/ranking/data?selectedDate=${selectedDate}`;

    try {
      const response = await axios.post(url);
      console.log('Response from server:', response);

      this.rankingData = response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  about(post_id: number) {
    console.log("Post_id:",post_id);
    }
}
