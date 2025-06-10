// import { Component } from '@angular/core';
// import { FormsModule} from '@angular/forms';
// import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   imports: [FormsModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent {

//   username:any="";
//   password:any="";

  
//   constructor(private auth:AuthService, private route:Router){}




//   login(){

//     let   credentials={
//       "username":this.username,
//       "password":this.password
//     } 
//     this.auth.login(credentials).subscribe(data=>console.log("Data "+data));
//     this.route.navigate([""]);
//   }
// }


import { Component, OnInit } from '@angular/core'; 
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr'; 


@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit { 

  loginForm!: FormGroup; 
  errorMessge:string;
  constructor(private auth: AuthService, private route: Router, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  login() {
    if (this.loginForm.valid) { 
      const credentials = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };

      this.auth.login(credentials).subscribe(
        data => {
          console.log("Login successful: ", data);
          this.toastr.success('Logged in successfully!', 'Success');
          console.log("toastr executed...");
          
          this.route.navigate([""]); 
        },
        error => {
          console.error("Login failed: ", error);
          this.errorMessge = "invalid username or passowrd";
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
      console.log("Form is invalid. Please check the fields.");
    }
  }
}