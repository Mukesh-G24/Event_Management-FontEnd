import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  user:User;
  userId:number;
  updatedUser:any;
  constructor(private userService:UserService, private route:ActivatedRoute){
    this.userId = + this.route.snapshot.paramMap.get('userId');
    this.getUserDetails(this.userId);
    this.updatedUser = {
      userName:'',
      userEmail:'',
      userPassword:'',
      userContactNumber:''
    }
  }

  getUserDetails(id:number){
    this.userService.getUserById(id).subscribe({
      next:(res)=>{
        this.user = res.body;
        this.updatedUser = res.body;
        console.log("Update user :",this.updatedUser);
        
      },
      error:(error)=>console.log(error)     
    })
  }

  updateProfile(user:any){
    this.userService.updateUser(this.userId,user).subscribe({
      next:(res)=>{
        alert("Profile updated successfully.");
        console.log("user updated");
      },
      error:(error)=>console.log(error) 
    })
  }
}
