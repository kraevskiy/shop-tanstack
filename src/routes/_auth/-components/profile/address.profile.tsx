import { IUser } from "@/types/user.interface.ts";
import AppCard from "@/components/app-card.tsx";

interface ProfileAddressProps {
  user?: IUser | null;
  title?: React.ReactNode;
  type?: "card" | "accordion";
}

const AddressProfile = ({ user, title = "Address:", type = "card" }: ProfileAddressProps) => {
  if (!user) {
    return null;
  }

  const Content = () => (
    <>
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
    </>
  );

  return <AppCard title={title} content={<Content />} type={type} />;
};

export default AddressProfile;
