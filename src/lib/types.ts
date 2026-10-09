export type MartialArtCategory = "striking" | "grappling" | "hybrid" | "weapons";
export type Difficulty = "beginner" | "intermediate" | "advanced";

export type MartialArt = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  originCountry: string;
  category: MartialArtCategory;
  difficulty: Difficulty;
  focusAreas: string[];
  benefits: string[];
};

export type Benefit = {
  title: string;
  description: string;
};

export type Service = {
  title: string;
  description: string;
};
