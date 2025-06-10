// import { Component, OnInit } from '@angular/core';
// import { RouterLink, RouterOutlet, Router } from '@angular/router';
// import { Event } from '../models/event';
// import { EventService } from '../services/event.service';
// import { CommonModule } from '@angular/common';
// import { AuthService } from '../services/auth.service';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-events',
//   imports: [CommonModule,FormsModule],
//   templateUrl: './events.component.html',
//   styleUrl: './events.component.css'
// })
// export class EventsComponent implements OnInit {

//   allEvents:Event[];
//   selectedEvent:Event;
//   eventData:any;
//   quantityToBook: number = 1;
//   isBooking:boolean=false;

//   constructor(private service:EventService, public authService:AuthService, private route:Router){

//     this.eventData = {
//       eventName:'',
//       eventCategory:'',
//       eventLocation:'',
//       eventDate:null,
//       eventOrganizerId:authService.getUserId(),
//       ticketCount:0,
//       ticketPrice:0
//     };
//   }

//   ngOnInit(): void {

//     this.authService.userRole$.subscribe({
//       next:(role)=>{
//         if(role == 'User'){
//           this.getAllEvents();
//         }
//         else if(role == 'Organizer'){
//           this.getEventsByOrganizerId();
//         }
//       }
//     })

//     this.authService.isAuthenticated$.subscribe({
//       next:(isLoggedIn)=>{
//         if(!isLoggedIn){
//           this.getAllEvents();
//         }
//       }
//     })

//     if(this.authService.isAuthenticated$){
//       this.authService.emitUserRole();
//     }
//   }

//   bookEvent(event:Event){
//     this.isBooking = true;
//     console.log("Booking details");
//     const bookingData = {
//       eventId:event.id,
//       userId:this.authService.getUserId(),
//       noOfTickets:this.quantityToBook
//     }
//     console.log(event);
//     this.service.bookEvent(bookingData).subscribe({
//       next:(res)=>{
//         console.log(res);
//         this.isBooking=true;
//       },
//       error:(error)=>console.log(error)
//     })
//   }

//   addEvent(event){
//     console.log("Adding event :");
//     this.service.addEvent(event).subscribe({
//       next:(res)=>console.log(res),
//       error:(error)=>console.log(error)
//     });
//     this.getAllEvents();
//   }

//   getAllEvents(){
//     this.service.getAllEvents().subscribe({
//       next:(data)=>{
//         console.log(data.body);
//         this.allEvents = data.body;
//       },
//       error:(error)=>console.log(error)
//     })
//   }

//   getEventsByOrganizerId(){
//     this.service.getEventByOrganizerId(this.authService.getUserId()).subscribe({
//       next:(res)=>{
//         this.allEvents = res.body;
//       }
//     })
//   }

//   updateEvent(event:Event){
//     console.log(event);
//     this.service.updateEvent(event).subscribe({
//       next:(res)=>{
//         console.log(res);
//         this.authService.userRole$.subscribe({
//           next:(role)=>{
//             if(role == 'User'){
//               this.getAllEvents();
//             }
//             else if(role == 'Organizer'){
//               this.getEventsByOrganizerId();
//             }
//           }
//         })
//       },
//       error:(error)=>console.log(error)
//     });
//   }

//   deleteEvent(id:number){
//     if(confirm("Are you really want to delete this event ?"))
//     {
//       this.service.deleteEvent(id).subscribe({
//         next:(res)=>{
//           console.log("deletion success");

//           console.log(res);
//           console.log("fetching all events....");

//           this.getAllEvents();
//         },
//         error:(error)=>console.log(error)
//       })
//     }

//   }

//   selectEvent(event:Event){
//     this.selectedEvent = {...event};
//     this.quantityToBook = 1;

//     if (this.selectedEvent.ticketCount < this.quantityToBook) {
//         this.quantityToBook = this.selectedEvent.ticketCount;
//     }
//     if (this.quantityToBook > 10) {
//         this.quantityToBook = 10;
//     }
//     if (this.selectedEvent.ticketCount === 0) {
//         this.quantityToBook = 0;
//     }
//   }

//   onQuantityChange(): void {

//     console.log("Selected quantity:", this.quantityToBook);
//      const maxAllowed = Math.min(10, this.selectedEvent?.ticketCount || 1);
//     if (this.quantityToBook > maxAllowed) {
//         this.quantityToBook = maxAllowed;
//     }
//     if (this.quantityToBook < 1 && (this.selectedEvent?.ticketCount || 0) > 0) {
//         this.quantityToBook = 1;
//     }
//     if (this.selectedEvent && this.selectedEvent.ticketCount === 0) {
//         this.quantityToBook = 0;
//     }
// }

//   navigateToLogin(){
//     this.route.navigate(["/login"]);
//   }

// }

  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { Event } from '../models/event';
  import { EventService } from '../services/event.service';
  import { CommonModule } from '@angular/common';
  import { AuthService } from '../services/auth.service';
  import { FormsModule } from '@angular/forms';
import { BookingDetails } from '../models/booking-details';

  declare var Razorpay: any; 

  @Component({
    selector: 'app-events',
    imports: [CommonModule, FormsModule],
    templateUrl: './events.component.html',
    styleUrl: './events.component.css',
  })
  export class EventsComponent implements OnInit {
    allEvents: Event[];
    selectedEvent: Event;
    eventData: any;
    quantityToBook: number = 1;
    isBooking: boolean = false;
    selectedCategory: string;
    selectedDate: null;
    selectedLocation: string;
    filteredEvents:Event[];

    constructor(
      private service: EventService,
      public authService: AuthService,
      private route: Router
    ) {
      this.eventData = {
        eventName: '',
        eventCategory: '',
        eventLocation: '',
        eventDate: null,
        eventOrganizerId: authService.getUserId(),
        ticketCount: 0,
        ticketPrice: 0,
      };
    }

    ngOnInit(): void {
      this.loadRazorpayScript();

      this.authService.userRole$.subscribe({
        next: (role) => {
          if (role == 'User') {
            this.getAllEvents();
          } else if (role == 'Organizer') {
            this.getEventsByOrganizerId();
          }
        },
      });

      this.authService.isAuthenticated$.subscribe({
        next: (isLoggedIn) => {
          if (!isLoggedIn) {
            this.getAllEvents();
          }
        },
      });

      if (this.authService.isAuthenticated$) {
        this.authService.emitUserRole();
      }
    }



    loadRazorpayScript() {
      if (typeof Razorpay === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          console.log('Razorpay script loaded successfully');
        };
        document.body.appendChild(script);
      }
    }

    bookEvent(event: Event) {
      this.isBooking = true;
      console.log('Initiating payment...');

      const amount = event.ticketPrice * this.quantityToBook;
      if (amount <= 0) {
        alert('Invalid payment amount! Please select a valid package.');
        return;
      }

      const options = {
        key: 'rzp_test_mMYCMsqoLV36CI',
        amount: amount * 100, // Convert to paise
        currency: 'INR',
        name: 'EasyTrips',
        description: `Booking for ${event.eventName}`,
        image: 'pic2.jpg',
        handler: (response: any) => {
          console.log('Payment successful', response);
          this.processPayment(response.razorpay_payment_id, event);
        },
        prefill: {
          name: 'UserName',
          email: 'user@gmail.com',
          contact: '9342839696',
        },
        theme: {
          color: '#f0ad4e',
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    }

    processPayment(transactionId: string, event: Event) {
      console.log('Processing payment with transaction ID:', transactionId);

      const bookingData = {
        eventId: event.id,
        userId: this.authService.getUserId(),
        noOfTickets: this.quantityToBook,
        transactionId: transactionId,
        status: 'PAID',
      };

      this.service.bookEvent(bookingData).subscribe({
        next: (res) => {
          console.log('Booking confirmed:', res);
          alert('Payment Successful! Booking Confirmed.');
          this.isBooking = false;
          // this.route.navigate(['/booking-confirmation']);
        },
        error: (error) => {
          console.error('Error saving booking:', error);
          alert(
            "Payment was successful, but we couldn't save the booking. Please contact support."
          );
        },
      });
    }

    getAllEvents() {
      this.service.getAllEvents().subscribe({
        next: (data) => {
          console.log(data.body);
          this.allEvents = data.body;
          this.filteredEvents = this.allEvents;
        },
        error: (error) => console.log(error),
      });
    }

    getEventsByOrganizerId() {
      this.service.getEventByOrganizerId(this.authService.getUserId()).subscribe({
        next: (res) => {
          this.allEvents = res.body;
        },
      });
    }

    selectEvent(event: Event) {
      this.selectedEvent = { ...event };
      this.quantityToBook = 1;

      if (this.selectedEvent.ticketCount < this.quantityToBook) {
        this.quantityToBook = this.selectedEvent.ticketCount;
      }
      if (this.quantityToBook > 10) {
        this.quantityToBook = 10;
      }
      if (this.selectedEvent.ticketCount === 0) {
        this.quantityToBook = 0;
      }
    }

    onQuantityChange(): void {
      console.log('Selected quantity:', this.quantityToBook);
      const maxAllowed = Math.min(10, this.selectedEvent?.ticketCount || 1);
      if (this.quantityToBook > maxAllowed) {
        this.quantityToBook = maxAllowed;
      }
      if (this.quantityToBook < 1 && (this.selectedEvent?.ticketCount || 0) > 0) {
        this.quantityToBook = 1;
      }
      if (this.selectedEvent && this.selectedEvent.ticketCount === 0) {
        this.quantityToBook = 0;
      }
    }

    navigateToLogin() {
      this.route.navigate(['/login']);
    }
    deleteEvent(id: number) {
      if (confirm('Are you really want to delete this event ?')) {
        this.service.deleteEvent(id).subscribe({
          next: (res) => {
            console.log('deletion success');

            console.log(res);
            console.log('fetching all events....');

            this.getAllEvents();
          },
          error: (error) => console.log(error),
        });
      }
    }

    addEvent(event) {
      console.log('Adding event :');
      this.service.addEvent(event).subscribe({
        next: (res) => console.log(res),
        error: (error) => console.log(error),
      });
      this.getAllEvents();
    }

    updateEvent(event: Event) {
      console.log(event);
      this.service.updateEvent(event).subscribe({
        next: (res) => {
          console.log(res);
          this.authService.userRole$.subscribe({
            next: (role) => {
              if (role == 'User') {
                this.getAllEvents();
              } else if (role == 'Organizer') {
                this.getEventsByOrganizerId();
              }
            },
          });
        },
        error: (error) => console.log(error),
      });
    }

    applyFilters(){
      this.filteredEvents = this.allEvents.filter(event => {
        const matchesCategory = this.selectedCategory
          ? event.eventCategory.toLowerCase().includes(this.selectedCategory.toLowerCase())
          : true;
    
        const matchesDate = this.selectedDate
          ? new Date(event.eventDate).toISOString().split('T')[0] === this.selectedDate // Ensure proper date conversion
          : true;
    
        const matchesLocation = this.selectedLocation
          ? event.eventLocation.toLowerCase().includes(this.selectedLocation.toLowerCase())
          : true;
    
        return matchesCategory && matchesDate && matchesLocation; // Check all filters
      });
    }

    clearFilters(){
      this.selectedCategory='';
      this.selectedDate=null;
      this.selectedLocation='';
      this.filteredEvents = this.allEvents;
    }
  }



