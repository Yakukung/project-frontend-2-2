import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import axios from 'axios';
import Swal from 'sweetalert2';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vote',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MatButtonModule, MatFormFieldModule,MatInputModule, MatSelectModule, FormsModule],
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
})
export class VoteComponent implements OnInit {
  show: any[] = [];
  K: number = 32;
  PictureID: number[] = [];
  user_id: any;
  checkSignin: any = '';
  colorControl: any;
  response: any;
  time_delay: any;
  timerDuration: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) {}

  async ngOnInit() {
 
    const HOST: string = 'https://project-backend-2-2.onrender.com';
    const url = `${HOST}/facemash/vote/get-timer-duration`;
  
    try {
      const response = await this.httpClient.get(url).toPromise();
      console.log('Response from server:', response);
      this.response = response;
      this.timerDuration = (response as any).timerDuration; // Update timerDuration directly
      console.log("timerDuration:", this.timerDuration);
      
    } catch (error) {
      console.error('Error fetching timerDuration:', error);
    }

    let timerInterval: string | number | NodeJS.Timeout | undefined;
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
        this.checkSignin = user_id;
      }
    });

    try {
      const HOST: string = 'https://project-backend-2-2.onrender.com';
      const url = `${HOST}/facemash/vote`;

      const response = await axios.get(url);

      if (Array.isArray(response.data)) {
        this.show = response.data;
        this.PictureID = [this.show[0].post_id, this.show[1].post_id];
      } else {
        console.error('Invalid data format. Expected an array.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  

  async vote(winnerPostId: number, loserPostId: number, votedSide: string) {
    const URL = 'https://project-backend-2-2.onrender.com/facemash/vote';
    let timerInterval: string | number | NodeJS.Timeout | undefined;

    Swal.fire({
      background:
        '#fff url(https://firebasestorage.googleapis.com/v0/b/project-web-2-2.appspot.com/o/assets%2Fimg%2Fgif%2Fkurukuru-kururing.gif?alt=media&token=a4623ed0-82b6-4dba-92ca-9004f646fe22) center center/contain no-repeat',
      html: "<div style='position: absolute; top: 20px; left: 50%; transform: translateX(-50%); width: 100%; text-align: center;'>I will close in <b></b> milliseconds.</div>",
      padding: '4rem',
      timer: parseInt(this.timerDuration), // or parseFloat(this.timerDuration)
      timerProgressBar: true,
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        const popup = Swal.getPopup();
        if (popup) {
          // Check if popup is not null
          const timer = popup.querySelector('b');
          if (timer) {
            // Check if timer is not null
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          }
        }
      },
      willClose: () => {
        if (timerInterval) {
          clearInterval(timerInterval);
        }
      },
      
    }).then(async (result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer');
      }
      // Swal.fire({
      //   title: `You vote on the ${votedSide}`,
      //   text: `Post ID Winer: ${winnerPostId}`,
        
      //   icon: 'success',
      // }).then(() => {
      //   // จากนั้นทำการรีโหลดหน้าเว็บ
      //   window.location.reload();
      // });
      // window.addEventListener('load', () => {
      //   Swal.close();
      // });

      try {
        const response = await axios.post(URL, { winnerPostId, loserPostId });
        console.log('Response data:', response.data);
        console.log('Message:', response.data.message);
        console.log('Updated winner:', response.data.updatedWinner);
        console.log('Updated loser:', response.data.updatedLoser);
        console.log('After update log:', response.data.afterUpdateLog);
        
        // หากต้องการใช้ข้อมูลในแอพพลิเคชันหรือเว็บไซต์
        const message = response.data.message;
        const updatedWinner = response.data.updatedWinner;
        const updatedLoser = response.data.updatedLoser;
        const afterUpdateLog = response.data.afterUpdateLog;
        
        // ตัวอย่างการเข้าถึงข้อมูล
        console.log('Message:', message);
        console.log('Winner Post ID:', updatedWinner.postId);
        console.log('New Rating of Winner:', updatedWinner.newRating);
        console.log('Old Rating of Winner:', updatedWinner.oldRating);
        console.log('Loser Post ID:', updatedLoser.postId);
        console.log('New Rating of Loser:', updatedLoser.newRating);
        console.log('Old Rating of Loser:', updatedLoser.oldRating);
        console.log('After update log:', afterUpdateLog);

      Swal.fire({
        title: `You vote Post  ${response.data.updatedWinner.postId} on the ${votedSide}`,
        text: `Old Score Winner: ${response.data.updatedWinner.oldRating}
                    New Score Winner: ${response.data.updatedWinner.newRating}`,
        icon: 'success',
      }).then(() => {
        // หลังจากที่ผู้ใช้กด OK ใน Swal ให้ทำการรีโหลดหน้าเว็บ
        window.location.reload();
      });

        // const {
        //   updatedWinner,
        //   updatedEloRatingWinner,
        //   updatedLoser,
        //   updatedEloRatingLoser,
        // } = response.data;

        // if (updatedWinner && updatedLoser) {
        //   const postArray = this.show;
        //   const updatedPosts = [updatedWinner, updatedLoser];
        //   const newRatings = [
        //     updatedEloRatingWinner.newRating,
        //     updatedEloRatingLoser.newRating,
        //   ];

        // สร้าง Map ของโพสต์โดยใช้ post_id เป็น key
        // const postMap = new Map(postArray.map(post => [post.post_id, post]));

        // ใช้ forEach เพื่อดำเนินการกับแต่ละ updatedPost
        // updatedPosts.forEach((updatedPost, index) => {
        //     // ค้นหาโพสต์ใน postMap โดยใช้ post_id เป็น key
        //     const post = postMap.get(updatedPost.post_id);

        //     // ตรวจสอบว่าโพสต์พบหรือไม่
        //     if (post) {
        //         const oldScore = post.score;
        //         post.score = newRatings[index];
        //         console.log(`Post ID: ${updatedPost.post_id}, Old Score: ${oldScore}, New Score: ${newRatings[index]}`);

        //         // แสดง Alert หากคะแนนใหม่มากกว่าคะแนนเดิม
        //         if (oldScore && newRatings[index] > oldScore) {
        //             Swal.fire({
        //                 title: `You Vote Post ID: ${updatedPost.post_id}`,
        //                 text: `Old Score: ${oldScore}, New Score: ${newRatings[index]}`,
        //                 icon: "success"
        //             });
        //         }
        //     }
        // });
        // }
      } catch (error) {
        console.error('Error processing vote:', error);
      }
    });
  }

  async profile(userId: number) {
    const HOST: string = 'https://project-backend-2-2.onrender.com';
    const url = `${HOST}/facemash/profile`;

    try {
      const response = await axios.get(url, { params: { userId } });
      const userProfile = response.data;

    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }
}
