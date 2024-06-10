import { IPostAuthor } from "@/types/post.interface.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { cn, initialName } from '@/lib/utils.ts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';

interface PostUserProps {
  author?: IPostAuthor;
  className?: string;
}

const PostUser = ({ author, className }: PostUserProps) => {
  if (!author) {
    return null;
  }

  const {firstName, lastName, username, image} = author;

  return (
    <div className={cn("inline-flex gap-2 rounded-md border px-2 py-1 sm:gap-3 sm:px-4 sm:py-2 items-center", className)}>
      <Avatar className="w-10 h-10 sm:w-14 sm:h-14 border overflow-hidden">
        <AvatarFallback className="border">
          {initialName(firstName, lastName)}
        </AvatarFallback>
        <AvatarImage src={image} alt={username}/>
      </Avatar>
      <div className="flex flex-col gap-0 sm:gap-0.5">
        <p className="text-sm sm:text-lg m-0">{firstName} {lastName}</p>
        <p className="text-xs sm:text-sm m-0 text-muted-foreground italic">@{username}</p>
      </div>
    </div>
  );
};

export const PostUserSkeleton = ({ className }: { className?: string }) => (
  <div className={cn("inline-flex gap-2 rounded-md border px-2 py-1 sm:gap-3 sm:px-4 sm:py-2 items-center", className)}>
    <Skeleton className="w-10 h-10 sm:w-14 sm:h-14 rounded-full" />
    <div className="flex flex-col gap-0.5 sm:gap-1">
      <Skeleton className="w-20 h-4 sm:h-5"/>
      <Skeleton className="w-20 h-3 sm:h-4"/>
    </div>
  </div>
);

PostUser.Skeleton = PostUserSkeleton;

export default PostUser;
