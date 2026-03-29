import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../core/auth.service';
import { Assignment } from '../../core/models/assignment.model';
import { AssignmentService } from '../assignment.service';

@Component({
  selector: 'app-assignment-detail',
  imports: [
    DatePipe,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './assignment-detail.html',
  styleUrl: './assignment-detail.css',
})
export class AssignmentDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(AssignmentService);
  private readonly snack = inject(MatSnackBar);
  readonly auth = inject(AuthService);

  readonly assignment = signal<Assignment | null>(null);
  readonly loading = signal(true);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      void this.router.navigate(['/assignments']);
      return;
    }
    this.service.getById(id).subscribe({
      next: (a) => {
        this.assignment.set(a);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.snack.open('Devoir introuvable', 'OK', { duration: 3000 });
        void this.router.navigate(['/assignments']);
      },
    });
  }
}
