import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeInfo, Search } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useCopyToClipboard, useDebounceValue } from "usehooks-ts";

import Page from "@/components/page.tsx";
import { useUsersQuery } from "@/lib/queries.ts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import ActionTooltip from "@/components/action-tooltip.tsx";
import { useToast } from "@/components/ui/use-toast.ts";
import { SearchParamsWithQuery } from "@/types/search-params.ts";
import Pagination from "@/routes/products/-components/pagination.tsx";
import Spinner from "@/components/spinner.tsx";
import { Input } from "@/components/ui/input.tsx";

export const Route = createFileRoute("/_auth/users/")({
  validateSearch: (search: Record<string, unknown>): SearchParamsWithQuery => {
    const res: SearchParamsWithQuery = {};
    if (search.limit) {
      res["limit"] = Number(search.limit);
    }
    if (search.skip) {
      res["skip"] = Number(search.limit);
    }
    if (search.q) {
      res["q"] = String(search.limit);
    }
    return res;
  },
  component: UsersPage,
});

function UsersPage() {
  const searchParams = Route.useSearch();
  const [query, setValue] = useDebounceValue(searchParams.q, 500);
  const { data, isFetching, isPending, isLoading } = useUsersQuery({ ...searchParams, q: query });
  const [, copyFn] = useCopyToClipboard();
  const { toast } = useToast();
  const copyAction = async (val: string) => {
    await copyFn(val);
    toast({
      variant: "success",
      description: `Copied: ${val}`,
      duration: 2000,
    });
  };

  return (
    <Page>
      <div className="flex items-center justify-between">
        <Page.H1>
          Users
          <Spinner show={isPending || isFetching || isLoading} />
        </Page.H1>
        <div className="relative">
          <Input
            type="text"
            defaultValue={""}
            onChange={(event) => setValue(event.target.value)}
            className="text-md w-72 pr-[3rem]"
            placeholder="search by name"
          />
          <Search className="absolute right-4 top-[50%] h-[1.2rem] w-[1.2rem] translate-y-[-50%]" />
        </div>
      </div>

      <Table className="mb-2">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Avatar</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Birthday</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.users.map((user, idx) => (
              <TableRow key={user.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>
                  <ActionTooltip label="copy">
                    <span className="cursor-pointer" onClick={() => copyAction(user.email)}>
                      {user.email}
                    </span>
                  </ActionTooltip>
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{(user.firstName[0] + user.lastName[0]).toUpperCase()}</AvatarFallback>
                    <AvatarImage src={user.image} />
                  </Avatar>
                </TableCell>
                <TableCell className="whitespace-nowrap">{user.phone}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{format(parseISO(user.birthDate), "dd/MM/yy")}</TableCell>
                <TableCell>
                  <div className="flex justify-center gap-1">
                    <ActionTooltip label="Show all info">
                      <Link
                        to="/users/$userId"
                        params={{
                          userId: String(user.id),
                        }}
                      >
                        <BadgeInfo className="h-4 w-4 cursor-pointer" />
                      </Link>
                    </ActionTooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {data && <Pagination total={data.total} limit={30} skip={data.skip} />}
    </Page>
  );
}
