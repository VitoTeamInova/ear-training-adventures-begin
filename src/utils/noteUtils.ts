
export type Note = 'Do' | 'Re' | 'Mi' | 'Fa' | 'Sol' | 'La' | 'Si';
export type PlayableNote = 'Do' | 'Fa' | 'Sol';

export interface NoteButton {
  note: Note;
  isPlayable: boolean;
}

export const NOTES: NoteButton[] = [
  { note: 'Do', isPlayable: true },
  { note: 'Re', isPlayable: false },
  { note: 'Mi', isPlayable: false },
  { note: 'Fa', isPlayable: true },
  { note: 'Sol', isPlayable: true },
  { note: 'La', isPlayable: false },
  { note: 'Si', isPlayable: false },
  { note: 'Do', isPlayable: true },
];

export const PLAYABLE_NOTES: PlayableNote[] = ['Do', 'Fa', 'Sol'];

export interface ExerciseResult {
  date: Date;
  totalExercises: number;
  totalAttempts: number;
  successPercentage: number;
}

export function getRandomPlayableNote(): PlayableNote {
  const index = Math.floor(Math.random() * PLAYABLE_NOTES.length);
  return PLAYABLE_NOTES[index];
}

export function calculateSuccessPercentage(exercises: number, attempts: number): number {
  if (exercises === 0) return 0;
  return Math.round((exercises / attempts) * 100);
}
