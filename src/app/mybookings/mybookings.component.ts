import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../services/bookings.service';

@Component({
  selector: 'app-mybookings',
  imports: [CommonModule],
  templateUrl: './mybookings.component.html',
  styleUrl: './mybookings.component.css'
})
export class MybookingsComponent implements OnInit {
  
  constructor(private service:BookingsService){}

  ngOnInit(): void {
    this.getMyTickets();
  }

  getMyTickets(){
    this.service.getMyTickets().subscribe({
      next:(res)=>console.log(res),
      error:(error)=>console.log(error)   
    })
  }
}
