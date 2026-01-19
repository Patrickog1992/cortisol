export interface UserData {
  cortisolKnowledge?: string;
  weightLossReason?: string;
  bodyType?: string;
  timeSinceIdealWeight?: string;
  desiredBodyType?: string;
  focusAreas: string[];
  menopauseStatus?: string;
  symptoms: string[];
  activityLevel?: string;
  walkingDuration?: string;
  waterIntake?: string;
  sleepHours?: string;
  height?: number; // cm
  currentWeight?: number; // kg
  desiredWeight?: number; // kg
  age?: number;
}

export type ViewState = 'quiz' | 'loading' | 'sales';
