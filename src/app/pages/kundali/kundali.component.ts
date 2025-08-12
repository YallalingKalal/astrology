import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-kundali',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './kundali.component.html',
  styleUrl: './kundali.component.css'
})
export class KundaliComponent {
  kundaliForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.kundaliForm = this.fb.group({
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      timeOfBirth: ['', Validators.required],
      placeOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      latitude: [''],
      longitude: [''],
      timezone: ['']
    });
  }

  onSubmit() {
    if (this.kundaliForm.valid) {
      console.log(this.kundaliForm.value);
      // Add your form submission logic here
    }
  }
}
