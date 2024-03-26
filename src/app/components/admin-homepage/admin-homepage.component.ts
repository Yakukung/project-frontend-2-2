import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { MatButtonModule } from '@angular/material/button';
import { UsersPostReq } from '../../../model/users.post.req';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-homepage',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MatButtonModule, HttpClientModule ],
  templateUrl: './admin-homepage.component.html',
  styleUrl: './admin-homepage.component.scss'
})
export class AdminHomepageComponent implements OnInit{
  show: UsersPostReq[] = [];
  email: string = '';
  password: string = '';
  first_name: string = '';
  last_name: string = '';
  user_id: string = '';
  user_type: string = '';
  
  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) {}

  ngOnInit() {
    Swal.fire({
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

    this.route.queryParams.subscribe((params) => {
      const user_id = params['user_id'];

      if (user_id) {
        this.fetchUserData(user_id);
      }
    });
  }

  fetchUserData(user_id: string) {
    const url = `https://project-backend-2-2.onrender.com/facemash/homepage`;

    this.httpClient.post(url, { user_id }).subscribe(
      (response: any) => {

        this.email = response.email;
        this.password = response.password;
        this.first_name = response.first_name;
        this.last_name = response.last_name;
        this.user_id = response.user_id;
        this.user_type = response.user_type;

      },
      (error: any) => {
        console.error("Error fetching user data:", error);
      }
    );
  }

}