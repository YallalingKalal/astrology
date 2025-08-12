import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsersService } from '../../services/users.service';
import { MatIcon } from '@angular/material/icon';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

@Component({
  selector: 'app-member',
  styleUrl: './member.component.css',
  templateUrl: './member.component.html',
  imports: [MatTableModule, MatPaginatorModule, MatIcon],
})
export class MemberComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'email', 'first_name', 'last_name', 'role', 'action'];
  dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getUsers().subscribe({
      next: (users: any) => {
        console.log('API USERS:', users);
        // Adjust this line as per your API response structure
        this.dataSource.data = Array.isArray(users) ? users : users.response;
      },
      error: (err: any) => {
        console.error('Failed to load users', err);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  viewUser(user: User) {
    // Show user details logic here (e.g., open a dialog)
    console.log('View user:', user);
  }
}

