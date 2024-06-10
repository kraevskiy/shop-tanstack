import { IBaseListResponse } from "@/types/base.interfaces.ts";
import { IUser } from "@/types/user.interface.ts";

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

export interface IPostCommentItem {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
}

export interface IPostCommentsList extends IBaseListResponse {
  comments: IPostCommentItem[];
}

export interface IPostAuthor extends Pick<IUser, "firstName" | "lastName" | "username" | "image"> {}
