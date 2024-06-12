import { createFileRoute } from "@tanstack/react-router";

import Page from "@/components/page.tsx";
import Board from '@/routes/_auth/-components/todo/board.tsx';

export const Route = createFileRoute("/_auth/todo")({
  component: TodoPage,
});

function TodoPage() {
  return (
    <Page>
      <Page.H1>ToDo</Page.H1>
      <div className="h-full">
        <Board />
      </div>
    </Page>
  );
}
