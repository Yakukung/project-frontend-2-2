import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { MatButtonModule } from '@angular/material/button';
import { UsersPostReq } from '../../../model/users.post.req';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MatButtonModule, HttpClientModule, MatChipsModule],
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  rankingData: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) {}

  ngOnInit() {
    this.fetchRankingData();
  }

  fetchRankingData() {
    const url = "http://localhost:3000/facemash/ranking";

    this.httpClient.get(url)
      .subscribe(
        (data: any) => {
          // Handle the retrieved data here
          this.rankingData = data;
        },
        error => {
          console.error("HTTP error:", error);
        }
      );
  }
}
