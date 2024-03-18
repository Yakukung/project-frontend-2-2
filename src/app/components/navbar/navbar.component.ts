// navbar.component.ts
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatToolbarModule, HttpClientModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input() usersigndata: any;
  email: string = '';
  password: string = '';
  first_name: string = '';
  last_name: string = '';
  user_id: string = '';
  activeButton: string = '';

  currentRoute: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, private cdr: ChangeDetectorRef) {}



  
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const user_id = params['user_id'];
      if (user_id) {
        this.fetchUserData(user_id);
      }
    });
  }

  fetchUserData(user_id: string) {
    const url = `http://localhost:3000/facemash/navbar`;

    this.httpClient.post(url, { user_id }).subscribe(
      (response: any) => {
        this.email = response.email;
        this.password = response.password;
        this.first_name = response.first_name;
        this.last_name = response.last_name;
        this.user_id = response.user_id;
      },
      (error: any) => {
        console.error("Error fetching user data:", error);
      }
    );
  }

  isButtonActive(route: string): boolean {
    const isActive = this.router.url.includes(route);
    return isActive;
  }
  
  signup(user_id: string) {

    // const isConfirmed = window.confirm('Are you sure you want to sign out?');

    // if (isConfirmed) {
    //   this.router.navigate(['/signin-or-signup']);
    // } else {
    // }
      if (user_id) {
        Swal.fire({
          title: "Are you sure you want to sign out?",
          imageUrl: "https://firebasestorage.googleapis.com/v0/b/project-web-2-2.appspot.com/o/assets%2Fimg%2Fgif%2Fkurukuru-kururing.gif?alt=media&token=a4623ed0-82b6-4dba-92ca-9004f646fe22",
          imageWidth: 200,
          imageHeight: 200,
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/signin-or-signup']);
          }
        });
      }
      else{
        Swal.fire({
          title: "You must Sign in first.",
          imageUrl: "https://firebasestorage.googleapis.com/v0/b/project-web-2-2.appspot.com/o/assets%2Fimg%2Fgif%2Fkurukuru-kururing.gif?alt=media&token=a4623ed0-82b6-4dba-92ca-9004f646fe22",
          imageWidth: 200,
          imageHeight: 200,
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/signin-or-signup']);
          }
        });
      }
  }

  profile() {
    this.router.navigate(['/profile'], { queryParams: { user_id: this.user_id } });
  }

  ranking() {
    this.router.navigate(['/ranking'], { queryParams: { user_id: this.user_id } });
  }
  
  vote() {
    this.router.navigate(['/vote'], { queryParams: { user_id: this.user_id } });
  }
  
  home() {
    this.router.navigate(['/'], { queryParams: { user_id: this.user_id } });
  }
}