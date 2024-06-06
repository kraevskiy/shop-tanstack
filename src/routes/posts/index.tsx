import { createFileRoute } from "@tanstack/react-router";

import Page from "@/components/page.tsx";
import { usePostsQuery } from "@/lib/queries.ts";
import Spinner from "@/components/spinner.tsx";
import { SearchParamsWithQuery } from "@/types/search-params.ts";
import { validateSearch } from "@/lib/validateSearch.ts";
import { Input } from "@/components/ui/input.tsx";
import { Search } from "lucide-react";
import { useDebounceValue } from "usehooks-ts";
import PostsList from "@/routes/posts/-components/posts-list.tsx";
import PostCard from "@/routes/posts/-components/post-card.tsx";

export const Route = createFileRoute("/posts/")({
  validateSearch: validateSearch<SearchParamsWithQuery>,
  component: PostsPage,
});

function PostsPage() {
  const searchParams = Route.useSearch();
  const [query, setValue] = useDebounceValue(searchParams.q, 500);
  const { data, isLoading, isFetching, isPending } = usePostsQuery({ ...searchParams, q: query });

  return (
    <Page>
      <div className="flex items-center justify-between mb-6">
        <Page.H1>
          Posts
          <Spinner show={isPending || isFetching || isLoading} />
        </Page.H1>
        <div className="relative">
          <Input
            type="text"
            defaultValue={""}
            onChange={(event) => setValue(event.target.value)}
            className="text-md w-72 pr-[3rem]"
            placeholder="search by text"
          />
          <Search className="absolute right-4 top-[50%] h-[1.2rem] w-[1.2rem] translate-y-[-50%]" />
        </div>
      </div>
      {data && (
        <PostsList>
          {data.posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </PostsList>
      )}
    </Page>
  );
}
