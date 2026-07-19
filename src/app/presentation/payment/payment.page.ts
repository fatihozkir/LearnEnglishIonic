import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonBadge,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonInput,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  cardOutline,
  starOutline,
  ribbonOutline,
  shieldCheckmarkOutline,
} from 'ionicons/icons';
import { toastController } from '@ionic/core';

interface BillingRecord {
  date: number;
  plan: string;
  amount: string;
  status: 'paid' | 'failed';
}

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonBadge,
    IonCard,
    IonCardContent,
    IonList,
    IonItem,
    IonInput,
  ],
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  private router = inject(Router);

  // States
  isYearly = signal<boolean>(false);
  selectedPlan = signal<'free' | 'pro' | 'ultimate'>('pro');

  // Checkout inputs
  cardName = '';
  cardNumber = '';
  cardExpiry = '';
  cardCvv = '';

  // Simulator configs
  forceSuccess = signal<boolean>(true);
  isProcessing = signal<boolean>(false);
  paymentStatus = signal<'idle' | 'success' | 'failed'>('idle');

  // Billing history logs
  billingHistory = signal<BillingRecord[]>([]);

  constructor() {
    addIcons({
      arrowBackOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
      cardOutline,
      starOutline,
      ribbonOutline,
      shieldCheckmarkOutline,
    });
  }

  ngOnInit() {
    this.loadBillingHistory();
  }

  loadBillingHistory() {
    const saved = localStorage.getItem('english_exam_billing_history');
    if (saved) {
      this.billingHistory.set(JSON.parse(saved));
    } else {
      // Mock some previous entries
      const logs: BillingRecord[] = [
        { date: Date.now() - 30 * 24 * 3600 * 1000, plan: 'Free Practice Plan', amount: '$0.00', status: 'paid' }
      ];
      this.billingHistory.set(logs);
      localStorage.setItem('english_exam_billing_history', JSON.stringify(logs));
    }
  }

  onGoBack() {
    this.router.navigate(['/tabs/profile']);
  }

  toggleBillingCycle() {
    this.isYearly.update(v => !v);
  }

  selectPlan(plan: 'free' | 'pro' | 'ultimate') {
    this.selectedPlan.set(plan);
  }

  // Pricing helper
  getPlanPrice(): string {
    const plan = this.selectedPlan();
    const yearly = this.isYearly();

    if (plan === 'free') return '$0.00';
    if (plan === 'pro') return yearly ? '$79.99/yr' : '$9.99/mo';
    return yearly ? '$149.99/yr' : '$19.99/mo';
  }

  getPlanName(): string {
    const plan = this.selectedPlan();
    if (plan === 'free') return 'Free Practice Tier';
    if (plan === 'pro') return 'Premium Pro Plan';
    return 'Ultimate Exam Mastery';
  }

  isFormValid(): boolean {
    const cleanNum = this.cardNumber.replace(/\s+/g, '');
    const cleanExpiry = this.cardExpiry.replace(/\s+/g, '');
    const cleanCvv = this.cardCvv.replace(/\s+/g, '');

    return (
      !!this.cardName.trim() &&
      cleanNum.length === 16 &&
      /^\d+$/.test(cleanNum) &&
      cleanExpiry.length === 5 &&
      cleanExpiry.includes('/') &&
      cleanCvv.length === 3 &&
      /^\d+$/.test(cleanCvv)
    );
  }

  onConfirmPayment() {
    if (this.selectedPlan() === 'free') {
      alert('Free Plan requires no billing input.');
      return;
    }

    if (!this.isFormValid()) {
      alert('Please enter valid credit card details.');
      return;
    }

    this.isProcessing.set(true);

    // Simulate gateway delay
    setTimeout(() => {
      this.isProcessing.set(false);

      if (this.forceSuccess()) {
        this.paymentStatus.set('success');
        
        // Save membership status
        const planName = this.getPlanName();
        localStorage.setItem('english_exam_purchased_plan', planName);

        // Append to billing logs
        const record: BillingRecord = {
          date: Date.now(),
          plan: planName,
          amount: this.getPlanPrice(),
          status: 'paid'
        };
        
        this.billingHistory.update(prev => [record, ...prev]);
        localStorage.setItem('english_exam_billing_history', JSON.stringify(this.billingHistory()));

      } else {
        this.paymentStatus.set('failed');
        
        // Append failed log
        const record: BillingRecord = {
          date: Date.now(),
          plan: this.getPlanName(),
          amount: this.getPlanPrice(),
          status: 'failed'
        };
        
        this.billingHistory.update(prev => [record, ...prev]);
        localStorage.setItem('english_exam_billing_history', JSON.stringify(this.billingHistory()));
      }
    }, 1500);
  }

  onResetPaymentStatus() {
    this.paymentStatus.set('idle');
  }

  async onRestorePurchases() {
    const toast = await toastController.create({
      message: 'Restoring mock App Store purchases... Done.',
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();
  }
}
