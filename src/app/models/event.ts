import { linkedSignal } from "@angular/core";

export interface Event {

    id:number;
    eventName:string;
    eventCategory:string;
    eventLocation:string;
    eventDate:Date;
    eventOrganizerId:number;
    ticketCount:number;
    ticketPrice:number;
}