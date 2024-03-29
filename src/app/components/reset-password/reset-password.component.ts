import { Component } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 
import Swal from 'sweetalert2';
import axios from 'axios';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
  imports: [FormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatStepperModule, ReactiveFormsModule,CommonModule, HttpClientModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
email: any;
  stepper: any;

  constructor(private _formBuilder: FormBuilder, private router: Router,private route: ActivatedRoute, private httpClient: HttpClient) {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', [Validators.required, Validators.email]] // เพิ่ม Validators.email เพื่อตรวจสอบรูปแบบอีเมล
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }


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
  }


  async onSubmit() {

    if (this.firstFormGroup && this.secondFormGroup && 
      this.firstFormGroup.get('firstCtrl') && this.secondFormGroup.get('secondCtrl')) {
    const emailControl = this.firstFormGroup.get('firstCtrl');
    const passwordControl = this.secondFormGroup.get('secondCtrl');

    if (emailControl && passwordControl) {
      const email = emailControl.value;
      const password = passwordControl.value;
      console.log('Email:', email);
      console.log('Password:', password);

      Swal.fire({
        title: "Are you sure you want to reset password?",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/project-web-2-2.appspot.com/o/assets%2Fimg%2Fgif%2Fkurukuru-kururing.gif?alt=media&token=a4623ed0-82b6-4dba-92ca-9004f646fe22",
        imageWidth: 200,
        imageHeight: 200,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
      
      const updateUrl = `http://localhost:3000/facemash/reset-password`;
      const requestBody = { email: email, password: password }; 
      
      this.httpClient.put(updateUrl, requestBody).subscribe(
          (response: any) => {
              console.log('Reset Password successful: ', response);
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
  
  
    } else {
      // กรณีมีข้อมูลไม่ถูกต้อง หรือขาดหายไป
      console.error('Form is invalid. Please fill in all required fields.');
    }
  }

    
  }
  
  
  backSignIn() {
    this.router.navigate(['/signin-or-signup']);
  }
}