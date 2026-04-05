import { DatePipe } from '@angular/common';
import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject, debounceTime } from 'rxjs';
import { AuthService } from '../../core/auth.service';
import { Assignment } from '../../core/models/assignment.model';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog';
import { SUBJECT_OPTIONS } from '../../shared/subjects';
import { AssignmentService } from '../assignment.service';

@Component({
  selector: 'app-assignment-list',
  imports: [
    DatePipe,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  templateUrl: './assignment-list.html',
  styleUrl: './assignment-list.css',
})
export class AssignmentListComponent implements OnInit {
  private readonly service = inject(AssignmentService);
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly snack = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchDebounced = new Subject<void>();

  readonly subjects = SUBJECT_OPTIONS;
  readonly displayedColumns = ['nom', 'subject', 'dateDeRendu', 'rendu', 'grade', 'actions'];
  readonly rows = signal<Assignment[]>([]);
  readonly loading = signal(true);
  readonly total = signal(0);
  readonly pageSize = signal(15);
  readonly pageIndex = signal(0);
  readonly searchQuery = signal('');
  readonly subjectFilter = signal('');
  readonly renduFilter = signal<'all' | 'yes' | 'no'>('all');

  ngOnInit(): void {
    this.searchDebounced
      .pipe(debounceTime(350), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.pageIndex.set(0);
        this.load();
      });
    this.load();
  }

  onSearchInput(ev: Event): void {
    const v = (ev.target as HTMLInputElement).value;
    this.searchQuery.set(v);
    this.searchDebounced.next();
  }

  onSubjectChange(value: string): void {
    this.subjectFilter.set(value ?? '');
    this.pageIndex.set(0);
    this.load();
  }

  onRenduChange(value: string): void {
    this.renduFilter.set((value as 'all' | 'yes' | 'no') || 'all');
    this.pageIndex.set(0);
    this.load();
  }

  load(): void {
    this.loading.set(true);
    const r = this.renduFilter();
    const rendu: 'true' | 'false' | '' =
      r === 'yes' ? 'true' : r === 'no' ? 'false' : '';
    this.service
      .list(this.pageIndex() + 1, this.pageSize(), {
        q: this.searchQuery(),
        subject: this.subjectFilter(),
        rendu,
      })
      .subscribe({
        next: (page) => {
          this.rows.set(page.data);
          this.total.set(page.total);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.snack.open('Impossible de charger les devoirs', 'OK', { duration: 4000 });
        },
      });
  }

  onPage(ev: PageEvent): void {
    this.pageIndex.set(ev.pageIndex);
    this.pageSize.set(ev.pageSize);
    this.load();
  }

  delete(a: Assignment): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Supprimer le devoir',
        message: `Supprimer « ${a.nom} » ?`,
        confirmLabel: 'Supprimer',
      },
      width: '360px',
    });
    ref.afterClosed().subscribe((ok) => {
      if (!ok || !a._id) return;
      this.service.delete(a._id).subscribe({
        next: () => {
          this.snack.open('Devoir supprimé', 'OK', { duration: 2500 });
          this.load();
        },
        error: (err) => {
          const msg = err?.error?.message ?? 'Erreur';
          this.snack.open(msg, 'OK', { duration: 4000 });
        },
      });
    });
  }

  goEdit(a: Assignment): void {
    void this.router.navigate(['/assignments', a._id, 'edit']);
  }
}
