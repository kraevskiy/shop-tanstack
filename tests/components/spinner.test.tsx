import { render, screen } from "@testing-library/react";
import Spinner from "../../src/components/spinner";

describe("Spinner", () => {
  it("should render", () => {
    render(<Spinner />);
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveTextContent(/⍥/i);
  });
  it("should render with show:true prop", () => {
    render(<Spinner show={true}/>);
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('opacity-1 duration-500');
  });
  it("should render with show:false prop", () => {
    render(<Spinner show={false}/>);
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('hidden');
  });
  it("should render with wait:delay-132 prop", () => {
    render(<Spinner wait="delay-132"/>);
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('delay-132');
  });
});
