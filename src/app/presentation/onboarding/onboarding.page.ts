import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonButton,
  IonIcon,
  IonCard,
} from '@ionic/angular/standalone';
import { AuthService } from '../auth/auth.service';
import { addIcons } from 'ionicons';
import {
  bookOutline,
  headsetOutline,
  createOutline,
  micOutline,
  textOutline,
  sparklesOutline,
  notificationsOutline,
  mailOpenOutline,
  checkmarkCircleOutline,
} from 'ionicons/icons';
import { toastController } from '@ionic/core';

interface PreferenceCard {
  id: string;
  name: string;
  description: string;
  icon: string;
  selected: boolean;
  colorClass: string;
}

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonButton,
    IonIcon,
    IonCard,
  ],
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Dynamic preference cards list (extendable easily!)
  preferences = signal<PreferenceCard[]>([
    { id: 'listening', name: 'Listening', description: 'Audio video clips and oral quizzes', icon: 'headset-outline', selected: true, colorClass: 'listening-card' },
    { id: 'grammar', name: 'Grammar', description: 'Tenses, comparisons, and syntax rules', icon: 'sparkles-outline', selected: true, colorClass: 'grammar-card' },
    { id: 'reading', name: 'Reading', description: 'Passage comprehensions and details matching', icon: 'book-outline', selected: true, colorClass: 'reading-card' },
    { id: 'vocabulary', name: 'Vocabulary', description: 'Synonyms, definitions, and fill-in-blanks', icon: 'text-outline', selected: true, colorClass: 'vocabulary-card' },
    { id: 'writing', name: 'Writing', description: 'Argumentative essays and manager emails', icon: 'create-outline', selected: true, colorClass: 'writing-card' },
    { id: 'speaking', name: 'Speaking', description: 'Pronunciation and conversation recordings', icon: 'mic-outline', selected: true, colorClass: 'speaking-card' }
  ]);

  // States
  showPushPrompt = signal<boolean>(false);
  showEmailVerificationPrompt = signal<boolean>(false);

  constructor() {
    addIcons({
      bookOutline,
      headsetOutline,
      createOutline,
      micOutline,
      textOutline,
      sparklesOutline,
      notificationsOutline,
      mailOpenOutline,
      checkmarkCircleOutline,
    });
  }

  togglePreference(prefId: string) {
    this.preferences.update(list =>
      list.map(p => (p.id === prefId ? { ...p, selected: !p.selected } : p))
    );
  }

  onSavePreferences() {
    // Save selected keys to User Preference state
    const user = this.authService.currentUser();
    if (user) {
      const selectedIds = this.preferences()
        .filter(p => p.selected)
        .map(p => p.id);
      
      user.learningPreferences = selectedIds;
      
      // Update session
      localStorage.setItem('english_exam_user_session', JSON.stringify(user));
    }

    // Step 2: Show Push Notification Permission Dialog
    this.showPushPrompt.set(true);
  }

  async onPushPermissionResponse(granted: boolean) {
    this.showPushPrompt.set(false);
    
    // Save permission choice
    localStorage.setItem('english_exam_push_permission', granted ? 'granted' : 'denied');

    const toast = await toastController.create({
      message: granted ? 'Push Notifications Enabled!' : 'Notifications declined. You can enable them later.',
      duration: 2000,
      color: granted ? 'success' : 'medium',
      position: 'bottom'
    });
    await toast.present();

    // Step 3: Trigger Mock Email verification popup
    this.showEmailVerificationPrompt.set(true);
  }

  async onSimulateDeepLink() {
    this.showEmailVerificationPrompt.set(false);

    // Verify account state
    const user = this.authService.currentUser();
    if (user) {
      user.verified = true;
      this.authService.currentUser.set({ ...user });
      localStorage.setItem('english_exam_user_session', JSON.stringify(user));
    }

    const toast = await toastController.create({
      message: 'Account successfully verified! Welcome aboard.',
      duration: 3000,
      color: 'success',
      position: 'bottom',
      buttons: [{ text: 'Dismiss', role: 'cancel' }]
    });
    await toast.present();

    // Route directly to the Profile Page inside Bottom Tabs!
    this.router.navigate(['/tabs/profile']);
  }
}
