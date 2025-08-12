import {
  Component, OnInit, ViewChild, TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder, FormGroup, Validators,
  FormsModule, ReactiveFormsModule
} from '@angular/forms';
import {
  MatTableDataSource, MatTableModule
} from '@angular/material/table';
import {
  MatPaginator, MatPaginatorModule
} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog, MatDialogRef, MatDialogModule
} from '@angular/material/dialog';
import {
  MatSnackBar, MatSnackBarModule
} from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AbhishekService } from '../../services/abhishek.service';
import { UsersService }    from '../../services/users.service';

@Component({
  selector   : 'app-user-mgmt',
  standalone : true,
  templateUrl: './user-mgmt.component.html',
  styleUrls  : ['./user-mgmt.component.css'],
  imports: [
    /* Angular */
    CommonModule, FormsModule, ReactiveFormsModule,

    /* Angular-Material */
    MatTableModule, MatPaginatorModule, MatSortModule,
    MatFormFieldModule, MatInputModule, MatCardModule,
    MatIconModule, MatButtonModule, MatDialogModule,
    MatSnackBarModule, MatProgressSpinnerModule
  ]
})
export class UserMgmtComponent implements OnInit {

  /* ---------- table ---------- */
  displayedColumns: string[] = [
    'id', 'full_name', 'gotra', 'purpose', 'date',
    'contact', 'address', 'created_at', 'action'
  ];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort,      { static: true }) sort!     : MatSort;

  /* ---------- dialog ---------- */
  @ViewChild('editDialog') editDialogTpl!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  editForm!: FormGroup;
  loading = false;
  saving  = false;
  currentUserId!: number;

  constructor(
    private abhishekService: AbhishekService,
    private usersService   : UsersService,
    private fb            : FormBuilder,
    private dialog        : MatDialog,
    private snackBar      : MatSnackBar
  ) {}


  ngOnInit(): void {
    this.initForm();
    this.loadUsers();
  }


  private initForm(): void {
    this.editForm = this.fb.group({
      full_name: ['', Validators.required],
      gotra    : [''],
      purpose  : [''],
      date     : [''],
      contact  : ['', Validators.pattern(/^\d{10}$/)],
      address  : ['']
    });
  }

  private loadUsers(): void {
    this.abhishekService.getAllData().subscribe({
      next : (res: any) => {
        const users = Array.isArray(res) ? res : res.results || res.data || [];
        this.dataSource.data = users;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort      = this.sort;
      },
      error: () => this.snackBar.open('Failed to load users', 'Close', { duration: 3000 })
    });
  }

 
  applyFilter(ev: Event): void {
    const filter = (ev.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: any, val: string) =>
      (data.id + ' ' + data.full_name + ' ' + data.gotra + ' ' + data.purpose +
       ' ' + data.date + ' ' + data.contact + ' ' + data.address + ' ' + data.created_at)
       .toLowerCase()
       .includes(val);
    this.dataSource.filter = filter;
    this.paginator.firstPage();
  }


  editUser(row: any): void {
  this.currentUserId = row.id;
  this.loading = true;
  this.editForm.reset();

  /* open dialog first (shows spinner), then load data */
  this.dialogRef = this.dialog.open(this.editDialogTpl, {
    width: '500px',
    maxWidth: '90vw'
  });

  this.usersService.getUserById(row.id).subscribe({
    next: (response: any) => {
      console.log('API Response:', response); // Debug log
      
      // Handle the nested data structure
      let userData;
      if (response.data) {
        userData = response.data; // New API format
      } else {
        userData = response; // Fallback for direct format
      }
      
      console.log('User Data to patch:', userData); // Debug log
      
      // Patch the form with the extracted data
      this.editForm.patchValue({
        full_name: userData.full_name || '',
        gotra: userData.gotra || '',
        purpose: userData.purpose || '',
        date: userData.date || '',
        contact: userData.contact || '',
        address: userData.address || ''
      });
      
      console.log('Form values after patch:', this.editForm.value); // Debug log
      this.loading = false;
    },
    error: (error) => {
      console.error('Error loading user:', error); // Debug log
      this.loading = false;
      this.snackBar.open('Failed to load user', 'Close', { duration: 3000 });
    }
  });
}


  saveUser(): void {
    if (this.editForm.invalid) return;

    this.saving = true;
    this.usersService.updateUser(this.currentUserId, this.editForm.value).subscribe({
      next : () => {
        this.saving = false;
        this.dialogRef.close();
        this.snackBar.open('User updated', 'Close', { duration: 3000 });
        this.loadUsers();
      },
      error: () => {
        this.saving = false;
        this.snackBar.open('Update failed', 'Close', { duration: 3000 });
      }
    });
  }

  cancelEdit(): void {
    this.dialogRef.close();
  }

 
  deleteUser(row: any): void {
    if (!confirm(`Delete user "${row.full_name}"?`)) return;

    this.usersService.deleteUser(row.id).subscribe({
      next : () => {
        this.snackBar.open('User deleted', 'Close', { duration: 3000 });
        this.loadUsers();
      },
      error: () =>
        this.snackBar.open('Delete failed', 'Close', { duration: 3000 })
    });
  }
}
