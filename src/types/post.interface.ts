import { IBaseListResponse } from "@/types/base.interfaces.ts";

export interface IPostsListItem {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

export interface IPostsList extends IBaseListResponse {
  posts: IPostsListItem[];
}
