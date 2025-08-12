import { Component, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TempleService, Temple } from '../../services/temple.service';

@Component({
  selector: 'app-online-abhishek',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl: './online-abhishek.component.html',
  styleUrls: ['./online-abhishek.component.css']
})
export class OnlineAbhishekComponent {
  temples: Temple[] = [];
  addTempleForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;
  imageFile: File | null = null;
  editIndex: number | null = null;
  editTempleId: string | null = null;

  @ViewChild('addTempleDialog') addTempleDialog!: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private templeService: TempleService // Inject service
  ) {
    this.addTempleForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      subtitle: [''],
      description: ['', Validators.required],
      services: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadTemples();
  }

  loadTemples() {
    this.templeService.getTemples().subscribe({
      next: data => {
        console.log('API data:', data);
        this.temples = data.response;
      },
      error: err => {
        console.error('API error:', err);
        alert('Failed to load temples. See console for details.');
      }
    });
  }

  bookAbhishek(temple: string) {
    console.log(`Booking abhishek for ${temple}`);
  }

  openAddTempleDialog(editTemple: Temple | null = null, index: number | null = null) {
    this.addTempleForm.reset();
    this.selectedImage = null;
    this.imageFile = null;
    this.editIndex = null;
    this.editTempleId = null;

    if (editTemple && index !== null) {
      // Parse services: handle both array and stringified array
      let servicesValue = '';
      if (Array.isArray(editTemple.services)) {
        servicesValue = editTemple.services.join(', ');
      } else if (typeof editTemple.services === 'string') {
        try {
          const arr = JSON.parse(editTemple.services);
          servicesValue = Array.isArray(arr) ? arr.join(', ') : editTemple.services;
        } catch {
          servicesValue = editTemple.services;
        }
      }

      this.addTempleForm.patchValue({
        name: editTemple.name,
        location: editTemple.location,
        subtitle: editTemple.subtitle,
        description: editTemple.description,
        services: servicesValue
      });
      this.selectedImage = editTemple.image;
      this.editIndex = index;
      this.editTempleId = editTemple.id || null;
    }

    this.dialog.open(this.addTempleDialog, {
      width: '100%',
      maxWidth: '600px',
      autoFocus: false,
      disableClose: true
    });
  }

  closeDialog() {
    this.dialog.closeAll();
    this.editIndex = null;
    this.editTempleId = null;
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.imageFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(this.imageFile);
    }
  }

  addTemple() {
    if (this.addTempleForm.valid) {
      const formValue = this.addTempleForm.value;
      const formData = new FormData();
      formData.append('name', formValue.name);
      formData.append('location', formValue.location);
      formData.append('subtitle', formValue.subtitle);
      formData.append('description', formValue.description);
      formData.append('services', JSON.stringify(formValue.services.split(',').map((s: string) => s.trim())));

      // Only append image if a new file is selected or if adding
      if (this.imageFile) {
        formData.append('image', this.imageFile);
      }

      if (this.editTempleId) {
        // Update
        this.templeService.updateTemple(this.editTempleId, formData).subscribe(() => {
          this.loadTemples();
          this.closeDialog();
        });
      } else {
        // Add
        if (!this.imageFile) {
          alert('Please select an image.');
          return;
        }
        this.templeService.addTemple(formData).subscribe(() => {
          this.loadTemples();
          this.closeDialog();
        });
      }
    }
  }

  removeTemple(index: number) {
    const temple = this.temples[index];
    if (temple && temple.id && confirm('Are you sure you want to remove this temple?')) {
      this.templeService.deleteTemple(temple.id).subscribe(() => {
        this.loadTemples();
      });
    }
  }

  parseServices(services: any): string[] {
    // If services is an array with a single stringified array, parse it
    if (Array.isArray(services) && services.length === 1 && typeof services[0] === 'string') {
      try {
        const parsed = JSON.parse(services[0]);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch {
        // If parsing fails, fallback to original
        return [services[0]];
      }
    }
    // If already an array of strings, return as is
    if (Array.isArray(services)) {
      return services;
    }
    // If it's a string, return as single-element array
    if (typeof services === 'string') {
      return [services];
    }
    return [];
  }
}
