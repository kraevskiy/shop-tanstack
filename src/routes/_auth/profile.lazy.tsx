import { createLazyFileRoute } from "@tanstack/react-router";

import { useUserStore } from "@/hooks/use-user.store.ts";
import { AspectRatio } from "@/components/ui/aspect-ratio.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import Page from '@/components/page.tsx';

export const Route = createLazyFileRoute("/_auth/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useUserStore();

  return (
    <div className="flex flex-col md:items-center">
      <div className="mb-4 flex items-center gap-4">
        <div className="w-[100px]">
          <AspectRatio ratio={1}>
            <img src={user?.image} alt="User" className="rounded-md object-cover" />
          </AspectRatio>
        </div>
        <div>
          <Page.H1>
            Hello 👋 <br /> {user?.firstName} {user?.lastName}
          </Page.H1>
          <p className="text-xs text-muted-foreground">
            @{user?.username} / {user?.email}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Address:</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Address: <span className="font-semibold">{user?.address.address}</span>
            </p>
            <p className="text-muted-foreground">
              City: <span className="font-semibold">{user?.address.city}</span>
            </p>
            <p className="text-muted-foreground">
              Country: <span className="font-semibold">{user?.address.country}</span>
            </p>
            <p className="text-muted-foreground">
              Postal code: <span className="font-semibold">{user?.address.postalCode}</span>
            </p>
            <p className="text-muted-foreground">
              State: <span className="font-semibold">{user?.address.state}</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Company:</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Name: <span className="font-semibold">{user?.company.name}</span>
            </p>
            <p className="text-muted-foreground">
              Department: <span className="font-semibold">{user?.company.department}</span>
            </p>
            <p className="text-muted-foreground">
              Position: <span className="font-semibold">{user?.company.title}</span>
            </p>
            <p className="text-muted-foreground">
              Address:{" "}
              <span className="font-semibold">
                {user?.company.address.address}, {user?.company.address.city}, {user?.company.address.country}
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
