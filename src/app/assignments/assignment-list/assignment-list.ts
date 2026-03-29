import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../core/auth.service';
import { Assignment } from '../../core/models/assignment.model';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog';
import { AssignmentService } from '../assignment.service';

@Component({
  selector: 'app-assignment-list',
  imports: [
    DatePipe,
    RouterLink,
    MatCardModule,
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

  readonly displayedColumns = ['nom', 'subject', 'dateDeRendu', 'rendu', 'grade', 'actions'];
  readonly rows = signal<Assignment[]>([]);
  readonly loading = signal(true);
  readonly total = signal(0);
  readonly pageSize = signal(15);
  readonly pageIndex = signal(0);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.service.list(this.pageIndex() + 1, this.pageSize()).subscribe({
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
