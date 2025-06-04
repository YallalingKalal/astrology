import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class DashboardComponent implements OnInit {
  currentDate: string = '';
  totalMembers: string = '001';

  cards = [
    {
      title: 'Total Members',
      value: this.totalMembers,
      icon: 'group',
      description: 'Track and manage all registered users of the astrology portal.'
    },
    {
      title: 'Daily Panchang',
      value: 'Today’s Tithi',
      icon: 'event',
      description: 'Access detailed Hindu calendar data — Tithi, Nakshatra, Yoga, and auspicious timings.'
    },
    {
      title: 'Add New Article',
      value: 'Quick Add',
      icon: 'library_add',
      description: 'Easily add new astrological articles, remedies, or predictions to your platform.'
    },
   
    {
      title: 'Upcoming Events',
      value: 'Astro Calendar',
      icon: 'event_note',
      description: 'View upcoming events like eclipses, Vrats, Purnima, Amavasya, and spiritual dates.'
    },
    {
      title: 'Analytics',
      value: 'Insights',
      icon: 'insights',
      description: 'Monitor site activity — top articles, user behavior, and daily visits.'
    }
  ];

  ngOnInit(): void {
    this.currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}