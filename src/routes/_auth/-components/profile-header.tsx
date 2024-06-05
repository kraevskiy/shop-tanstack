import { AspectRatio } from "@/components/ui/aspect-ratio.tsx";
import Page from "@/components/page.tsx";
import { IUser } from "@/types/user.interface.ts";

interface ProfileHeaderProps {
  user?: IUser | null;
  isMe?: boolean;
}

const ProfileHeader = ({ user, isMe }: ProfileHeaderProps) => {
  if (!user) {
    return null;
  }

  return (
    <div className="mb-4 flex items-center gap-4">
      <div className="w-[100px]">
        <AspectRatio ratio={1}>
          <img src={user?.image} alt="User" className="rounded-md object-cover" />
        </AspectRatio>
      </div>
      <div>
        <Page.H1>
          {(isMe === undefined || isMe) && (
            <span>
              Hello 👋 <br />
            </span>
          )}{" "}
          {user?.firstName} {user?.lastName}
        </Page.H1>
        <p className="text-xs text-muted-foreground">
          @{user?.username} / {user?.email}
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
