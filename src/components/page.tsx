import { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "@/lib/utils.ts";

interface TitlePageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Page = ({ className, ...props }: TitlePageProps) => {
  return <div className={cn("flex flex-col gap-2 pb-20 h-full", className)} {...props} />;
};

interface TitlePageHProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {}

Page.H1 = ({ className, ...props }: TitlePageHProps) => (
  <h1 className={cn("mb-4 text-2xl font-semibold tracking-tight", className)} {...props} />
);

Page.H2 = ({ className, ...props }: TitlePageHProps) => (
  <h2 className={cn("mb-3 text-xl font-semibold tracking-tight", className)} {...props} />
);

Page.H3 = ({ className, ...props }: TitlePageHProps) => (
  <h3 className={cn("mb-2 text-sm font-semibold tracking-tight", className)} {...props} />
);

interface TitlePagePProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {}
Page.P = ({ className, ...props }: TitlePagePProps) => (
  <p className={cn("text-sm", className)} {...props} />
);

export default Page;
