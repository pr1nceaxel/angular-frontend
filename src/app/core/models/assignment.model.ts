export interface Assignment {
  _id: string;
  nom: string;
  dateDeRendu: string;
  rendu: boolean;
  authorName: string;
  authorPhoto: string;
  subject: string;
  subjectImageUrl: string;
  teacherName: string;
  teacherPhotoUrl: string;
  grade: number | null;
  remarks: string;
}

export interface AssignmentPage {
  data: Assignment[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
