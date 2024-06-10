import { ThumbsUp } from "lucide-react";

import { IPostCommentItem } from "@/types/post.interface.ts";
import Page from "@/components/page.tsx";
import { PostCardReaction } from "@/routes/posts/-components/post-card.tsx";

interface PostCommentsProps {
  comments?: IPostCommentItem[];
}

const PostComments = ({ comments }: PostCommentsProps) => {
  if (!comments) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <Page.H2>Comments</Page.H2>
      <div className="flex flex-col gap-2">
        {comments.map((comment) => (
          <div key={comment.id} className="flex flex-col items-stretch gap-2 rounded-md border px-4 py-2 sm:flex-row">
            <div className="flex w-full items-center justify-between p-1 sm:w-44 sm:flex-col sm:items-start sm:justify-start sm:border-r-[1px]">
              <p className="text-sm font-semibold">{comment.user.fullName}</p>
              <p className="text-xs italic text-muted-foreground">@{comment.user.username}</p>
            </div>
            <div className="flex flex-auto flex-col gap-1 p-1">
              <p>{comment.body}</p>
              <PostCardReaction
                label={`${comment.likes} like(s)`}
                text={comment.likes}
                Icon={ThumbsUp}
                className="ml-auto"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostComments;
