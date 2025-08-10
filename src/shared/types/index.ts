export type TNewsItem = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
}

export type TNewsResponse = {
  posts: TNewsItem[];
  total: number;
  skip: number;
  limit: number;
}

export type TNewsState = {
  items: TNewsItem[];
  loading: boolean;
  error: string | null;
  total: number;
  skip: number;
  hasMore: boolean;
}
