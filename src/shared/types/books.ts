export type Book = {
  _id: number;
  title: string;
  author: string;
  status: string;
  image_url?: string;
  onClick?: () => void;
};
