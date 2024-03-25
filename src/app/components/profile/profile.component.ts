import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; 
import {MatIconModule} from '@angular/material/icon';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MatButtonModule, HttpClientModule, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

isHovered: any;
Statistics: any;

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
  user_type: any;
  post_id: any;

  
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
      this.user_type = params['user_type'];
      if (user_id) {
        this.fetchUserData(user_id);
        this.fetchPostData(user_id);
      } else {
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
    const Url = `http://localhost:3000/facemash/profile`;
  
    this.httpClient.post(Url, { user_id })
      .subscribe(
        (response: any) => {
          try {
            if (response.posts) {
              this.posts = JSON.parse(response.posts);

              this.post_id = response.posts.post_id;
              console.log("Post Id:",response.posts.post_id);
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

  iconSize: string = '100px';
  isLikedMap: { [post_id: string]: boolean } = {};

  toggleLike(post_id: string) {
    this.isLikedMap[post_id] = !this.isLikedMap[post_id];
  }


  UploadBanner(event: any, first_name: string, user_id: string) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('first_name', first_name);
        formData.append('user_id', user_id);
        
        const postUrl = `http://localhost:3000/facemash/upload/banner`;
        this.httpClient.post(postUrl, formData).subscribe(
            (response: any) => {
                console.log('Upload successful: ', response);
                Swal.fire({
                  title: `Upload Banner success`,
                  icon: 'success',
                }).then(() => {
                  // จากนั้นทำการรีโหลดหน้าเว็บ
                  window.location.reload();
                });
            },
            (error: any) => {
                console.error('Error uploading file: ', error);
            }
        );
    } else {
        console.error('No file selected');
    }
  }

  UploadIcon(event: any, first_name: string, user_id: string) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('first_name', first_name);
        formData.append('user_id', user_id);
        
        const postUrl = `http://localhost:3000/facemash/upload/icon`;
        this.httpClient.post(postUrl, formData).subscribe(
            (response: any) => {
                console.log('Upload successful: ', response);
                Swal.fire({
                  title: `Upload Icon success`,
                  icon: 'success',
                }).then(() => {
                  // จากนั้นทำการรีโหลดหน้าเว็บ
                  window.location.reload();
                });
            },
            (error: any) => {
                console.error('Error uploading file: ', error);
            }
        );
    } else {
        console.error('No file selected');
    }
}

UploadPost(event: any, user_id: string, first_name: string) {
  const fileInput = event.target as HTMLInputElement;
  if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('user_id', user_id);
      formData.append('first_name', first_name);
      
      const postUrl = `http://localhost:3000/facemash/upload/post`;
      this.httpClient.post(postUrl, formData).subscribe(
          (response: any) => {
              console.log('Upload successful: ', response);
              Swal.fire({
                title: `Upload Banner success`,
                icon: 'success',
              }).then(() => {
                // จากนั้นทำการรีโหลดหน้าเว็บ
                window.location.reload();
              });
          },
          (error: any) => {
              console.error('Error uploading file: ', error);
          }
      );
  } else {
      console.error('No file selected');
  }
}

  


editProfile(user_id: string) {
  this.router.navigate(['/edit-profile'], { queryParams: { user_id: this.user_id ,user_type: this.user_type} });
}

viewStat(user_id: string) {
  this.router.navigate(['/all-stat'], { queryParams: { user_id: this.user_id ,user_type: this.user_type } });
  console.log(this.user_id);
  
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

