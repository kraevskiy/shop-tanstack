import { createLazyFileRoute } from "@tanstack/react-router";

import { useUserStore } from "@/hooks/use-user.store.ts";
import Page from '@/components/page.tsx';
import HeaderProfile from '@/routes/_auth/-components/profile/header.profile.tsx';
import AddressProfile from '@/routes/_auth/-components/profile/address.profile.tsx';
import CompanyProfile from '@/routes/_auth/-components/profile/company.profile.tsx';

export const Route = createLazyFileRoute("/_auth/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useUserStore();

  return (
    <Page>
      <HeaderProfile user={user} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AddressProfile user={user} />
        <CompanyProfile user={user} />
      </div>
    </Page>
  );
}
