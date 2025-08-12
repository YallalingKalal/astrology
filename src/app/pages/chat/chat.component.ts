import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AstrologerService } from '../../services/astrologer.service'; // adjust path as needed

interface Astrologer {
  id: number;
  name: string;
  phone: string;
  education: string;
  specialization: string[];
  experience: number;
  price: number;
  languages: string[];
  isAvailable: boolean;
  isEditing?: boolean;
  description?: string;
  city?: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatBadgeModule,
    MatDividerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatToolbarModule
  ]
})
export class ChatComponent implements OnInit {
  astrologers: Astrologer[] = [
    {
      id: 1,
      name: "Pandit Ramesh Sharma",
      phone: "917499476311",
      education: "PhD in Vedic Astrology",
      specialization: ["Vedic Astrology", "Numerology", "Tarot Reading"],
      experience: 15,
      price: 499,
      languages: ["Hindi", "English", "Sanskrit"],
      isAvailable: true,
      description: "Expert in ancient Vedic practices",
      city: "Mumbai"
    },
      
  ];

  editedAstrologer: Astrologer | null = null;
  showRegistrationForm = false;
  registrationForm: FormGroup;
  searchTerm = '';
  selectedFilter = 'all';

  specializationOptions = [
    'Vedic Astrology', 'Numerology', 'Tarot Reading', 'Horoscope',
    'Vastu Shastra', 'Palm Reading', 'Marriage Astrology',
    'Career Counseling', 'KP Astrology', 'Business Astrology',
    'Medical Astrology', 'Muhurat'
  ];

  languageOptions = [
    'Hindi', 'English', 'Sanskrit', 'Gujarati', 'Bengali',
    'Marathi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private astrologerService: AstrologerService // <-- add this
  ) {
    this.registrationForm = this.fb.group({
      name: [''],
      phone: [''],
      education: [''],
      experience: [''],
      price: [''],
      city: [''],
      description: [''],
      specialization: [[]],
      languages: [[]]
    });
  }

  ngOnInit() {
    this.loadAstrologers();
  }

  loadAstrologers() {
    this.astrologerService.getAstrologers().subscribe({
      next: (data) => {
        // If your API returns { response: [...] }
        const arr = Array.isArray(data?.response) ? data.response : Array.isArray(data) ? data : [];
        this.astrologers = arr.map((a: any) => ({
          id: a.id,
          name: a.name,
          phone: a.phone,
          education: a.education,
          specialization: a.specialization,
          experience: a.experience,
          price: a.price,
          languages: a.languages,
          isAvailable: a.is_available, // <-- map snake_case to camelCase
          description: a.description,
          city: a.city
        }));
      },
      error: (err) => {
        this.showNotification('Failed to load astrologers!');
        console.error(err);
      }
    });
  }

  get totalAstrologers(): number {
    return this.astrologers.length;
  }

  get availableAstrologers(): number {
    return this.astrologers.filter(a => a.isAvailable).length;
  }

  get totalSpecializations(): number {
    return this.specializationOptions.length;
  }

  get filteredAstrologers() {
    return this.astrologers.filter(astrologer => {
      const matchesSearch = astrologer.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        astrologer.specialization.some(spec =>
          spec.toLowerCase().includes(this.searchTerm.toLowerCase()));

      const matchesFilter = this.selectedFilter === 'all' ||
        (this.selectedFilter === 'available' && astrologer.isAvailable) ||
        (this.selectedFilter === 'offline' && !astrologer.isAvailable);

      return matchesSearch && matchesFilter;
    });
  }

  toggleRegistrationForm() {
    this.showRegistrationForm = !this.showRegistrationForm;
    if (!this.showRegistrationForm) {
      this.registrationForm.reset();
    }
  }

  onSubmitRegistration() {
    const formData = this.registrationForm.value;
    // Prepare data as per your API requirements
    const payload = {
      name: formData.name,
      phone: formData.phone,
      education: formData.education,
      specialization: formData.specialization,
      experience: formData.experience,
      price: formData.price,
      languages: formData.languages,
      is_available: formData.isAvailable, // <-- snake_case for API
      description: formData.description,
      city: formData.city
    };

    this.astrologerService.addAstrologer(payload).subscribe({
      next: (response) => {
        this.showNotification('Astrologer added successfully!');
        this.registrationForm.reset();
        this.showRegistrationForm = false;
        this.loadAstrologers(); // <-- reload list from API
      },
      error: (err) => {
        this.showNotification('Failed to add astrologer!');
        console.error(err);
      }
    });
  }

  onEditProfile(astrologer: Astrologer) {
    this.editedAstrologer = { ...astrologer };
    astrologer.isEditing = true;
  }

  onSaveProfile(astrologer: Astrologer) {
    if (!this.editedAstrologer || !astrologer.id) return;

    // Prepare payload in snake_case for API
    const payload = {
      name: this.editedAstrologer.name,
      phone: this.editedAstrologer.phone,
      education: this.editedAstrologer.education,
      specialization: this.editedAstrologer.specialization,
      experience: this.editedAstrologer.experience,
      price: this.editedAstrologer.price,
      languages: this.editedAstrologer.languages,
      is_available: this.editedAstrologer.isAvailable,
      description: this.editedAstrologer.description,
      city: this.editedAstrologer.city
    };

    this.astrologerService.updateAstrologer(astrologer.id.toString(), payload).subscribe({
      next: () => {
        this.showNotification('Profile updated successfully!');
        this.editedAstrologer = null;
        astrologer.isEditing = false;
        this.loadAstrologers(); // Refresh list from backend
      },
      error: (err) => {
        this.showNotification('Failed to update astrologer!');
        console.error(err);
      }
    });
  }

  onCancelEdit(astrologer: Astrologer) {
    astrologer.isEditing = false;
    this.editedAstrologer = null;
  }

  onDeleteProfile(astrologer: Astrologer) {
    if (!astrologer.id) return;
    this.astrologerService.deleteAstrologer(astrologer.id.toString()).subscribe({
      next: () => {
        this.showNotification(`${astrologer.name} removed successfully!`);
        this.loadAstrologers(); // Refresh list from backend
      },
      error: (err) => {
        this.showNotification('Failed to delete astrologer!');
        console.error(err);
      }
    });
  }

  onTalkToAstrologer(phone: string) {
    const message = "Hello, I would like to consult with you regarding astrology.";
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  toggleAvailability(astrologer: Astrologer) {
    astrologer.isAvailable = !astrologer.isAvailable;
    const status = astrologer.isAvailable ? 'Available' : 'Busy';
    this.showNotification(`${astrologer.name} is now ${status}`);
  }

  getNextId(): number {
    return this.astrologers.length > 0 ? Math.max(...this.astrologers.map(a => a.id)) + 1 : 1;
  }

  showNotification(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  onAddLanguage(event: KeyboardEvent, astrologer: Astrologer) {
    if (event.key === 'Enter') {
      const input = event.target as HTMLInputElement;
      const value = input.value.trim();
      if (value && !astrologer.languages.includes(value)) {
        astrologer.languages.push(value);
      }
      input.value = '';
    }
  }

  removeLanguage(language: string, astrologer: Astrologer) {
    astrologer.languages = astrologer.languages.filter(l => l !== language);
  }

  onAddSpecialization(event: KeyboardEvent, astrologer: Astrologer) {
    if (event.key === 'Enter') {
      const input = event.target as HTMLInputElement;
      const value = input.value.trim();
      if (value && !astrologer.specialization.includes(value)) {
        astrologer.specialization.push(value);
      }
      input.value = '';
    }
  }

  removeSpecialization(spec: string, astrologer: Astrologer) {
    astrologer.specialization = astrologer.specialization.filter(s => s !== spec);
  }
}
