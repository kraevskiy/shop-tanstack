import { DropdownMenu } from "@/components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { CreditCard, LogOut, User } from "lucide-react";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";

import { useUserStore } from "@/hooks/use-user.store.ts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { ELocalStorage } from "@/types/local-storage-enum.ts";

const UserMenu = () => {
  const { user, logOut } = useUserStore();
  const router = useRouter();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem(ELocalStorage.token);
    logOut();
    router.invalidate().finally(() => {
      navigate({ to: "/" });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user?.image} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          {user?.firstName} {user?.lastName}
        </DropdownMenuLabel>
        <DropdownMenuLabel className="mt-0 pt-0 text-xs text-muted-foreground">@{user?.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/profile" className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/billing" className="cursor-pointer">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </Link>
          </DropdownMenuItem>
          {/*<DropdownMenuItem>*/}
          {/*  <CreditCard className="mr-2 h-4 w-4" />*/}
          {/*  <span>Billing</span>*/}
          {/*  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>*/}
          {/*</DropdownMenuItem>*/}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogOut} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
