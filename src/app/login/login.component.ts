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


import { Component, OnInit } from '@angular/core'; // Import OnInit
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule and form classes
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  // Make sure to add ReactiveFormsModule to imports for standalone components
  // If not a standalone component, ensure ReactiveFormsModule is imported in your AppModule
  standalone: true, // Assuming this is a standalone component
  imports: [ReactiveFormsModule], // Import ReactiveFormsModule here
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit { // Implement OnInit

  loginForm!: FormGroup; // Declare a FormGroup to hold our form controls

  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit(): void {
    // Initialize the FormGroup in ngOnInit
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  login() {
    if (this.loginForm.valid) { // Check if the form is valid before submitting
      const credentials = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };

      this.auth.login(credentials).subscribe(
        data => {
          console.log("Login successful: ", data);
          this.route.navigate([""]); // Navigate on successful login
        },
        error => {
          console.error("Login failed: ", error);
          // Handle login error (e.g., display an error message to the user)
        }
      );
    } else {
      // If the form is invalid, mark all fields as touched to display validation messages
      this.loginForm.markAllAsTouched();
      console.log("Form is invalid. Please check the fields.");
    }
  }
}