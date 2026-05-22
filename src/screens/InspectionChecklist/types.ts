export type ChecklistItem = {
  _id: string;
  task: string;
  isCompleted: boolean;
  notes: string;
  images: string[];
};

export type ChecklistCategory = {
  _id: string;
  title: string;
  items: ChecklistItem[];
  createdAt: string;
  updatedAt: string;
};

export type LocalImage = {
  uri: string;
  type?: string;
  fileName?: string;
};
