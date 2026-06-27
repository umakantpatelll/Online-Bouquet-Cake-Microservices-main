import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';

/**
 * PaymentSelectionComponent (Presentational Form Step Component)
 * ----------------------------------------------------
 * Why this file exists:
 * Presents users with selectable mock payment options (Card, UPI, COD).
 */
@Component({
  selector: 'app-payment-selection',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatRadioModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './payment-selection.component.html',
  styleUrls: ['./payment-selection.component.scss']
})
export class PaymentSelectionComponent {
  @Input({ required: true }) paymentForm!: FormGroup;

  paymentOptions = [
    { value: 'CREDIT_DEBIT_CARD', label: 'Credit / Debit Card', icon: 'credit_card', desc: 'Securely pay via Visa, Mastercard, or RuPay.' },
    { value: 'UPI', label: 'UPI / NetBanking', icon: 'account_balance_wallet', desc: 'Pay instantly using Google Pay, PhonePe, or BHIM.' },
    { value: 'CASH_ON_DELIVERY', label: 'Cash on Delivery (COD)', icon: 'payments', desc: 'Pay with cash at the time of package delivery.' }
  ];
}
