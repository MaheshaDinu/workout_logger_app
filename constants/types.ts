export interface Exercise {
    name: string;
    sets: number;
    reps: number;
    weight: number; // in kg
}

export interface Workout {
    id: string;
    date: string; // ISO date string
    notes?: string;
    exercises: Exercise[];
}