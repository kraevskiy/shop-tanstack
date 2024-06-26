import { Link } from "@tanstack/react-router";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useUserStore } from "@/hooks/use-user.store.ts";
import { ModeToggle } from "@/components/mode-toggler.tsx";
import UserMenu from "@/components/menus/user.menu.tsx";
import ShopCardMenu from "@/components/menus/shop-card.menu.tsx";
import MobileToggle from "@/components/mobile-toggle.tsx";

const Navigation = () => {
  const { user } = useUserStore();
  const isAdmin = user && user.role === "admin";
  const isModerator = user && user.role === "moderator";

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="hidden md:block">
          <Link to="/">
            {(state) => (
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()} active={state.isActive}>
                <span>Home</span>
              </NavigationMenuLink>
            )}
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <Link to="/products">
            {(state) => (
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()} active={state.isActive}>
                <span>Products</span>
              </NavigationMenuLink>
            )}
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <Link to="/posts">
            {(state) => (
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()} active={state.isActive}>
                <span>Posts</span>
              </NavigationMenuLink>
            )}
          </Link>
        </NavigationMenuItem>
        {(isAdmin || isModerator) && (
          <NavigationMenuItem className="hidden md:block">
            <Link to="/users">
              {(state) => (
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()} active={state.isActive}>
                  <span>Users</span>
                </NavigationMenuLink>
              )}
            </Link>
          </NavigationMenuItem>
        )}
        {user && (
          <NavigationMenuItem className="hidden md:block">
            <Link to="/todo">
              {(state) => (
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()} active={state.isActive}>
                  <span>ToDo</span>
                </NavigationMenuLink>
              )}
            </Link>
          </NavigationMenuItem>
        )}
        {user && (
          <>
            <NavigationMenuItem>
              <ShopCardMenu />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <UserMenu />
            </NavigationMenuItem>
          </>
        )}
        {!user && (
          <NavigationMenuItem className="hidden md:block">
            <Link to="/auth">
              {(state) => (
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()} active={state.isActive}>
                  <span>Login</span>
                </NavigationMenuLink>
              )}
            </Link>
          </NavigationMenuItem>
        )}
        <NavigationMenuItem>
          <ModeToggle />
        </NavigationMenuItem>
        <NavigationMenuItem className="md:hidden">
          <MobileToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
