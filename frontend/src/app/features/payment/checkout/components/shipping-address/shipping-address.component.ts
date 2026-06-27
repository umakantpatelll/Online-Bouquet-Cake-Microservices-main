import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/**
 * ShippingAddressComponent (Presentational Form Step Component)
 * ----------------------------------------------------
 * Why this file exists:
 * Form fields for collecting and validating shipping/delivery coordinates.
 * 
 * Best Practices:
 * Binds directly to a parent-owned `FormGroup` input parameter to synchronize wizard steps validations.
 */
@Component({
  selector: 'app-shipping-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.scss']
})
export class ShippingAddressComponent {
  @Input({ required: true }) addressForm!: FormGroup;

  get f() {
    return this.addressForm.controls;
  }
}
