import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AbhishekService } from '../../services/abhishek.service';
import { MatTooltipModule } from '@angular/material/tooltip';
// Import the service from the correct path

@Component({
  selector: 'app-abhishek',
  templateUrl: './abhishek.component.html',
  styleUrls: ['./abhishek.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule,
    CommonModule,
    MatTooltipModule,
  ],
})
export class AbhishekComponent implements OnInit {
  form: FormGroup;
  submittedData: any[] = [];
  isLoading = false;
  showList = false;
  editingId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private abhishekService: AbhishekService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      full_name: ['', Validators.required],
      gotra: ['', Validators.required],
      purpose: ['', Validators.required],
      date: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10,}$')]],
      address: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Optionally, load existing data when the component initializes
    // this.loadSubmittedData();
  }

  /**
   * Handles the form submission.
   * Calls the service to submit data to the API.
   */
  onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      const formData: any = { ...this.form.value };
      // Format date as DD/MM/YYYY if it's a Date object
      if (formData.date instanceof Date) {
        const day = String(formData.date.getDate()).padStart(2, '0');
        const month = String(formData.date.getMonth() + 1).padStart(2, '0');
        const year = formData.date.getFullYear();
        formData.date = `${day}/${month}/${year}`;
      } else if (
        typeof formData.date === 'string' &&
        formData.date.includes('-')
      ) {
        const d = new Date(formData.date);
        if (!isNaN(d.getTime())) {
          const day = String(d.getDate()).padStart(2, '0');
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const year = d.getFullYear();
          formData.date = `${day}/${month}/${year}`;
        }
      }

      this.abhishekService.addUser(formData).subscribe({
        next: (response: any) => {
          this.snackBar.open('डेटा सबमिट झाला! / Data submitted!', 'Close', {
            duration: 2500,
          });
          this.form.reset();
          this.isLoading = false;
          // Remove list show logic
          // this.showList = true;
          // this.loadSubmittedData();
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error submitting data:', error);
          this.isLoading = false;
        },
      });
    }
  }

  onShowList() {
    this.showList = true;
    this.loadSubmittedData();
  }

  onBackToForm() {
    this.showList = false;
    this.editingId = null;
    this.form.reset();
  }

  onDelete(element: any) {
    if (element && element.id) {
      if (confirm('Are you sure you want to delete this entry?')) {
        this.isLoading = true;
        this.abhishekService.deleteData(element.id).subscribe({
          next: () => {
            this.snackBar.open('डेटा हटवला! / Data deleted!', 'Close', {
              duration: 2000,
            });
            this.loadSubmittedData();
          },
          error: (error: HttpErrorResponse) => {
            this.snackBar.open('Error deleting data', 'Close', {
              duration: 2000,
            });
            this.isLoading = false;
          },
        });
      }
    }
  }

  onEdit(element: any) {
    this.editingId = element.id;
    this.form.patchValue({
      full_name: element.full_name,
      gotra: element.gotra,
      purpose: element.purpose,
      date: element.date, // If date is string DD/MM/YYYY, you may want to parse it to Date object for the datepicker
      contact: element.contact,
      address: element.address,
    });
    this.showList = false;
  }

  /**
   * Navigates back to the form view.
   */

  /**
   * Example method to load data from the service (optional).
   * You might call this in ngOnInit or after a successful submission.
   */
  loadSubmittedData() {
    this.isLoading = true;
    this.abhishekService.getAllData().subscribe({
      next: (data: any) => {
        // If your API returns {results: [...]}
        this.submittedData = Array.isArray(data)
          ? data
          : data.results || data.data || [];
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error loading data:', error);
        this.isLoading = false;
      },
    });
  }
}
