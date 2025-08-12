import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatMenuModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, AfterViewInit {
  userRole: string | null = null;

  constructor(private router: Router) {
    this.userRole = localStorage.getItem('userRole');
  }


  ngOnInit() {
    // Refresh role when component initializes
    this.userRole = localStorage.getItem('userRole');
    // No GSAP animations
  }


  ngAfterViewInit() {
    
  }


  

  logout() {
    try {
      localStorage. clear(); 

      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}
