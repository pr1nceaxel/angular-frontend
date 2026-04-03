import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AssignmentService } from '../assignment.service';
import { SUBJECT_OPTIONS, findSubjectByLabel } from '../../shared/subjects';

@Component({
  selector: 'app-assignment-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatStepperModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './assignment-form.html',
  styleUrls: ['./assignment-form.css'],
})
export class AssignmentFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(AssignmentService);
  private readonly snack = inject(MatSnackBar);

  readonly subjects = SUBJECT_OPTIONS;
  readonly loading = signal(false);
  readonly isAdd = signal(true);
  private assignmentId: string | null = null;

  readonly step1 = this.fb.nonNullable.group({
    nom: ['', Validators.required],
    dateDeRendu: ['', Validators.required],
    authorName: [''],
    authorPhoto: [''],
  });

  readonly step2 = this.fb.nonNullable.group({
    subjectKey: ['', Validators.required],
  });

  readonly step3 = this.fb.nonNullable.group({
    grade: [null as number | null],
    rendu: [false],
    remarks: [''],
  });

  readonly editForm = this.fb.nonNullable.group({
    nom: ['', Validators.required],
    dateDeRendu: ['', Validators.required],
    authorName: [''],
    authorPhoto: [''],
    subjectKey: ['', Validators.required],
    grade: [null as number | null],
    rendu: [false],
    remarks: [''],
  });

  ngOnInit(): void {
    this.assignmentId = this.route.snapshot.paramMap.get('id');
    this.isAdd.set(!this.assignmentId);

    if (this.assignmentId) {
      this.loading.set(true);
      this.service.getById(this.assignmentId).subscribe({
        next: (a) => {
          const sub = findSubjectByLabel(a.subject ?? '');
          const dateStr =
            typeof a.dateDeRendu === 'string'
              ? a.dateDeRendu.slice(0, 10)
              : new Date(a.dateDeRendu).toISOString().slice(0, 10);
          this.editForm.patchValue({
            nom: a.nom,
            dateDeRendu: dateStr,
            authorName: a.authorName,
            authorPhoto: a.authorPhoto,
            subjectKey: sub?.id ?? '',
            grade: a.grade,
            rendu: a.rendu,
            remarks: a.remarks,
          });
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.snack.open('Chargement impossible', 'OK', { duration: 3000 });
          void this.router.navigate(['/assignments']);
        },
      });
    }
  }

  submitAdd(): void {
    if (this.step1.invalid || this.step2.invalid) return;
    const s3 = this.step3.getRawValue();
    if (s3.rendu && (s3.grade === null || s3.grade === undefined)) {
      this.snack.open('Une note est obligatoire si le devoir est rendu.', 'OK', { duration: 4000 });
      return;
    }
    const s1 = this.step1.getRawValue();
    const sk = this.step2.getRawValue().subjectKey;
    const sub = this.subjects.find((x) => x.id === sk)!;
    const body = {
      nom: s1.nom,
      dateDeRendu: s1.dateDeRendu,
      authorName: s1.authorName,
      authorPhoto: s1.authorPhoto,
      subject: sub.label,
      subjectImageUrl: sub.subjectImageUrl,
      teacherName: sub.teacherName,
      teacherPhotoUrl: sub.teacherPhotoUrl,
      grade: s3.rendu ? Number(s3.grade) : null,
      rendu: s3.rendu,
      remarks: s3.remarks ?? '',
    };
    this.service.create(body).subscribe({
      next: () => {
        this.snack.open('Devoir créé', 'OK', { duration: 2500 });
        void this.router.navigate(['/assignments']);
      },
      error: (err) => {
        this.snack.open(err?.error?.message ?? 'Erreur', 'OK', { duration: 4000 });
      },
    });
  }

  submitEdit(): void {
    if (this.editForm.invalid || !this.assignmentId) return;
    const v = this.editForm.getRawValue();
    if (v.rendu && (v.grade === null || v.grade === undefined)) {
      this.snack.open('Une note est obligatoire si le devoir est rendu.', 'OK', { duration: 4000 });
      return;
    }
    const sub = this.subjects.find((x) => x.id === v.subjectKey)!;
    const body = {
      nom: v.nom,
      dateDeRendu: v.dateDeRendu,
      authorName: v.authorName,
      authorPhoto: v.authorPhoto,
      subject: sub.label,
      subjectImageUrl: sub.subjectImageUrl,
      teacherName: sub.teacherName,
      teacherPhotoUrl: sub.teacherPhotoUrl,
      grade: v.rendu ? Number(v.grade) : null,
      rendu: v.rendu,
      remarks: v.remarks ?? '',
    };
    this.service.update(this.assignmentId, body).subscribe({
      next: () => {
        this.snack.open('Devoir mis à jour', 'OK', { duration: 2500 });
        void this.router.navigate(['/assignments', this.assignmentId]);
      },
      error: (err) => {
        this.snack.open(err?.error?.message ?? 'Erreur', 'OK', { duration: 4000 });
      },
    });
  }
}
