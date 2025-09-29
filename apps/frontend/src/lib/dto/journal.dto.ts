export type Journal = {
  id: string;
  title: string;
  location: string;
  description: string;
  date: Date;
  theme: string;
  photos: string[];
  visibility: "PRIVATE" | "PUBLIC";
};
