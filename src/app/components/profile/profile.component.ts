import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; 
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MatButtonModule, HttpClientModule, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  email: string = '';
  password: string = '';
  first_name: string = '';
  last_name: string = '';
  user_id: string = '';
  banner: string = '';
  icon: string = '';
  about: string = '';
  posts: any[] = [];
  fileName: string = 'Upload New Post!';
  fileInput: any;

  
  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) {}
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const user_id = params['user_id'];

      if (user_id) {
        this.fetchUserData(user_id);
        this.fetchPostData(user_id);
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
    const postUrl = `http://localhost:3000/facemash/profile`;
  
    this.httpClient.post(postUrl, { user_id })
      .subscribe(
        (response: any) => {
          if (response.posts) {
            this.posts = JSON.parse(response.posts);
          }
        },
        (error: any) => {
          console.error("Error fetching post data:", error);
        }
      );
  }
  iconSize: string = '100px';
  isLikedMap: { [post_id: string]: boolean } = {};

  toggleLike(post_id: string) {
    this.isLikedMap[post_id] = !this.isLikedMap[post_id];
  }



  editProfile(user_id: string) {
    this.router.navigate(['/edit-profile'], { queryParams: { user_id: this.user_id } });
    }


    file(event: any) {
      const files = event.target.files;
      if (files && files.length > 0) {
        this.fileName = files[0].name;
      } else {
        this.fileName = 'Upload New Post!';
      }
    }
  
    post() {
      const userId = this.user_id;
      const first_name =this.first_name 
      const formData = new FormData();
      formData.append('image', this.fileInput.nativeElement.files[0]);
  
      // สร้าง URL สำหรับการเก็บไฟล์
      const storagePath = `/assets/img/${first_name}/post/`;
      
      // ส่งไปที่เซิร์ฟเวอร์หรือทำการอัพโหลดไฟล์ที่นี่
      // ตัวอย่าง: อาจใช้ HttpClient ของ Angular หรือส่งข้อมูลไปยังเซิร์ฟเวอร์โดยใช้ API
  
      // หลังจากนั้นคุณสามารถใช้ storagePath ในการเก็บข้อมูลในฐานข้อมูลหรือทำงานเพิ่มเติมตามที่คุณต้องการ
    }
}

