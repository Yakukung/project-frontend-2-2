// signin-or-signup.component.ts
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { UsersPostReq } from '../../../model/users.post.req';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login-or-signup',
  standalone: true,
  imports: [MatIconModule, MatInputModule, MatFormFieldModule, MatButtonModule, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './signin-or-signup.component.html',
  styleUrls: ['./signin-or-signup.component.scss'],
})
export class SigninOrSignupComponent {
  firstName: any;
  lastName: any;
  email: string = '';
  password: string = '';
  user_type: string = '';

  constructor(private router: Router, private httpClient: HttpClient, private dialog: MatDialog) {}

  getSignUp(firstNameInput: HTMLInputElement, lastNameInput: HTMLInputElement, emailInput: HTMLInputElement, passwordInput: HTMLInputElement) {
    const url = 'https://project-backend-2-2.onrender.com/facemash/signup/';
    const userData = {
      first_name: firstNameInput.value,
      last_name: lastNameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };
  
    console.log(userData);
  
    this.httpClient.post(url, userData).subscribe(
      (response: any) => {
        console.log('User successfully signed up:', response);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Sign Up",
          width: 400,
          padding: "1em",
          color: "#716add",
          background: "#fff",
          backdrop: `
            rgba(0,0,123,0.4)
            url("https://sweetalert2.github.io/images/nyan-cat.gif")
            left top
            no-repeat
          `
        });
      },
      (error: any) => {
        if (error.status === 409) {
          console.error('Email already in use. Please choose a different email.');
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email already in use. Please choose a different email.",
          });
        } else {
          console.error('Error during signup:', error);
        }
      }
    );
  }
  

  async getSignIn(email: string, password: string) {
    const HOST: string = "https://project-backend-2-2.onrender.com";
    const url = `${HOST}/facemash/signin/`;

    const data = {
      email: email,
      password: password
    };

    try {
      const response = await axios.post(url, data);
      const user_signin_success: UsersPostReq[] = response.data;

      console.log("Response from API:", user_signin_success);

      if (user_signin_success.length > 0) {
        console.log("Valid response from API");

        const user_id = user_signin_success[0].user_id;
        const user_type = user_signin_success[0].user_type;

        if (user_id) {
          if (user_type === 'user') {
            this.router.navigate(['/'], { queryParams: { user_id: user_id, user_type: user_type } });
          } else if (user_type === 'admin') {
            this.router.navigate(['/admin-homepage'], { queryParams: { admin_id: user_id, user_type: user_type } });
          } else {
            console.log("Invalid user type");
          }
        } else {
          console.log("Invalid user_id");
        }
      } else {
        console.log("Invalid email or password");
        Swal.fire({
          icon: "error",
          title: "Your email and password are incorrect.",
          text: "Please try again.",
        });
      }

      return user_signin_success;
    } catch (error) {
      console.error("Error during sign-in:", error);
      throw error;
    }
  }
}