export interface Task {
  id: string;
  name: string;
  comment: string;
  startDate: string;
  endDate: string | null;
  status: 'start' | 'ongoing' | 'done';
}