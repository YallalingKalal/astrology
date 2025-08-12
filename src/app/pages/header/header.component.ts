import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import {
  RouterLink,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';



@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    RouterModule,
    SidebarComponent,
    RouterOutlet,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  currentDate: string = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  constructor(private router: Router) { } 



  logout() {
    localStorage.clear(); // Clear all localStorage items
    // OR use localStorage.removeItem('username') to remove specific item
    this.router.navigate(['/login']);

  }
}
