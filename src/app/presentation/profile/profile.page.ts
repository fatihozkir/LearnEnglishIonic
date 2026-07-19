import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonButton,
  IonIcon,
  IonBadge,
  IonLabel,
  IonList,
  IonInput,
  IonCheckbox,
  IonSelect,
  IonSelectOption,
  IonSegment,
  IonSegmentButton,
  IonModal,
} from '@ionic/angular/standalone';
import { AuthService } from '../auth/auth.service';
import { addIcons } from 'ionicons';
import {
  personOutline,
  globeOutline,
  notificationsOutline,
  lockClosedOutline,
  cardOutline,
  checkmarkCircle,
  alertCircleOutline,
  pencilOutline,
  checkmarkOutline,
  sparklesOutline,
  headsetOutline,
  bookOutline,
  textOutline,
  createOutline,
  micOutline,
  colorPaletteOutline,
} from 'ionicons/icons';
import { toastController } from '@ionic/core';

interface PrefToggle {
  id: string;
  name: string;
  icon: string;
  selected: boolean;
  colorClass: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonButton,
    IonIcon,
    IonBadge,
    IonLabel,
    IonList,
    IonInput,
    IonCheckbox,
    IonSelect,
    IonSelectOption,
    IonSegment,
    IonSegmentButton,
    IonModal,
  ],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  public authService = inject(AuthService);
  private router = inject(Router);

  showAlertModal = signal<boolean>(false);
  alertMessage = signal<string>('');

  // States
  isEditingUsername = signal<boolean>(false);
  editedUsername = '';
  
  // Learning Cards
  learningCards = signal<PrefToggle[]>([
    { id: 'listening', name: 'Listening', icon: 'headset-outline', selected: true, colorClass: 'listening-card' },
    { id: 'grammar', name: 'Grammar', icon: 'sparkles-outline', selected: true, colorClass: 'grammar-card' },
    { id: 'reading', name: 'Reading', icon: 'book-outline', selected: true, colorClass: 'reading-card' },
    { id: 'vocabulary', name: 'Vocabulary', icon: 'text-outline', selected: true, colorClass: 'vocabulary-card' },
    { id: 'writing', name: 'Writing', icon: 'create-outline', selected: true, colorClass: 'writing-card' },
    { id: 'speaking', name: 'Speaking', icon: 'mic-outline', selected: true, colorClass: 'speaking-card' }
  ]);

  // Question counts fields
  listeningCount = 10;
  readingCount = 10;
  grammarCount = 10;
  vocabularyCount = 10;
  writingCount = 5;
  speakingCount = 5;

  validationErrors = signal<Record<string, string>>({});

  // Subscription plan (mock)
  activePlan = signal<string>('Free Practice Plan');

  constructor() {
    addIcons({
      personOutline,
      globeOutline,
      notificationsOutline,
      lockClosedOutline,
      cardOutline,
      checkmarkCircle,
      alertCircleOutline,
      pencilOutline,
      checkmarkOutline,
      sparklesOutline,
      headsetOutline,
      bookOutline,
      textOutline,
      createOutline,
      micOutline,
      colorPaletteOutline,
    });

    this.loadProfileData();
  }

  loadProfileData() {
    const user = this.authService.currentUser();
    if (user) {
      this.editedUsername = user.username;
      
      // Load selected cards
      if (user.learningPreferences) {
        this.learningCards.update(list =>
          list.map(card => ({ ...card, selected: user.learningPreferences!.includes(card.id) }))
        );
      }

      // Load counts
      if (user.questionCountsConfig) {
        this.listeningCount = user.questionCountsConfig['listening'] || 10;
        this.readingCount = user.questionCountsConfig['reading'] || 10;
        this.grammarCount = user.questionCountsConfig['grammar'] || 10;
        this.vocabularyCount = user.questionCountsConfig['vocabulary'] || 10;
        this.writingCount = user.questionCountsConfig['writing'] || 5;
        this.speakingCount = user.questionCountsConfig['speaking'] || 5;
      }

      // Check for purchased plans
      const plan = localStorage.getItem('english_exam_purchased_plan');
      if (plan) {
        this.activePlan.set(plan);
      }
    }
  }

  toggleEditUsername() {
    if (this.isEditingUsername()) {
      // Save username changes
      const trimmed = this.editedUsername.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
      if (trimmed.length < 4) {
        this.alertMessage.set('Username must be at least 4 alphanumeric characters.');
        this.showAlertModal.set(true);
        return;
      }

      const user = this.authService.currentUser();
      if (user) {
        user.username = trimmed;
        this.authService.updateUser(user);
      }
      this.isEditingUsername.set(false);
    } else {
      this.isEditingUsername.set(true);
    }
  }

  toggleCard(prefId: string) {
    this.learningCards.update(list =>
      list.map(c => (c.id === prefId ? { ...c, selected: !c.selected } : c))
    );
    
    // Save preferences
    const user = this.authService.currentUser();
    if (user) {
      user.learningPreferences = this.learningCards()
        .filter(c => c.selected)
        .map(c => c.id);
      
      this.authService.updateUser(user);
    }
  }

  onLanguageChange(lang: string) {
    const user = this.authService.currentUser();
    if (user) {
      user.nativeLanguage = lang;
      this.authService.updateUser(user);
    }
  }

  onLanguagePriorityChange() {
    const user = this.authService.currentUser();
    if (user) {
      this.authService.updateUser(user);
    }
  }

  validateCount(key: string, value: string | number) {
    const numericVal = Number(value);
    this.validationErrors.update(prev => {
      const next = { ...prev };
      if (isNaN(numericVal) || value === '' || value === null) {
        next[key] = 'Numeric input required.';
      } else if (numericVal < 1) {
        next[key] = 'Minimum value is 1.';
      } else if (numericVal > 50) {
        next[key] = 'Maximum value is 50.';
      } else if (!Number.isInteger(numericVal)) {
        next[key] = 'Integers only.';
      } else {
        delete next[key];
      }
      return next;
    });

    if (!this.validationErrors()[key]) {
      // Save configuration key
      const user = this.authService.currentUser();
      if (user) {
        if (!user.questionCountsConfig) user.questionCountsConfig = {};
        user.questionCountsConfig[key] = numericVal;
        
        this.authService.currentUser.set({ ...user });
        localStorage.setItem('english_exam_user_session', JSON.stringify(user));
      }
    }
  }

  async onRePromptPushNotifications() {
    // Re-prompts permission
    const choice = confirm('Enable Practice Reminders & Alerts?');
    localStorage.setItem('english_exam_push_permission', choice ? 'granted' : 'denied');
    
    const toast = await toastController.create({
      message: choice ? 'Push Notifications Successfully Configured!' : 'Notifications remains disabled.',
      duration: 2000,
      color: choice ? 'success' : 'medium',
      position: 'bottom'
    });
    await toast.present();
  }

  onUpgradePlan() {
    this.router.navigate(['/payment']);
  }

  onThemeChange(value: any) {
    if (value === 'light' || value === 'dark') {
      this.authService.setThemeMode(value);
    }
  }
}
