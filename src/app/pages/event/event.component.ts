import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EventService, EventBooking } from '../../services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class EventComponent implements OnInit {
  showForm = false;
  event_types: string[] = [];
  bookings: EventBooking[] = [];
  booking: EventBooking = {
    name: '',
    date: undefined,
    timeInput: '',
    time: '',
    event_type: '',
    mobile_number: '',
    address: ''
  };
  displayedColumns: string[] = ['name', 'event_type', 'time', 'mobile_number', 'action'];
  deleteBooking(booking: EventBooking) {
    if (confirm('Are you sure you want to delete this booking?')) {
      // Assuming booking has an id property. If not, adjust as needed.
      // @ts-ignore
      const id = booking.id;
      if (!id) {
        alert('Cannot delete: missing booking id.');
        return;
      }
      this.eventService.deleteEvent(id).subscribe({
        next: () => {
          this.loadEvents();
        },
        error: (error) => {
          console.error('Error deleting event:', error);
        }
      });
    }
  }
  minDate = new Date();

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.event_types = this.eventService.getEventTypes();
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe({
      next: (events: any) => {
        // Handle different API response structures
        if (Array.isArray(events)) {
          this.bookings = events;
        } else if (events.results) {
          this.bookings = events.results;
        } else if (events.response) {
          this.bookings = events.response;
        } else {
          this.bookings = [];
        }
        console.log('Loaded bookings:', this.bookings);
      },
      error: (error) => {
        console.error('Error loading events:', error);
      }
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  onSubmit(form: any) {
    if (form.valid && this.booking.name && this.booking.date && 
        this.booking.timeInput && this.booking.event_type) {
      
      const bookingDate = new Date(this.booking.date);
      const [hours, minutes] = this.booking.timeInput.split(':');
      bookingDate.setHours(Number(hours), Number(minutes));
      
      const newBooking: EventBooking = {
        name: this.booking.name,
        time: bookingDate.toISOString(),
        event_type: this.booking.event_type,
        mobile_number: this.booking.mobile_number,
        address: this.booking.address
      };

      this.eventService.createEvent(newBooking).subscribe({
        next: () => {
          this.loadEvents();
          this.resetForm();
          this.showForm = false;
        },
        error: (error) => {
          console.error('Error creating event:', error);
        }
      });
    }
  }

  resetForm() {
    this.booking = {
      name: '',
      date: undefined,
      timeInput: '',
      time: '',
      event_type: '',
      mobile_number: '',
      address: ''
    };
  }
}
