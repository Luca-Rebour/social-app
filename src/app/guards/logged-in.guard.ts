import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = inject(LocalStorageService).isLoggedIn();
  if (!isLoggedIn) {
    const router = inject(Router);
    router.navigate(['']);
    return false;
  }
  console.log('Logged in');
  return true;
};
