import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username:any="Prem";
  password:any="prem@password";


  constructor(private auth:AuthService){}


  login(){

    let   credentials={
      "username":this.username,
      "password":this.password
    } 
    console.log(this.auth.login(credentials).subscribe(data=>console.log("Data "+data)));
  }
}
