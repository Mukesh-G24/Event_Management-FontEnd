import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { RegistrationService } from '../services/registration.service';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;  
  constructor(private fb: FormBuilder,private router:Router,private registration:RegistrationService,private auth:AuthService) { }
 
  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required],
      contactNumber: ['', Validators.required],
      role: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }
 
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password').value;
    const passwordRepeat = form.get('passwordRepeat').value;
    return password === passwordRepeat ? null : { mismatch: true };
  }
 
  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log('Form Submitted!', this.registrationForm.value);
      const user:User={
        userName : this.registrationForm.value.username,
        userEmail : this.registrationForm.value.email,
        userPassword : this.registrationForm.value.password,
        userContactNumber : this.registrationForm.value.contactNumber,
        role : this.registrationForm.value.role
      }

      const userAuth ={
        name:this.registrationForm.value.username,
        email:this.registrationForm.value.email,
        password:this.registrationForm.value.password,
        roles:this.registrationForm.value.role
      }

      console.log(userAuth);
      
      let isAuthRegistered = false;
      this.registration.authRegisteration(userAuth).subscribe({
        next : (data) => {
                console.log(data);
                console.log(data.body);
              if(data.body === "Registration Successfully"){
                  this.registration.userRegistration(user).subscribe({
                    next : (data)=>{
                      console.log("User Registratin Details :");
                      console.log(data);
                      console.log(data.body);
                      this.router.navigate(["/login"]);
                    },
                    error : (error)=>{
                      console.log("User registration error");
                      console.log(error);
                    }
                  })
                }
        },
        error : (error) => {
          console.log("Observable Error =");
          console.log(error)}
      });      
    }
  
  }
 
  onReset(): void {
    this.registrationForm.reset();
  }
}
