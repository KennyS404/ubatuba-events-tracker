export interface Event {
  id: number;
  title: string;
  description?: string | null;
  date: string;
  location: string;
  category?: string;
  creator_id: number;
  image_content_type?: string | null;
  created_at: string;
  updated_at?: string | null;
}

export interface EventFormData {
  title: string;
  description: string;
  date: Date | null;
  location: string;
  category: string;
}