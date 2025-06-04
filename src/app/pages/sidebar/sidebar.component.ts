import { Component, inject, OnInit } from '@angular/core';
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
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  userRole: string | null = null;

  constructor(private router: Router) {
    this.userRole = localStorage.getItem('userRole');
  }

  ngOnInit() {
    // Refresh role when component initializes
    this.userRole = localStorage.getItem('userRole');
  }



  logout() {
    try {
      localStorage.clear(); // Clear all localStorage items

      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);

    }
  }


}
