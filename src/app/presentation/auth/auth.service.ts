import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../core/models/models';
import { ExamStateService } from '../services/exam-state.service';
import { SecureStorage } from '../../core/utils/crypto-storage';

const USER_SESSION_KEY = 'english_exam_user_session';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private stateService = inject(ExamStateService);

  // States
  readonly currentUser = signal<User | null>(null);
  readonly themeMode = signal<'light' | 'dark'>('light');

  // Computed
  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  constructor() {
    this.loadSession();
    
    // Load theme preference
    const savedTheme = localStorage.getItem('english_exam_theme_preference') as 'light' | 'dark' | null;
    if (savedTheme) {
      this.themeMode.set(savedTheme);
    } else {
      try {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.themeMode.set(prefersDark ? 'dark' : 'light');
      } catch (e) {
        this.themeMode.set('light');
      }
    }

    // Dynamic body dark theme toggler
    effect(() => {
      const isDark = this.themeMode() === 'dark';
      document.body.classList.toggle('dark-theme', isDark);
    });
  }

  setThemeMode(mode: 'light' | 'dark') {
    this.themeMode.set(mode);
    localStorage.setItem('english_exam_theme_preference', mode);
  }

  private getHashedSeed(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16);
  }

  login(email: string): boolean {
    const username = email.split('@')[0] + '1234';
    const mockUser: User = {
      username,
      name: email.split('@')[0],
      surname: 'User',
      dob: '2000-01-01',
      email: email,
      nativeLanguage: 'tr',
      verified: true,
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${this.getHashedSeed(username)}`,
      learningPreferences: ['listening', 'reading', 'grammar', 'writing', 'speaking', 'vocabulary'],
      questionCountsConfig: {
        listening: 10,
        reading: 10,
        grammar: 10,
        vocabulary: 10,
        writing: 5,
        speaking: 5
      }
    };
    
    this.saveSession(mockUser);
    return true;
  }

  register(
    name: string,
    surname: string,
    dob: string,
    email: string,
    nativeLanguage: string
  ): boolean {
    const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');
    const cleanSurname = surname.toLowerCase().replace(/[^a-z]/g, '');
    const uniqueId = Math.floor(1000 + Math.random() * 9000);
    const username = `${cleanName}${cleanSurname}${uniqueId}`;

    const newUser: User = {
      username,
      name,
      surname,
      dob,
      email,
      nativeLanguage,
      verified: false, // Must be verified via deep link
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${this.getHashedSeed(username)}`,
      learningPreferences: ['listening', 'reading', 'grammar', 'writing', 'speaking', 'vocabulary'],
      questionCountsConfig: {
        listening: 10,
        reading: 10,
        grammar: 10,
        vocabulary: 10,
        writing: 5,
        speaking: 5
      }
    };

    this.saveSession(newUser);
    return true;
  }

  updateUser(user: User) {
    this.currentUser.set({ ...user });
    this.saveSession(user);
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem(USER_SESSION_KEY);
    this.stateService.resetExam(); // Reset practice answers on logout
    this.router.navigate(['/login']);
  }

  private saveSession(user: User) {
    this.currentUser.set(user);
    const encrypted = SecureStorage.encrypt(user);
    localStorage.setItem(USER_SESSION_KEY, encrypted);
    
    // Bind native language preference to state service locale
    this.stateService.userLanguage.set(user.nativeLanguage);
  }

  private loadSession() {
    const saved = localStorage.getItem(USER_SESSION_KEY);
    if (saved) {
      try {
        const user: User = SecureStorage.decrypt(saved);
        if (user) {
          this.currentUser.set(user);
          this.stateService.userLanguage.set(user.nativeLanguage);
        } else {
          localStorage.removeItem(USER_SESSION_KEY);
        }
      } catch (e) {
        localStorage.removeItem(USER_SESSION_KEY);
      }
    }
  }
}
