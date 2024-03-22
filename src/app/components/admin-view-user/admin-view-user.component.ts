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

interface UserData {
user_id: any;
user_type: any;
icon: any;
first_name: any;
last_name: any;
}

@Component({
  selector: 'app-admin-view-user',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MatButtonModule, HttpClientModule, MatChipsModule, MatChipListbox,],
  templateUrl: './admin-view-user.component.html',
  styleUrl: './admin-view-user.component.scss'
})
export class AdminViewUserComponent implements OnInit {
  response: UserData[] = [];
  user_id: any;
  user_type: any;
  userId: any;
  admin_id: any;

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.admin_id = params['admin_id'];
      this.user_id = params['user_id'];
      this.user_type = params['user_type'];
      console.log('user_id: ', this.user_id);
    });
    this.fetchAllUser();
  }

  async fetchAllUser() {
    let swalPromise;

    try {
      swalPromise = Swal.fire({
        background: '#fff url(https://firebasestorage.googleapis.com/v0/b/project-web-2-2.appspot.com/o/assets%2Fimg%2Fgif%2Fkurukuru-kururing.gif?alt=media&token=a4623ed0-82b6-4dba-92ca-9004f646fe22) center center/contain no-repeat',
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

      const HOST: string = 'https://project-backend-2-2.onrender.com';
      const url = `${HOST}/facemash/admin/`;

      const response = await this.httpClient.get<UserData[]>(url).toPromise() ?? [];
      console.log('Response from server:', response);
      this.response = response;
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  viewProfile(admin_id: string, user_type: string,  user_id: string) {
    this.router.navigate(['/show-user-profile'], { queryParams: {admin_id: admin_id, user_type: user_type, user_id: user_id,} });
  }
}