import { IUser } from "@/types/user.interface.ts";
import AppCard from "@/components/app-card.tsx";

interface ProfileCompanyProps {
  user?: IUser | null;
  title?: React.ReactNode;
  type?: "card" | "accordion";
}

const CompanyProfile = ({ user, title = "Company:", type = "card" }: ProfileCompanyProps) => {
  if (!user) {
    return null;
  }

  const Content = () => (
    <>
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
    </>
  );

  return <AppCard title={title} content={<Content />} type={type} />;
};

export default CompanyProfile;
