import { z } from "zod";

export const ESASSymptomNames = [
  "dolor",
  "fatiga",
  "náusea",
  "depresión",
  "ansiedad",
  "somnolencia",
  "apetito",
  "bienestar",
  "disnea",
  "otros",
] as const;

export const ESASSymptomSchema = z.object({
  dolor: z.number().min(0).max(10),
  fatiga: z.number().min(0).max(10),
  náusea: z.number().min(0).max(10),
  depresión: z.number().min(0).max(10),
  ansiedad: z.number().min(0).max(10),
  somnolencia: z.number().min(0).max(10),
  apetito: z.number().min(0).max(10),
  bienestar: z.number().min(0).max(10),
  disnea: z.number().min(0).max(10),
  otros: z.number().min(0).max(10),
});

export const ESASAssessmentSchema = z.object({
  id: z.string(),
  timestamp: z.number(),
  dateTime: z.string(),
  symptoms: ESASSymptomSchema,
  notes: z.string().optional(),
  patient: z.string(),
  professional: z.string(),
});

export type ESASSymptomName = (typeof ESASSymptomNames)[number];
export type ESASSymptoms = z.infer<typeof ESASSymptomSchema>;
export type ESASAssessment = z.infer<typeof ESASAssessmentSchema>;
