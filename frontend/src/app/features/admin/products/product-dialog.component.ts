import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Product, Category } from '../../../core/models/product.model';
import { CustomValidators } from '../../../core/utilities/custom-validators';

/**
 * AdminProductDialogComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Popup dialogue form for admins to create new products or modify existing ones.
 */
@Component({
  selector: 'app-admin-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class AdminProductDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AdminProductDialogComponent>);

  productForm: FormGroup;
  isEditMode = false;
  categories: Category[] = ['CAKE', 'BOUQUET', 'GIFT', 'COMBO'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { product?: Product }) {
    this.isEditMode = !!data?.product;

    this.productForm = this.fb.group({
      name: [data?.product?.name || '', [Validators.required, CustomValidators.noWhitespace]],
      description: [data?.product?.description || '', [Validators.required]],
      price: [data?.product?.price || '', [Validators.required, Validators.min(1)]],
      stock: [data?.product?.stock || '', [Validators.required, Validators.min(0)]],
      category: [data?.product?.category || 'CAKE', [Validators.required]],
      imageUrl: [data?.product?.imageUrl || '']
    });
  }

  get f() {
    return this.productForm.controls;
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    
    // Close dialogue, returning the form values
    this.dialogRef.close(this.productForm.value);
  }
}
