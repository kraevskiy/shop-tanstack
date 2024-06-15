import { render, screen } from "@testing-library/react";
import Rating from "../../src/components/rating";

describe("Rating", () => {
  it("should render all component with rating 5", () => {
    render(<Rating rating={5} />);
    const rating = screen.getByTestId("rating");
    expect(rating).toBeInTheDocument();

    const ratingStars = screen.getByTestId("rating-stars");
    expect(ratingStars).toBeInTheDocument();

    const ratingNumber = screen.getByTestId("rating-number");
    expect(ratingNumber).toBeInTheDocument();
  });

  it("should render without rating number with rating 5", () => {
    render(<Rating rating={5} hideNumber={true} />);
    const rating = screen.getByTestId("rating");
    expect(rating).toBeInTheDocument();

    const ratingStars = screen.getByTestId("rating-stars");
    expect(ratingStars).toBeInTheDocument();

    expect(() => screen.getByTestId("rating-number")).toThrow("Unable to find an element");
  });

  it("should render with rating 4", () => {
    render(<Rating rating={4} />);
    const rating = screen.getByTestId("rating");
    expect(rating).toBeInTheDocument();

    const ratingStars = screen.getByTestId("rating-stars");
    expect(ratingStars).toBeInTheDocument();

    const ratingNumber = screen.getByTestId("rating-number");
    expect(ratingNumber).toHaveTextContent("4");
  });
});
