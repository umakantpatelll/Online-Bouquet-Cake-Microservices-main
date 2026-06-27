import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

/**
 * NotificationService
 * ----------------------------------------------------
 * Why this file exists:
 * Exposes clean, consistent message banners for user feedback using ngx-toastr under the hood.
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private toastr = inject(ToastrService);

  showSuccess(message: string, title: string = 'Success') {
    this.toastr.success(message, title, {
      progressBar: true,
      timeOut: 3000
    });
  }

  showError(message: string, title: string = 'Error') {
    this.toastr.error(message, title, {
      progressBar: true,
      timeOut: 4000
    });
  }

  showWarning(message: string, title: string = 'Warning') {
    this.toastr.warning(message, title, {
      progressBar: true,
      timeOut: 3500
    });
  }

  showInfo(message: string, title: string = 'Info') {
    this.toastr.info(message, title, {
      progressBar: true,
      timeOut: 3000
    });
  }
}
