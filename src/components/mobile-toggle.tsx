import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button.tsx";
import { MenuIcon, X } from "lucide-react";
import { Link, useRouter } from "@tanstack/react-router";
import { NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu.tsx';
import { useUserStore } from "@/hooks/use-user.store.ts";
import { useState } from "react";

const MobileToggle = () => {
  const { user } = useUserStore();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const isAdmin = user && user.role === 'admin';
  const isModerator = user && user.role === 'moderator';

  router.subscribe("onResolved", () => {
    if (open) {
      setOpen(false);
    }
  });

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
        <MenuIcon className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <Drawer direction="right" open={open} onOpenChange={setOpen}>
        <DrawerContent className="left-auto right-0 top-0 mt-0 flex h-screen w-[230px] flex-col rounded-none [&>*:first-child]:hidden">
          <DrawerHeader className="flex items-center justify-between">
            <DrawerTitle>Menu</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="outline" size="icon">
                <X className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <DrawerHeader className="flex flex-col">
            <Link
              to="/"
            >
              {(state) => (
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()} active={state.isActive}>
                  <span className="!w-full max-w-full">Home</span>
                </NavigationMenuLink>
              )}
            </Link>
            <Link
              to="/products"
            >
              {(state) => (
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()} active={state.isActive}>
                  <span className="!w-full max-w-full">Products</span>
                </NavigationMenuLink>
              )}
            </Link>
            <Link
              to="/posts"
            >
              {(state) => (
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()} active={state.isActive}>
                  <span className="!w-full max-w-full">Posts</span>
                </NavigationMenuLink>
              )}
            </Link>
            {(isAdmin || isModerator) && (
              <Link
                to="/users"
              >
                {(state) => (
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()} active={state.isActive}>
                    <span className="!w-full max-w-full">Users</span>
                  </NavigationMenuLink>
                )}
              </Link>
            )}
            {!user && (
              <Link
                to="/auth"
              >
                {(state) => (
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()} active={state.isActive}>
                    <span className="!w-full max-w-full">Login</span>
                  </NavigationMenuLink>
                )}
              </Link>
            )}
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileToggle;
