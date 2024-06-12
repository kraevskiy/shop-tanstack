import React, { useState } from "react";
import { Flame, Plus, Trash, X } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils.ts";
import { DEFAULTS_CARDS, ITodoItemMock, ITodoItemMockStatus } from "@/types/todo.interface.ts";
import { Card } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import ActionTooltip from "@/components/action-tooltip.tsx";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area.tsx";

const Board = () => {
  const [cards, setCards] = useState<ITodoItemMock[]>(DEFAULTS_CARDS);

  return (
    <ScrollArea className="min-h-full w-full whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-3 p-4">
        <Column column="backlog" title="backlog" cards={cards} setCards={setCards} />
        <Column column="todo" title="todo" cards={cards} setCards={setCards} />
        <Column column="doing" title="doing" cards={cards} setCards={setCards} />
        <Column column="done" title="done" cards={cards} setCards={setCards} />
        <BurnBarrel setCards={setCards} />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default Board;

interface ColumnProps {
  title?: string;
  headingColor?: string;
  column: ITodoItemMockStatus;
  cards: ITodoItemMock[];
  setCards: React.Dispatch<React.SetStateAction<ITodoItemMock[]>>;
}

const Column = ({ title, cards, column, setCards }: ColumnProps) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, card: ITodoItemMock) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();
    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
    const indicators = getIndicators();
    clearHighlights(indicators);
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e: React.DragEvent<HTMLDivElement>, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;
    return indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      },
    );
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`)) as HTMLElement[];
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-medium">{title}</h3>
        <span className="rounded text-sm">{filteredCards.length}</span>
      </div>

      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "w-full rounded-xl border px-1 transition-colors",
          active && "bg-slate-200 dark:bg-slate-800/50",
        )}
      >
        <ScrollArea className="max-h-full rounded-md pr-2 ">
          {filteredCards.map((card) => (
            <ToDoCard card={card} handleDragStart={handleDragStart} key={card.id} />
          ))}
          <DropIndicator beforeId={-1} column={column} />
          <AddCard column={column} setCards={setCards} />
        </ScrollArea>
      </div>
    </div>
  );
};

const ToDoCard = ({
  card,
  handleDragStart,
}: {
  card: ITodoItemMock;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, card: ITodoItemMock) => void;
}) => {
  const handleDragSt = (e: unknown) => {
    handleDragStart(e as React.DragEvent<HTMLDivElement>, card);
  };

  return (
    <>
      <DropIndicator beforeId={card.id} column={card.column} />
      <motion.div
        layout
        layoutId={card.id}
        onDragStart={handleDragSt}
        draggable="true"
        className="cursor-grab active:cursor-grabbing"
      >
        <Card>
          <p className="p-2 text-sm">{card.title}</p>
        </Card>
      </motion.div>
    </>
  );
};

const DropIndicator = ({ beforeId, column }: { beforeId: number | string; column: ITodoItemMockStatus }) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full rounded-md bg-violet-400/80 opacity-0"
    />
  );
};

const BurnBarrel = ({ setCards }: { setCards: React.Dispatch<React.SetStateAction<ITodoItemMock[]>> }) => {
  const [active, setActive] = useState(false);
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData("cardId");
    setCards((prev) => prev.filter((p) => p.id !== cardId));
    setActive(false);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragEnd}
      className={cn(
        "mt-9 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl",
        active ? "border-destructive bg-red-500/20 text-destructive-foreground" : "",
      )}
    >
      {active ? <Flame className="animate-bounce text-destructive" /> : <Trash />}
    </div>
  );
};

const AddCard = ({
  column,
  setCards,
}: {
  column: ITodoItemMockStatus;
  setCards: React.Dispatch<React.SetStateAction<ITodoItemMock[]>>;
}) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleCreate = () => {
    if (!text.trim().length) {
      return;
    }
    const newCard = {
      column,
      title: text.trim(),
      id: Math.random().toString(),
    };

    setCards((prev) => [...prev, newCard]);
    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.div layout className="flex flex-col gap-2">
          <Textarea placeholder="Add new task" onChange={(e) => setText(e.target.value)} />
          <div className="flex justify-end gap-x-2">
            <ActionTooltip label="Close">
              <Button size="icon" variant="outline" onClick={() => setAdding(false)}>
                <X className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </ActionTooltip>
            <ActionTooltip label="Add">
              <ActionTooltip label="Add">
                <Button size="icon" onClick={handleCreate}>
                  <Plus className="h-[1.2rem] w-[1.2rem]" />
                </Button>
              </ActionTooltip>
            </ActionTooltip>
          </div>
        </motion.div>
      ) : (
        <motion.div layout>
          <Button onClick={() => setAdding(true)} className="w-full" variant="ghost">
            Add card
            <Plus className="ml-1 h-[1.2rem] w-[1.2rem]" />
          </Button>
        </motion.div>
      )}
    </>
  );
};
