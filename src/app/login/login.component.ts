import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username:any="";
  password:any="";
  
  constructor(private auth:AuthService, private route:Router){}
  login(){

    let   credentials={
      "username":this.username,
      "password":this.password
    } 
    this.auth.login(credentials).subscribe(data=>console.log("Data "+data));
    this.route.navigate([""]);
  }
}
