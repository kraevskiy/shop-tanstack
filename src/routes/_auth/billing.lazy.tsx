import { createLazyFileRoute } from "@tanstack/react-router";

import { useUserStore } from "@/hooks/use-user.store.ts";
import Page from "@/components/page.tsx";
import ProfileBilling from "@/routes/_auth/-components/profile-billing.tsx";

export const Route = createLazyFileRoute("/_auth/billing")({
  component: BillingPage,
});

function BillingPage() {
  const { user } = useUserStore();

  return (
    <div className="flex flex-col md:items-center">
      <Page.H1 className="mb-4">Billing</Page.H1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ProfileBilling user={user} billingType="bank" />
        <ProfileBilling user={user} billingType="crypto" />
      </div>
    </div>
  );
}
