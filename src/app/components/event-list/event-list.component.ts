import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService, Event } from 'src/app/services/event.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatPaginatorModule, MatFormFieldModule, MatInputModule],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  paginatedEvents:any = [];
  filteredEvents:any = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
   
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
      this.filteredEvents = this.events;
      this.paginatedEvents = this.filteredEvents.slice(0, this.pageSize);
    });
  }

  applyFilter(event:any) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredEvents = this.events.filter(event =>
      event.title.toLowerCase().includes(filterValue) || event.location.toLowerCase().includes(filterValue)
    );
    this.paginatedEvents = this.filteredEvents.slice(0, this.pageSize);
  }

 
  onPageChange(event: any) {
    console.log("calling");
    
    const startIndex = event.pageIndex * this.pageSize;
    this.paginatedEvents = this.events.slice(startIndex, startIndex + this.pageSize);
  }

  deleteEvent(id: number): void {
    this.eventService.deleteEvent(id);
    this.loadEvents();
  }
}
