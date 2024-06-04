import { createLazyFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/products/category/")({
  component: () => <Navigate to="/products" />,
});
