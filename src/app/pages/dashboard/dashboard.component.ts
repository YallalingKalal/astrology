import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

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
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    MatDialogModule // Import MatDialogModule for dialog functionality
  ]
})
export class DashboardComponent implements OnInit {
  currentDate: string = '';

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  openSubscriptionDialog(): void {
    this.dialog.open(SubscriptionDialogComponent, {
      width: '400px',
      data: {}
    });
  }
}

// SubscriptionDialogComponent for CRUD operations (Dialog UI only, no backend yet)
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// Dialog imports already present above
import { Component as DialogComponent } from '@angular/core';
import { CommonModule } from '@angular/common';

@DialogComponent({
  selector: 'app-subscription-dialog',
  template: `
    <h2 mat-dialog-title class="subscription-dialog-title">VR Video Subscription Plan</h2>
    <div mat-dialog-content class="subscription-dialog-content">
      <form #subForm="ngForm">
        <mat-form-field appearance="outline" class="subscription-form-field">
          <mat-label>Plan Name</mat-label>
          <input matInput name="planName" [(ngModel)]="plan.planName" placeholder="e.g. Premium Darshan" required />
        </mat-form-field>
        <mat-form-field appearance="outline" class="subscription-form-field">
          <mat-label>Price (INR)</mat-label>
          <input matInput type="number" name="price" [(ngModel)]="plan.price" placeholder="e.g. 299" required />
        </mat-form-field>
        <mat-form-field appearance="outline" class="subscription-form-field">
          <mat-label>Duration (Days)</mat-label>
          <input matInput type="number" name="duration" [(ngModel)]="plan.duration" placeholder="e.g. 30" required />
        </mat-form-field>
        <mat-form-field appearance="outline" class="subscription-form-field">
          <mat-label>Description</mat-label>
          <textarea matInput name="description" [(ngModel)]="plan.description" rows="2" placeholder="Short description"></textarea>
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions class="subscription-dialog-actions">
      <button mat-button (click)="onCancel()" class="cancel-button">Cancel</button>
      <button mat-raised-button (click)="onSave()" class="save-button" [disabled]="!plan.planName || !plan.price || !plan.duration">Save</button>
    </div>
  `,
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, CommonModule]
})
export class SubscriptionDialogComponent {
  plan = {
    planName: '',
    price: '',
    duration: '',
    description: '',
   
  };

  constructor(
    public dialogRef: MatDialogRef<SubscriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
 
  onSave(): void {
    // Here you would call backend service to save/update the plan
    this.dialogRef.close(this.plan);
  }
}   