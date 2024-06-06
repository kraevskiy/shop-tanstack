import { createLazyFileRoute } from "@tanstack/react-router";

import Page from "@/components/page.tsx";
import { useUserCartsQuery, useUserIdQuery } from "@/lib/queries.ts";
import { useUserStore } from "@/hooks/use-user.store.ts";
import Spinner from "@/components/spinner.tsx";
import CartsListProfile from "@/routes/_auth/-components/profile/carts-list.profile.tsx";
import AddressProfile from "@/routes/_auth/-components/profile/address.profile.tsx";
import CompanyProfile from "@/routes/_auth/-components/profile/company.profile.tsx";
import BillingProfile from "@/routes/_auth/-components/profile/billing.profile.tsx";
import HeaderProfile from "@/routes/_auth/-components/profile/header.profile.tsx";

export const Route = createLazyFileRoute("/_auth/users/$userId")({
  component: UserIdPage,
});

function UserIdPage() {
  const { userId } = Route.useParams();
  const { user } = useUserStore();
  const { data, isLoading, isPending, isFetching } = useUserIdQuery(userId);
  const {
    data: carts,
    isLoading: isLoadingCarts,
    isPending: isPendingCarts,
    isFetching: isFetchingCarts,
  } = useUserCartsQuery(userId);
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
      <HeaderProfile user={data} isMe={isMe} />
      <Page.H2>
        Carts
        <Spinner show={isLoadingCarts || isPendingCarts || isFetchingCarts} />
      </Page.H2>
      <div className="mb-6">
        <CartsListProfile carts={carts?.carts} />
      </div>
      <Page.H2>User information</Page.H2>
      <div className="mb-6 grid grid-cols-1 items-start gap-2 sm:grid-cols-2 md:gap-4">
        <AddressProfile user={data} title={!isMe ? "User address:" : undefined} type="accordion" />
        <CompanyProfile user={data} title={!isMe ? "User company:" : undefined} type="accordion" />
        <BillingProfile
          user={data}
          title={!isMe ? "User billing bank info:" : undefined}
          billingType="bank"
          type="accordion"
        />
        <BillingProfile
          user={data}
          title={!isMe ? "User billing crypto info:" : undefined}
          billingType="crypto"
          type="accordion"
        />
      </div>
    </Page>
  );
}
