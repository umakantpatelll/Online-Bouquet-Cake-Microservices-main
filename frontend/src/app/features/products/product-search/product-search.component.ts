import { Component, Output, EventEmitter, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

/**
 * ProductSearchComponent
 * ----------------------------------------------------
 * Why this file exists:
 * Exposes a search field that debounces typing inputs to prevent flooding the backend with HTTP requests.
 * 
 * RxJS Operators Used:
 * 1. debounceTime(300): Pauses emission of inputs until the user stops typing for 300ms.
 * 2. distinctUntilChanged(): Suppresses duplicate queries (e.g. user backspaces and retypes same character).
 * 
 * Best Practices:
 * 1. Clean up RxJS subscriptions inside `ngOnDestroy()` to avoid memory leaks.
 * 2. Keep the component presentational, delegating query executions to parent controllers.
 */
@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  template: `
    <form [formGroup]="searchForm" class="w-100">
      <mat-form-field appearance="outline" class="w-100 search-field">
        <mat-label>Search cakes, flowers, and bouquets...</mat-label>
        <input matInput type="text" formControlName="query" placeholder="Type to search..." autocomplete="off">
        <mat-icon matPrefix>search</mat-icon>
        <button *ngIf="searchForm.get('query')?.value" type="button" mat-icon-button matSuffix (click)="clearSearch()" aria-label="Clear search input">
          <mat-icon>close</mat-icon>
        </button>
      </mat-form-field>
    </form>
  `,
  styles: [`
    .search-field {
      ::ng-deep .mat-mdc-form-field-subscript-wrapper {
        display: none !important; // Hide subscript padding for clean toolbar styling
      }
    }
  `]
})
export class ProductSearchComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  
  searchForm: FormGroup;
  private querySub?: Subscription;

  @Output() search = new EventEmitter<string>();

  constructor() {
    this.searchForm = this.fb.group({
      query: ['']
    });
  }

  ngOnInit(): void {
    // Listen to form value changes reactive stream
    this.querySub = this.searchForm.get('query')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(val => {
      this.search.emit(val || '');
    });
  }

  clearSearch(): void {
    this.searchForm.get('query')?.setValue('');
  }

  ngOnDestroy(): void {
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
  }
}
