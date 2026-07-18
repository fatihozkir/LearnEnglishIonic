# Paid Schema & Push Notifications Documentation

This document outlines the blueprints for integrating monetization (Stripe + RevenueCat) and engagement tools (Push Notifications) when transitioning from the Frontend POC to the production release.

---

## 💳 Paid Subscriptions Integration Blueprint

We use a hybrid cross-platform billing pipeline to support low fees on Web/PWA and compliance on App Stores.

```
                  +--------------------------------+
                  |    Client App (Angular/Ionic)  |
                  +---------------+----------------+
                                  |
            +---------------------+---------------------+
            | (If Web / PWA)                            | (If Mobile App)
            v                                           v
+-----------------------+                   +-----------------------+
|   Stripe Checkout     |                   |  Apple / Google IAP   |
|   (3% Fee)            |                   |  (15% Fee)            |
+-----------+-----------+                   +-----------+-----------+
            |                                           |
            +---------------------+---------------------+
                                  |
                                  v
                  +--------------------------------+
                  |    RevenueCat Webhook Sync     |
                  +---------------+----------------+
                                  |
                                  v
                  +--------------------------------+
                  |   Firebase User Premium Claims |
                  +--------------------------------+
```

### 1. Web/PWA Setup (Stripe)
* **API Integration:** Stripe Checkout redirects users to a secure Stripe-hosted payment portal.
* **Callback:** Stripe webhooks trigger a Cloud Function that notifies RevenueCat and updates the user's document in the database.

### 2. Android/iOS Setup (Capacitor + RevenueCat SDK)
* **SDK:** `@revenuecat/purchases-capacitor` handles in-app purchases natively.
* **Store Config:** Products are defined in App Store Connect and Google Play Console, linked under a unified Entitlement ID in RevenueCat.

### 3. Subscription Guards (Angular Router)
To secure the paid schema, router guards check user status before rendering locked sections:
```typescript
@Injectable({ providedIn: 'root' })
export class PremiumGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.userState$.pipe(
      map(user => {
        if (user && user.isPremium) return true;
        this.router.navigate(['/checkout']);
        return false;
      })
    );
  }
}
```

---

## 🔔 Push Notifications Blueprint

Push notifications keep students engaged (e.g., daily study reminders, new grammar challenges, vocabulary streaks).

### 1. Capacitor Push Notification Setup
On native mobile platforms, Capacitor maps native notification tokens automatically.
* **Dependency:** `@capacitor/push-notifications`
* **Configuration:**
  ```typescript
  import { PushNotifications } from '@capacitor/push-notifications';

  async function registerPush() {
    let perm = await PushNotifications.checkPermissions();
    if (perm.receive !== 'granted') {
      perm = await PushNotifications.requestPermissions();
    }
    if (perm.receive === 'granted') {
      await PushNotifications.register();
    }
  }
  ```

### 2. PWA Web Push Setup
For browser-based installation:
* **Service Worker:** The Angular Service Worker (`ngsw-worker.js`) listens for push events via the Web Push protocol.
* **Permissions:** Triggered via a user interaction banner (e.g., "Enable Study Reminders").

### 3. Backend Trigger (FCM)
Firebase Admin SDK sends targeted notifications using user registration tokens stored in the database.
* **Payload Structure:**
  ```json
  {
    "message": {
      "token": "USER_REGISTRATION_TOKEN",
      "notification": {
        "title": "Ready for your daily exam?",
        "body": "Keep up your English streak! Solve today's grammar challenge."
      },
      "data": {
        "route": "/home/grammar"
      }
    }
  }
  ```
