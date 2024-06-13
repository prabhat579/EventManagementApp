import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EventService, Event } from 'src/app/services/event.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup;
  eventId: number | null = null;
  submit:boolean=false;
  heading:string="Add Event"

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.heading = "Edit Event"
      this.eventId = Number(id);
      this.eventService.getEvent(this.eventId).subscribe(event => {
        if (event) {
          this.eventForm.patchValue(event);
        }
      });
    }
  }

  ErrorMsg = {
    title:{
      required:"Title is required"
    },
    location:{
      required:"Location is required"
    },
    date:{
      required:"Date is required"
    },
    description:{
      required:"description is required"
    }
  }

  onSubmit(): void {
    this.submit = true;
    if (this.eventForm.valid) {
      const event: Event = this.eventForm.value;
      if (this.eventId) {
        event.id = this.eventId;
        this.eventService.updateEvent(event);
      } else {
        event.id = new Date().getTime(); // For demo purposes, generate a timestamp as the ID
        this.eventService.addEvent(event);
      }
      this.router.navigate(['/']);
    }
  }

  close(){
    this.router.navigate(['/']);
  }
}
