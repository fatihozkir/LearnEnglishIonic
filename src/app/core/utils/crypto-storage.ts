export class SecureStorage {
  static encrypt(data: any): string {
    const json = JSON.stringify(data);
    // Encodes UTF-8 string to base-64 representation safely
    return btoa(encodeURIComponent(json));
  }

  static decrypt(cipherText: string): any {
    if (!cipherText) return null;
    try {
      const decoded = decodeURIComponent(atob(cipherText));
      return JSON.parse(decoded);
    } catch (e) {
      return null;
    }
  }
}
