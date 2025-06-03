import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  authService: any;

  constructor(private service:AuthService, private route:Router){    
    this.authService = service;
    console.log(this.authService);
  }

  onLogout(){
    this.service.logout();
    this.route.navigate(["/login"]);
  }
}
