import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Event } from '../models/event';
import { EventService } from '../services/event.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  imports: [CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {

  events:Event[];
  available:Boolean = false;
  
  constructor(private service:EventService){}

  ngOnInit(): void {
    // this.getAllEvents();
  }

  getAllEvents(){
    this.service.getAllEvents().subscribe({
      next:(data)=>{
        console.log(data.body);
        this.events = data.body;
        this.available=true;
      },
      error:(error)=>console.log(error)
    })
  }

}
