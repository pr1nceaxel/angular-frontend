/** Matières fixes : image + prof associés (côté UI ; le back stocke les champs texte/URL). */
export interface SubjectOption {
  id: string;
  label: string;
  subjectImageUrl: string;
  teacherName: string;
  teacherPhotoUrl: string;
}

export const SUBJECT_OPTIONS: SubjectOption[] = [
  {
    id: 'bd',
    label: 'Base de données',
    subjectImageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&q=80',
    teacherName: 'Dr. Martin',
    teacherPhotoUrl: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 'web',
    label: 'Technologies Web',
    subjectImageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80',
    teacherName: 'M. Leroy',
    teacherPhotoUrl: 'https://i.pravatar.cc/150?img=33',
  },
  {
    id: 'grails',
    label: 'Grails',
    subjectImageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80',
    teacherName: 'Mme Dubois',
    teacherPhotoUrl: 'https://i.pravatar.cc/150?img=45',
  },
  {
    id: 'angular',
    label: 'Angular',
    subjectImageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80',
    teacherName: 'M. Buffa',
    teacherPhotoUrl: 'https://i.pravatar.cc/150?img=8',
  },
  {
    id: 'java',
    label: 'Java',
    subjectImageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&q=80',
    teacherName: 'M. Chen',
    teacherPhotoUrl: 'https://i.pravatar.cc/150?img=15',
  },
];

export function findSubjectByLabel(label: string): SubjectOption | undefined {
  return SUBJECT_OPTIONS.find((s) => s.label === label);
}
