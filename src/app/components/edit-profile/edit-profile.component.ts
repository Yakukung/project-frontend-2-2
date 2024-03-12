import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; 
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-edit-profile',
    standalone: true,
    templateUrl: './edit-profile.component.html',
    styleUrl: './edit-profile.component.scss',
    imports: [NavbarComponent, CommonModule, MatButtonModule, HttpClientModule, MatIconModule, MatInputModule,MatFormFieldModule, FormsModule ]
})
export class EditProfileComponent {
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



  backProfile(user_id: string) {
    this.router.navigate(['/profile'], { queryParams: { user_id: this.user_id } });
    }

    onFileSelected(event: any) {
      const file: File = event.target.files[0];

      if (file) {
          console.log('Selected File:', file);
      }
  }

  


  handleFileChange(event: any, index: number, user_id: string, post_id: string) {
    console.log('this.posts:', this.posts);
    console.log('index:', index);
    
    const currentPost = this.posts[index];
    console.log('currentPost:', currentPost);
  
    if (!currentPost || !currentPost.post) {
      console.error('Invalid post or post structure.');
      return;
    }
    
    const fileInput = event.target;
  
    if (fileInput.files && fileInput.files[0]) {
      const selectedFile = fileInput.files[0];
  
      console.log('Selected file name:', selectedFile.name);
  
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      // Replace 'http://localhost:3000' with your actual server URL
      const uploadUrl = `http://localhost:3000/upload/${user_id}/${post_id}`;
  
      this.http.post(uploadUrl, formData).subscribe(
        (response: any) => {
          console.log('File uploaded successfully', response);
          this.updatePostPicture(index, response.url); // Assuming the server returns the URL of the uploaded file
        },
        (error: any) => {
          console.error('Error uploading file', error);
          // Handle error appropriately, e.g., display an error message to the user
        }
      );
    }
  }
  
  updatePostPicture(index: number, imageUrl: string) {
    // Update the post's picture property with the new image URL
    this.posts[index].picture = imageUrl;
  }
  
  
  
  triggerFileInput(index: number) {
    const fileInput = document.getElementById(`file${index}`) as HTMLInputElement;
    fileInput.click();
  }
}  