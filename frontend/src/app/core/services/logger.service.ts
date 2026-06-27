import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * LoggerService
 * ----------------------------------------------------
 * Why this file exists:
 * Wraps console log calls. Allows silencing logs in production builds automatically.
 */
@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  debug(message: string, ...extra: any[]) {
    if (!environment.production) {
      console.log(`[DEBUG] ${message}`, ...extra);
    }
  }

  info(message: string, ...extra: any[]) {
    console.info(`[INFO] ${message}`, ...extra);
  }

  warn(message: string, ...extra: any[]) {
    console.warn(`[WARN] ${message}`, ...extra);
  }

  error(message: string, error?: any, ...extra: any[]) {
    console.error(`[ERROR] ${message}`, error, ...extra);
  }
}
