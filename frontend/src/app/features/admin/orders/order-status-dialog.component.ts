import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { OrderResponse } from '../../../core/models/checkout.model';

/**
 * AdminOrderStatusDialogComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Dialog window allowing admins to modify delivery status or assign staff.
 */
@Component({
  selector: 'app-admin-order-status-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './order-status-dialog.component.html',
  styleUrls: ['./order-status-dialog.component.scss']
})
export class AdminOrderStatusDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AdminOrderStatusDialogComponent>);

  statusForm: FormGroup;
  statusOptions = ['PENDING', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];
  
  staffOptions = [
    { id: 101, name: 'John (Local Courier)' },
    { id: 102, name: 'Dave (Bakery Express)' },
    { id: 103, name: 'Alice (Floral Delivery Service)' }
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { order: OrderResponse }) {
    this.statusForm = this.fb.group({
      status: [data.order.status || 'PENDING', Validators.required],
      courierStaffId: [101, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.statusForm.invalid) return;
    this.dialogRef.close(this.statusForm.value);
  }
}
