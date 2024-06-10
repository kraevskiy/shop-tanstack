import { createLazyFileRoute } from "@tanstack/react-router";
import { Eye, ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect } from "react";

import Page from "@/components/page.tsx";
import { cn } from "@/lib/utils.ts";
import Spinner from "@/components/spinner.tsx";
import { usePostIdCommentsMutation, usePostIdQuery, usePostIdUserMutation } from "@/lib/queries.ts";
import PostUser from "@/routes/posts/-components/post-user.tsx";
import PostCard from "./-components/post-card";
import { Badge } from "@/components/ui/badge.tsx";
import PostComments from "@/routes/posts/-components/post-comments.tsx";

export const Route = createLazyFileRoute("/posts/$postId")({
  component: PostIdPage,
});

function PostIdPage() {
  const { postId } = Route.useParams();
  const { data: post, isLoading, isSuccess } = usePostIdQuery(postId);
  const { mutate: fetchComments, data: comments } = usePostIdCommentsMutation();
  const { mutate: fetchAuthor, data: author, isPending: isPendingAuthor } = usePostIdUserMutation();

  useEffect(() => {
    if (post && isSuccess) {
      fetchAuthor(post.userId.toString());
      fetchComments(post.id.toString());
    }
  }, [post, fetchAuthor, fetchComments]);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <div className={cn("mx-auto flex justify-center rounded-2xl border bg-background p-5 transition-all")}>
          <Spinner show={true} />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <Page>
        <Page.H1>Post not found</Page.H1>
      </Page>
    );
  }

  return (
    <Page>
      <Page.H1 className="mb-5">{post.title}</Page.H1>
      <div className="flex flex-col items-start justify-between gap-2 xs:flex-row xs:items-center">
        {isPendingAuthor ? <PostUser.Skeleton className="mb-2" /> : <PostUser author={author} className="mb-2" />}
        <div className="flex flex-col items-start gap-2 xs:items-end">
          <div className="flex gap-2">
            <PostCard.Reaction label={`${post.reactions.likes} like(s)`} text={post.reactions.likes} Icon={ThumbsUp} />
            <PostCard.Reaction
              label={`${post.reactions.dislikes} dislike(s)`}
              text={post.reactions.dislikes}
              Icon={ThumbsDown}
            />
            <PostCard.Reaction label={`${post.reactions.dislikes} view(s)`} text={post.views} Icon={Eye} />
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <p className="mb-5">{post.body}</p>
      <PostComments comments={comments?.comments} />
    </Page>
  );
}
