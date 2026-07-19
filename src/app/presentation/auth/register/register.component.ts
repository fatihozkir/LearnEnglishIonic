import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonText,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
} from '@ionic/angular/standalone';
import { AuthService } from '../auth.service';
import { addIcons } from 'ionicons';
import { personOutline, mailOutline, lockClosedOutline, globeOutline, arrowForwardOutline, calendarOutline } from 'ionicons/icons';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    IonSelect,
    IonSelectOption,
    IonCheckbox,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // States
  name = '';
  surname = '';
  dob = '';
  email = '';
  password = '';
  nativeLanguage = 'tr';
  acceptTerms = false;
  errorMessage = signal<string>('');

  constructor() {
    addIcons({ personOutline, mailOutline, lockClosedOutline, globeOutline, arrowForwardOutline, calendarOutline });
  }

  isFormValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      !!this.name.trim() &&
      !!this.surname.trim() &&
      !!this.dob &&
      !!this.email.trim() &&
      emailRegex.test(this.email) &&
      this.password.length >= 6 &&
      this.acceptTerms
    );
  }

  onSubmit() {
    this.errorMessage.set('');

    if (!this.isFormValid()) {
      this.errorMessage.set('Please fill out all required fields and accept the Terms & Conditions.');
      return;
    }

    // Register user and redirect
    const ok = this.authService.register(
      this.name,
      this.surname,
      this.dob,
      this.email,
      this.nativeLanguage
    );
    
    if (ok) {
      this.router.navigate(['/onboarding']);
    } else {
      this.errorMessage.set('Registration failed.');
    }
  }
}
