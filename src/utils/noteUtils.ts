
export type Note = 'Do' | 'Re' | 'Mi' | 'Fa' | 'Sol' | 'La' | 'Si';
export type PlayableNote = 'Do' | 'Fa' | 'Sol' | 'LowerDo';

export interface NoteButton {
  note: Note;
  isPlayable: boolean;
  number: number;
}

export const NOTES: NoteButton[] = [
  { note: 'Do', isPlayable: true, number: 1 },
  { note: 'Re', isPlayable: false, number: 2 },
  { note: 'Mi', isPlayable: false, number: 3 },
  { note: 'Fa', isPlayable: true, number: 4 },
  { note: 'Sol', isPlayable: true, number: 5 },
  { note: 'La', isPlayable: false, number: 6 },
  { note: 'Si', isPlayable: false, number: 7 },
  { note: 'Do', isPlayable: true, number: 8 },
];

export const PLAYABLE_NOTES: PlayableNote[] = ['Do', 'Fa', 'Sol', 'LowerDo'];

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
