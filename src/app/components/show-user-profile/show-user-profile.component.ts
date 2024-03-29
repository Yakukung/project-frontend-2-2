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
import {MatIconModule} from '@angular/material/icon';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-show-user-profile',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MatButtonModule, HttpClientModule, MatChipsModule, MatChipListbox,MatIconModule],
  templateUrl: './show-user-profile.component.html',
  styleUrl: './show-user-profile.component.scss'
})
export class ShowUserProfileComponent implements OnInit{

  admin_user_type: any;
  view_user_id: any;
toggleLike(arg0: any) {
throw new Error('Method not implemented.');
}
fileName: any;
  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) {}


  isHovered: any;
  user_id: any;
  Statistics: any;
  response: any;
  email: string = '';
  password: string = '';
  first_name: string = '';
  last_name: string = '';
  banner: string = '';
  icon: string = '';
  about: string = '';
  posts: any[] = [];
  admin_id: string = '';
  user_type: any;
  userId: any;

  ngOnInit() {

    this.route.queryParams.subscribe((params) => {
      this.admin_id = params['admin_id'];
      this.userId = params['user_id'];
      this.user_type = params['user_type'];
      this.view_user_id = params['view_user_id'];

      console.log('admin_id: ', this.admin_id);
      console.log('user_id: ', this.userId);
      console.log('user_type: ', this.user_type);
      console.log('this.view_user_id : ',this.view_user_id );
  
        this.fetchUserData(this.view_user_id);
        this.fetchPostData(this.view_user_id);
       
    });

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
  }
  
  fetchUserData(user_id: string) {
    const url = `http://localhost:3000/facemash/profile/show-user`;

    this.httpClient.post(url, { user_id }).subscribe(
      (response: any) => {
        this.email = response.email;
        this.password = response.password;
        this.first_name = response.first_name;
        this.last_name = response.last_name;
        this.user_id = response.user_id;
        this.banner = response.banner;
        this.icon = response.icon;
        this.about = response.about;

        // Parse the posts JSON string to an array

        console.log('Response:', response);
        console.log('Posts before:', this.posts);

      },
      (error: any) => {
        console.error("Error fetching user data:", error);
      }
    );
  }
fetchPostData(user_id: string) {
    const Url = `http://localhost:3000/facemash/profile`;
  
    this.httpClient.post(Url, { user_id })
      .subscribe(
        (response: any) => {
          try {
            if (response.posts) {
              this.posts = JSON.parse(response.posts);
            }
          } catch (error) {
            console.error("Error parsing posts JSON:", error);
          }

          console.log('Response:', response);
          console.log('Posts before:', this.posts);
        },
        (error: any) => {
          console.error("Error fetching post data:", error);
        }
      );
}
viewStat(user_id: string, user_type: string, view_user_id: string ) {
  this.router.navigate(['/all-stat'], { queryParams: { user_id: user_id ,user_type: user_type, view_user_id: view_user_id } });
  console.log(this.user_id);
  
}

viewStatAdmin(admin_id: string, user_type: string, view_user_id: string) {
  this.router.navigate(['/all-stat'], { queryParams: { admin_id: admin_id, user_type: user_type, view_user_id: view_user_id } });
  console.log(admin_id);
}
backRanking(user_id: string, user_type: string) {
  this.router.navigate(['/ranking'], { queryParams: { user_id: user_id, user_type: user_type } });
  }
  adminBackAllUser(admin_id: string, user_type: string) {
    this.router.navigate(['/admin-view-user'], { queryParams: { admin_id: admin_id, user_type: user_type} });
    }



iconSize: string = '100px';
isLikedMap: { [post_id: string]: boolean } = {};
}