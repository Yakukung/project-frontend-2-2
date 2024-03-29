import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; 
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-edit-profile',
    standalone: true,
    templateUrl: './edit-profile.component.html',
    styleUrl: './edit-profile.component.scss',
    imports: [NavbarComponent, CommonModule, MatButtonModule, HttpClientModule, MatIconModule, MatInputModule,MatFormFieldModule, FormsModule ]
})
export class EditProfileComponent {
Array(arg0: number) {
throw new Error('Method not implemented.');
}
  email: string = '';
  password: string = '';
  first_name: string = '';
  last_name: string = '';
  user_id: string = '';
  banner: string = '';
  icon: string = '';
  about: string = '';
  posts: any[] = [];
  aboutForm: any;
  http: any;
  user_type: any;
  fileInput: any;
  noData: any;
  iconUrl: string = '';

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
      this.user_id = params['user_id'];
      this.user_type = params['user_type'];
      if (this.user_id) {
        this.fetchUserData(this.user_id);
        this.fetchPostData(this.user_id);
      }
    });
  }

  fetchUserData(user_id: string) {
    const url = `https://project-backend-2-2.onrender.com/facemash/navbar`;

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


        console.log('Response:', response);
        console.log('Posts before:', this.posts);

      },
      (error: any) => {
        console.error("Error fetching user data:", error);
      }
    );
  }
  fetchPostData(user_id: string) {
    const postUrl = `https://project-backend-2-2.onrender.com/facemash/profile`;
  
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



  backProfile(user_id: string) {
    this.router.navigate(['/profile'], { queryParams: { user_id: this.user_id ,user_type: this.user_type } });
    }

    updateFirstname(first_name: string, user_id: string) {
      console.log("first_name: ", first_name);
      console.log("user_id: ", user_id);


      Swal.fire({
        title: "Are you sure you want to update this firstname?",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/project-web-2-2.appspot.com/o/assets%2Fimg%2Fgif%2Fkurukuru-kururing.gif?alt=media&token=a4623ed0-82b6-4dba-92ca-9004f646fe22",
        imageWidth: 200,
        imageHeight: 200,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
      
      const updateUrl = `https://project-backend-2-2.onrender.com/facemash/upload/firstname`;
      const requestBody = { first_name: first_name, user_id: user_id }; 
      
      this.httpClient.put(updateUrl, requestBody).subscribe(
          (response: any) => {
              console.log('Update Firstname successful: ', response);
              Swal.fire({
                title: `Update Firstname success`,
                icon: 'success',
              }).then(() => {
                window.location.reload();
              });
          },
          (error: any) => {
              console.error('Error updating firstname: ', error);
            }
            );
          }
      });
    }

    updateLastname(last_name: string, user_id: string) {
      console.log("last_name: ", last_name);
      console.log("user_id: ", user_id);

      Swal.fire({
        title: "Are you sure you want to update this lastname?",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/project-web-2-2.appspot.com/o/assets%2Fimg%2Fgif%2Fkurukuru-kururing.gif?alt=media&token=a4623ed0-82b6-4dba-92ca-9004f646fe22",
        imageWidth: 200,
        imageHeight: 200,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
      
      const updateUrl = `https://project-backend-2-2.onrender.com/facemash/upload/lastname`;
      const requestBody = { last_name: last_name, user_id: user_id }; 
      
      this.httpClient.put(updateUrl, requestBody).subscribe(
          (response: any) => {
              console.log('Update Lastname successful: ', response);
              Swal.fire({
                title: `Update Lastname success`,
                icon: 'success',
              }).then(() => {
                window.location.reload();
              });
          },
          (error: any) => {
              console.error('Error updating firstname: ', error);
            }
            );
          }
      });
    }

    updateEmail(email: string, user_id: string) {
      console.log("email: ", email);
      console.log("user_id: ", user_id);

      Swal.fire({
        title: "Are you sure you want to update this email?",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/project-web-2-2.appspot.com/o/assets%2Fimg%2Fgif%2Fkurukuru-kururing.gif?alt=media&token=a4623ed0-82b6-4dba-92ca-9004f646fe22",
        imageWidth: 200,
        imageHeight: 200,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
      
      const updateUrl = `https://project-backend-2-2.onrender.com/facemash/upload/email`;
      const requestBody = { email: email, user_id: user_id }; 
      
      this.httpClient.put(updateUrl, requestBody).subscribe(
          (response: any) => {
              console.log('Update Email successful: ', response);
              Swal.fire({
                title: `Update Email success`,
                icon: 'success',
              }).then(() => {
                window.location.reload();
              });
          },
          (error: any) => {
              console.error('Error updating firstname: ', error);
            }
            );
          }
      });
    }
    updatePassword(password: string, user_id: string) {
      console.log("password: ", password);
      console.log("user_id: ", user_id);

      Swal.fire({
        title: "Are you sure you want to update this password?",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/project-web-2-2.appspot.com/o/assets%2Fimg%2Fgif%2Fkurukuru-kururing.gif?alt=media&token=a4623ed0-82b6-4dba-92ca-9004f646fe22",
        imageWidth: 200,
        imageHeight: 200,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
      
      const updateUrl = `https://project-backend-2-2.onrender.com/facemash/upload/password`;
      const requestBody = { password: password, user_id: user_id }; 
      
      this.httpClient.put(updateUrl, requestBody).subscribe(
          (response: any) => {
              console.log('Update Password successful: ', response);
              Swal.fire({
                title: `Update Password success`,
                icon: 'success',
              }).then(() => {
                window.location.reload();
              });
          },
          (error: any) => {
              console.error('Error updating firstname: ', error);
            }
            );
          }
      });
    }
    updateAbout(about: string, user_id: string) {
      console.log("about: ", about);
      console.log("user_id: ", user_id);

      Swal.fire({
        title: "Are you sure you want to update this about?",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/project-web-2-2.appspot.com/o/assets%2Fimg%2Fgif%2Fkurukuru-kururing.gif?alt=media&token=a4623ed0-82b6-4dba-92ca-9004f646fe22",
        imageWidth: 200,
        imageHeight: 200,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
  
      const updateUrl = `https://project-backend-2-2.onrender.com/facemash/upload/about`;
      const requestBody = { about: about, user_id: user_id };
  
      this.httpClient.put(updateUrl, requestBody).subscribe(
          (response: any) => {
              console.log('Update About successful: ', response);
              Swal.fire({
                  title: `Update About success`,
                  icon: 'success',
              }).then(() => {
                  window.location.reload();
              });
          },
          (error: any) => {
              console.error('Error updating about: ', error);
            }
            );
          }
      });
  }

  deleteIcon(icon: string, user_id: string) {
    console.log("icon: ", icon);
    console.log("user_id: ", user_id);
    Swal.fire({
      title: "Are you sure you want to delete this icon?",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/project-web-2-2.appspot.com/o/assets%2Fimg%2Fgif%2Fkurukuru-kururing.gif?alt=media&token=a4623ed0-82b6-4dba-92ca-9004f646fe22",
      imageWidth: 200,
      imageHeight: 200,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        const updateUrl = `https://project-backend-2-2.onrender.com/facemash/upload/delete-icon?user_id=${user_id}`;

        this.httpClient.delete(updateUrl).subscribe(
            (response: any) => {
                console.log('Delete icon successful: ', response);
                Swal.fire({
                  title: `Delete Icon success`,
                  icon: 'success',
              }).then(() => {
                  window.location.reload();
              });
            },
            (error: any) => {
                console.error('Error deleting icon: ', error);
            }
        );
      }
    });

    
}
  deleteBanner(banner: string, user_id: string) {
    console.log("banner: ", banner);
    console.log("user_id: ", user_id);
    Swal.fire({
      title: "Are you sure you want to delete this Banner?",
      imageUrl: "https://firebasestorage.googleapis.com/v0/b/project-web-2-2.appspot.com/o/assets%2Fimg%2Fgif%2Fkurukuru-kururing.gif?alt=media&token=a4623ed0-82b6-4dba-92ca-9004f646fe22",
      imageWidth: 200,
      imageHeight: 200,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        const updateUrl = `https://project-backend-2-2.onrender.com/facemash/upload/delete-banner?user_id=${user_id}`;

        this.httpClient.delete(updateUrl).subscribe(
            (response: any) => {
                console.log('Delete Banner successful: ', response);
                Swal.fire({
                  title: `Delete Banner success`,
                  icon: 'success',
              }).then(() => {
                  window.location.reload();
              });
            },
            (error: any) => {
                console.error('Error deleting icon: ', error);
            }
        );
      }
    });

  
}

deletePost(post_id: string, user_id: string) {
  console.log("post_id: ", post_id);
  console.log("user_id: ", user_id);

  Swal.fire({
    title: `Are you sure you want to delete this Post?`,
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/project-web-2-2.appspot.com/o/assets%2Fimg%2Fgif%2Fkurukuru-kururing.gif?alt=media&token=a4623ed0-82b6-4dba-92ca-9004f646fe22",
    imageWidth: 200,
    imageHeight: 200,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes"
  }).then((result) => {
    if (result.isConfirmed) {
      const updateUrl = `https://project-backend-2-2.onrender.com/facemash/upload/delete-post?post_id=${post_id}`;

      this.httpClient.delete(updateUrl).subscribe(
          (response: any) => {
              console.log('Delete Post successful: ', response);
              Swal.fire({
                title: `Delete Post success`,
                icon: 'success',
            }).then(() => {
                window.location.reload();
            });
          },
          (error: any) => {
              console.error('Error deleting Post: ', error);
          }
      );
    }
  });
  
}


  
    
    
    
    
  

UploadIcon(event: any, first_name: string, user_id: string) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('first_name', first_name);
        formData.append('user_id', user_id);
        
        const postUrl = `https://project-backend-2-2.onrender.com/facemash/upload/icon`;
        this.httpClient.post(postUrl, formData).subscribe(
            (response: any) => {
                console.log('Upload successful: ', response);
                this.iconUrl = response.iconUrl;
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

UploadBanner(event: any, first_name: string, user_id: string) {
  const fileInput = event.target as HTMLInputElement;
  if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('first_name', first_name);
      formData.append('user_id', user_id);
      
      const postUrl = `https://project-backend-2-2.onrender.com/facemash/upload/banner`;
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



UploadPost(event: any, index: number, user_id: string, post_id: string, first_name: string) {
  const fileInput = event.target as HTMLInputElement;
  if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('post_id', post_id);
      formData.append('user_id', user_id);
      formData.append('first_name', first_name);
      
      const postUrl = `https://project-backend-2-2.onrender.com/facemash/upload/post`;
      this.httpClient.post(postUrl, formData).subscribe(
          (response: any) => {
              console.log('Upload successful: ', response);
              Swal.fire({
                title: `Upload Post success`,
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




  
addNewPost() {
  const newPost = { picture: '', post_id: null }; // สร้างโพสต์ใหม่ที่มีข้อมูลว่าง
  this.posts.push(newPost); // เพิ่มโพสต์ใหม่เข้าไปในอาร์เรย์
}


  updatePostPicture(index: number, imageUrl: string) {
    this.posts[index].picture = imageUrl;
  }
  
  
  
  triggerFileInput(index: number) {
    const fileInput = document.getElementById(`file${index}`) as HTMLInputElement;
    fileInput.click();
  }
}  