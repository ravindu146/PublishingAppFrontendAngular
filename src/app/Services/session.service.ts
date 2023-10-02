import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private readonly STORAGE_KEY = 'user_session';

  constructor(private sessionService: SessionService) {}

  setSessionData(data: any) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  getSessionData(): any {
    const sessionData = localStorage.getItem(this.STORAGE_KEY);
    return sessionData ? JSON.parse(sessionData) : null;
  }

  clearSession() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
