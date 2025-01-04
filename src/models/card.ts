export interface ICard {
  name: string;
  corpName: string;
  tags: string[];
  benefit: string[];
  promotion?: {
    title: string;
    terms: string;
  };
  payback?: string;
}

export interface IAdBanner {
  title: string;
  description: string;
  link: string;
}
