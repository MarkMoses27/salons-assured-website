function requiredValue(
  value: string | undefined,
  errorMessage: string,
): string {
  if (!value) {
    throw new Error(errorMessage);
  }

  return value;
}

export const projectId = requiredValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing NEXT_PUBLIC_SANITY_PROJECT_ID",
);

export const dataset = requiredValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing NEXT_PUBLIC_SANITY_DATASET",
);

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-15";