import { createLazyFileRoute } from "@tanstack/react-router";

import { useUserStore } from "@/hooks/use-user.store.ts";
import ProfileHeader from "@/routes/_auth/-components/profile-header.tsx";
import ProfileAddress from '@/routes/_auth/-components/profile-address.tsx';
import ProfileCompany from '@/routes/_auth/-components/profile-company.tsx';
import Page from '@/components/page.tsx';

export const Route = createLazyFileRoute("/_auth/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useUserStore();

  return (
    <Page>
      <ProfileHeader user={user} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ProfileAddress user={user} />
        <ProfileCompany user={user} />
      </div>
    </Page>
  );
}
