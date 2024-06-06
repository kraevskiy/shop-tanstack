import { IUser } from "@/types/user.interface.ts";
import AppCard from '@/components/app-card.tsx';

interface ProfileBillingProps {
  user?: IUser | null;
  billingType?: "bank" | "crypto";
  title?: React.ReactNode;
  type?: "card" | "accordion";
}

const BillingProfile = ({ user, billingType = "bank", title, type = "card" }: ProfileBillingProps) => {
  const currentTitle = title ? title : billingType === "bank" ? "Bank:" : "Crypto:";
  if (!user) {
    return null;
  }

  const Content = () =>
    billingType === "bank" ? (
      <>
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
      </>
    ) : (
      <>
        <p className="text-muted-foreground">
          Coin: <span className="font-semibold">{user?.crypto.coin}</span>
        </p>
        <p className="text-muted-foreground">
          Network: <span className="font-semibold">{user?.crypto.network}</span>
        </p>
        <p className="text-muted-foreground">
          Address: <span className="break-all font-semibold">{user?.crypto.wallet}</span>
        </p>
      </>
    );

  return <AppCard title={currentTitle} content={<Content />} type={type} />;
};
export default BillingProfile;
