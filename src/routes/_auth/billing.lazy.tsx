import { createLazyFileRoute } from "@tanstack/react-router";

import { useUserStore } from "@/hooks/use-user.store.ts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import Page from '@/components/page.tsx';

export const Route = createLazyFileRoute("/_auth/billing")({
  component: BillingPage,
});

function BillingPage() {
  const { user } = useUserStore();

  return (
    <div className="flex flex-col md:items-center">
      <Page.H1 className="mb-4">
        Billing
      </Page.H1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Bank:</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Number: <span className="font-semibold">{user?.bank.cardNumber}</span>
            </p>
            <p className="text-muted-foreground">
              IBAN: <span className="font-semibold">{user?.bank.iban}</span>
            </p>
            <p className="text-muted-foreground">
              Expire: <span className="font-semibold">{user?.bank.cardExpire}</span>
            </p>
            <p className="text-muted-foreground">
              Type: <span className="font-semibold">{user?.bank.cardType}</span>
            </p>
            <p className="text-muted-foreground">
              Currency: <span className="font-semibold">{user?.bank.currency}</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Crypto:</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Coin: <span className="font-semibold">{user?.crypto.coin}</span>
            </p>
            <p className="text-muted-foreground">
              Network: <span className="font-semibold">{user?.crypto.network}</span>
            </p>
            <p className="text-muted-foreground">
              Address: <span className="font-semibold break-all">{user?.crypto.wallet}</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
