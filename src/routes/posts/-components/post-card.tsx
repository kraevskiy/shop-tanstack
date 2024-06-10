import { ThumbsDown, ThumbsUp, Eye, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { Link } from "@tanstack/react-router";

import { IPostsListItem } from "@/types/post.interface.ts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import ActionTooltip from "@/components/action-tooltip.tsx";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";

interface PostCardReactionProps {
  label: string;
  text?: string | number;
  Icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  className?: string;
}

export const PostCardReaction = ({ label, text, Icon, className }: PostCardReactionProps) => {
  return (
    <ActionTooltip label={label}>
      <div
        className={cn(
          "flex h-7 items-center space-x-1 rounded-md border px-1 py-1 text-xs text-muted-foreground sm:h-8 sm:space-x-2 sm:px-2",
          className,
        )}
      >
        {Icon && <Icon className="h-3 w-3 sm:h-4 sm:w-4" />}
        {text && <span className="text-[0.75rem] sm:text-xs">{text}</span>}
        {!text && !Icon && <span className="text-[0.75rem] sm:text-xs">{label}</span>}
      </div>
    </ActionTooltip>
  );
};

interface PostCardProps {
  post: IPostsListItem;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="line-clamp-2 overflow-hidden text-ellipsis">
          <Link
            to="/posts/$postId"
            params={{
              postId: post.id.toString(),
            }}
            className="transition-colors hover:text-muted-foreground"
          >
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3 overflow-hidden text-ellipsis xs:line-clamp-3 sm:line-clamp-2">
          {post.body}
        </CardDescription>
      </CardContent>
      <CardFooter className="mt-auto flex justify-end gap-2 pb-3">
        <PostCard.Reaction label={`${post.reactions.likes} like(s)`} text={post.reactions.likes} Icon={ThumbsUp} />
        <PostCard.Reaction
          label={`${post.reactions.dislikes} dislike(s)`}
          text={post.reactions.dislikes}
          Icon={ThumbsDown}
        />
        <PostCard.Reaction label={`${post.reactions.dislikes} view(s)`} text={post.views} Icon={Eye} />

        <Button asChild className="ml-auto">
          <Link
            to="/posts/$postId"
            params={{
              postId: post.id.toString(),
            }}
          >
            Read more...
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

PostCard.Reaction = PostCardReaction;

export default PostCard;
