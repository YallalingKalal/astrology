import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Astrologer {
  id: number;
  name: string;
  phone: string;
  education: string;
  specialization: string[];
  experience: number;
  price: number;
  rating: number;
  languages: string[];
  isAvailable: boolean;
  bgColor: string; // Add this for dynamic card colors
  isEditing?: boolean;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ChatComponent {
  astrologers: Astrologer[] = [
    {
      id: 1,
      name: "Pandit Ramesh Sharma",
      phone: "917499476311", // Format for WhatsApp
      education: "PhD in Vedic Astrology",
      specialization: ["Vedic Astrology", "Numerology", "Tarot Reading"],
      experience: 15,
      price: 499,
      rating: 4.8,
      languages: ["Hindi", "English", "Sanskrit"],
      isAvailable: true,
      bgColor: "#f8e5ff"
    },
    {
      id: 2,
      name: "Dr. Priya Gupta",
      phone: "919876543211", // Format for WhatsApp
      education: "Jyotish Acharya, Gold Medalist",
      specialization: ["Horoscope", "Vastu Shastra", "Palm Reading"],
      experience: 20,
      price: 599,
      rating: 4.9,
      languages: ["Hindi", "English", "Gujarati"],
      isAvailable: true,
      bgColor: "#e5fffa"
    },
    {
      id: 3,
      name: "Acharya Amit Mishra",
      phone: "919876543212", // Format for WhatsApp
      education: "Masters in Astrology",
      specialization: ["Marriage Astrology", "Career Counseling", "KP Astrology"],
      experience: 12,
      price: 399,
      rating: 4.7,
      languages: ["Hindi", "English", "Bengali"],
      isAvailable: false,
      bgColor: "#fff5e5"
    },
    {
      id: 4,
      name: "Dr. Sunita Joshi",
      phone: "919876543213", // Format for WhatsApp
      education: "PhD in KP Astrology",
      specialization: ["Business Astrology", "Medical Astrology", "Muhurat"],
      experience: 18,
      price: 549,
      rating: 4.9,
      languages: ["Hindi", "English", "Marathi"],
      isAvailable: true,
      bgColor: "#e5e5ff"
    }
  ];

  editedAstrologer: Astrologer | null = null;

  onTalkToAstrologer(phone: string) {
    const message = "Hello, I would like to consult with you regarding astrology.";
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  onEditProfile(astrologer: Astrologer) {
    this.editedAstrologer = { ...astrologer };
    astrologer.isEditing = true;
  }

  onSaveProfile(astrologer: Astrologer) {
    if (this.editedAstrologer) {
      const index = this.astrologers.findIndex(a => a.id === astrologer.id);
      this.astrologers[index] = { ...this.editedAstrologer, isEditing: false };
      this.editedAstrologer = null;
    }
  }

  onCancelEdit(astrologer: Astrologer) {
    astrologer.isEditing = false;
    this.editedAstrologer = null;
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
