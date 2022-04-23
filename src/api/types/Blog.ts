export interface Blog {
  id: string;
  name: string;
  tags: string[];
  date: string;
  link: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
}
