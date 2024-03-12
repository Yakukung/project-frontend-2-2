import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { MatButtonModule } from '@angular/material/button';
import axios from 'axios';
import { PostPostReq } from '../../../model/posts.post.req';
import {MatChipsModule} from '@angular/material/chips';
@Component({
  selector: 'app-vote',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MatButtonModule, MatChipsModule],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.scss'
})

export class VoteComponent implements OnInit {
  show: PostPostReq[] = [];
  constructor(private router: Router, private route: ActivatedRoute) {
  }



  async ngOnInit() {
    const HOST: string = 'http://localhost:3000';
    const url = `${HOST}/facemash/vote`;
    
    try {
      const response = await axios.post(url);
      
      if (Array.isArray(response.data)) {
        // แปลงข้อมูลให้เป็นอาร์เรย์
        this.show = response.data;
      } else {
        console.error('Invalid data format. Expected an array.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async vote(postId: number) {
    const HOST: string = 'http://localhost:3000';
    const url = `${HOST}/facemash/vote`;
  
    try {
      const response = await axios.put(url, { postId });
      console.log('Vote successfully recorded:', response.data);
  
      this.show = this.show.map(post => {
        if (post.post_id === postId) {
          console.log('Score post_id:', postId);
          if (post.score !== null && post.score !== undefined) {
            // อัปเดตคะแนนสำหรับ post ที่ถูกโหวต
            post.score++;
          } else {
            console.error('Score is null or undefined for post_id:', postId);
          }
        }
        return post;
      });
  
    } catch (error) {
      console.error('Error updating vote:', error);
    }
  }

  async profile(userId: number) {
    const HOST: string = 'http://localhost:3000';
    const url = `${HOST}/facemash/profile`;

    // ทำการโหลดข้อมูลโปรไฟล์ของผู้ใช้
    try {
      const response = await axios.get(url, { params: { userId } });
      const userProfile = response.data;

      // หากต้องการใช้ข้อมูลโปรไฟล์ที่โหลดได้
      // คุณสามารถเรียกฟังก์ชันหรือทำอย่างอื่น ๆ ที่ต้องการใช้ข้อมูลโปรไฟล์ที่นี่

    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }
}

