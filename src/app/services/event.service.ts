import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})

export class EventService {

  constructor() { }

  private events: Event[] = [
    { id: 1, title: 'Event 1', date: '2023-06-01', location: 'Location 1', description: 'Description 1' },
    { id: 2, title: 'Event 2', date: '2023-08-11', location: 'Location 2', description: 'Description 2' },
    { id: 3, title: 'Event 3', date: '2023-09-03', location: 'Location 3', description: 'Description 3' },
    { id: 4, title: 'Event 4', date: '2023-03-08', location: 'Location 4', description: 'Description 4' },
    { id: 5, title: 'Event 5', date: '2023-04-01', location: 'Location 5', description: 'Description 5' },
    { id: 6, title: 'Event 6', date: '2023-01-12', location: 'Location 6', description: 'Description 6' },
    { id: 7, title: 'Event 7', date: '2023-09-01', location: 'Location 7', description: 'Description 7' },
    // Add more events here
  ];

  getEvents(): Observable<Event[]> {
    return of(this.events);
  }

  getEvent(id: number): Observable<Event | undefined> {
    return of(this.events.find(event => event.id === id));
  }

  addEvent(event: Event): void {
    this.events.push(event);
  }

  updateEvent(event: Event): void {
    const index = this.events.findIndex(e => e.id === event.id);
    if (index !== -1) {
      this.events[index] = event;
    }
  }

  deleteEvent(id: number): void {
    this.events = this.events.filter(event => event.id !== id);
  }

}
