import { z } from "zod";

export const codenameSchema = z
    .string()
    .min(1, "Codename is required")
    .max(50, "Codename too long")
    .regex(/^[a-zA-Z0-9_-]+$/, "Codename contains invalid characters");

export type CodenameInput = z.infer<typeof codenameSchema>;
