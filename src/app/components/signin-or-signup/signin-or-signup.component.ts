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
  successMessage: string = '';
  errorMessage: string = '';
  registeredSuccessfully: boolean = false;

  constructor(private router: Router, private httpClient: HttpClient, private dialog: MatDialog) {}

  getSignUp(firstNameInput: HTMLInputElement, lastNameInput: HTMLInputElement, emailInput: HTMLInputElement, passwordInput: HTMLInputElement) {
    const url = 'http://localhost:3000/facemash/signup/';
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
        this.errorMessage = '';
        this.successMessage = 'Registration successful!';
        this.registeredSuccessfully = true; // Set the flag to true
        setTimeout(() => {
          this.router.navigate(['/']); // Navigate to the same route
        }, 2000); // Delay for 2 seconds before refreshing
      },
      (error: any) => {
        if (error.status === 409) {
          this.successMessage = ''; // Reset success message
          console.error('Email already in use. Please choose a different email.');
          this.errorMessage = 'Email already in use. Please choose a different email.';
        } else {
          console.error('Error during signup:', error);
        }
      }
    );
  }
  

  async getSignIn(email: string, password: string) {
    const HOST: string = "http://localhost:3000";
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
            this.router.navigate(['/homepage'], { queryParams: { user_id: user_id } });
          } else if (user_type === 'admin') {
            this.router.navigate(['/admin-homepage'], { queryParams: { user_id: user_id } });
          } else {
            console.log("Invalid user type");
          }
        } else {
          console.log("Invalid user_id");
        }
      } else {
        console.log("Invalid email or password");
      }

      return user_signin_success;
    } catch (error) {
      console.error("Error during sign-in:", error);
      throw error;
    }
  }
}