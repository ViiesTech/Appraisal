export type FileItem = {
  url: string;
  type: 'image' | 'document';
  name: string;
};

export type Order = {
  id: string;
  status: string;
  images: string[];
  documents: string[];
  property?: {
    address: string;
    type: string;
    form: string;
  };
  client?: {
    name: string;
    phone: string;
    email: string;
  };
  timeline?: {
    assignedAt: string;
    scheduledAt?: string;
  };
  deadline: string;
};
