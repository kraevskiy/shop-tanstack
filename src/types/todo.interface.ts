import { IBaseListResponse } from "@/types/base.interfaces.ts";

export interface ITodoItem {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface ITodoList extends IBaseListResponse {
  todos: ITodoItem[];
}

export type ITodoItemMockStatus = "backlog" | "todo" | "doing" | "done";

export interface ITodoItemMock {
  id: string;
  title: string;
  column: ITodoItemMockStatus;
}

export const DEFAULTS_CARDS: ITodoItemMock[] = [
  {
    id: "1",
    title: "Title 1",
    column: "backlog",
  },
  {
    id: "2",
    title: "Title 2",
    column: "backlog",
  },
  {
    id: "3",
    title: "Title 3",
    column: "todo",
  },
  {
    id: "4",
    title: "Title 4",
    column: "todo",
  },
  {
    id: "5",
    title: "Title 5",
    column: "doing",
  },
  {
    id: "6",
    title: "Title 6",
    column: "done",
  },
];
