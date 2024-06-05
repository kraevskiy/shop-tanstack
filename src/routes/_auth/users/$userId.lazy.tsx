import { createLazyFileRoute } from "@tanstack/react-router";

import Page from "@/components/page.tsx";
import { useUserIdQuery } from "@/lib/queries.ts";
import { useUserStore } from "@/hooks/use-user.store.ts";
import ProfileHeader from "@/routes/_auth/-components/profile-header.tsx";
import Spinner from "@/components/spinner.tsx";
import ProfileAddress from "@/routes/_auth/-components/profile-address.tsx";
import ProfileCompany from "@/routes/_auth/-components/profile-company.tsx";
import ProfileBilling from "@/routes/_auth/-components/profile-billing.tsx";

export const Route = createLazyFileRoute("/_auth/users/$userId")({
  component: UserIdPage,
});

function UserIdPage() {
  const { userId } = Route.useParams();
  const { user } = useUserStore();
  const { data, isLoading, isPending, isFetching } = useUserIdQuery(userId);
  const isMe = Number(userId) === user?.id;

  if (isLoading || isPending || isFetching) {
    return (
      <div className="flex w-full justify-center p-2 text-2xl">
        <Spinner />
      </div>
    );
  }

  return (
    <Page>
      <ProfileHeader user={data} isMe={isMe} />
      <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
        <ProfileAddress user={data} title={!isMe ? "User address:" : undefined} type="accordion" />
        <ProfileCompany user={data} title={!isMe ? "User company:" : undefined} type="accordion" />
        <ProfileBilling
          user={data}
          title={!isMe ? "User billing bank info:" : undefined}
          billingType="bank"
          type="accordion"
        />
        <ProfileBilling
          user={data}
          title={!isMe ? "User billing crypto info:" : undefined}
          billingType="crypto"
          type="accordion"
        />
      </div>
    </Page>
  );
}
