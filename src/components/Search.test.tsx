import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as ReactRouterDom from "react-router-dom";

import { Search } from "./Search";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
}));

const { useSearchParams, useNavigate } = ReactRouterDom as jest.Mocked<
  typeof ReactRouterDom
>;

describe("Test components/Search", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    useSearchParams.mockReturnValue([
      // @ts-ignore
      {
        get: jest.fn((paramName) => paramName),
      },
    ]);
  });

  it("Should show has initial status the search params from the routing", async () => {
    render(<Search />);
    const searchBox = await screen.findByLabelText("Search");
    expect(searchBox).toHaveValue("query");
  });

  it("Writing on the input and pressing on submit button should navigate to the search page with the correct search params", async () => {
    render(<Search />);
    const navigateTo = jest.fn();
    useNavigate.mockReturnValue(navigateTo);
    const searchQuery = "new query";
    const searchBox = await screen.findByLabelText("Search");
    fireEvent.change(searchBox, {
      target: {
        value: searchQuery,
      },
    });
    await waitFor(() => {
      expect(searchBox).toHaveValue(searchQuery);
    });
    const submitButton = await screen.findByLabelText("submit");

    expect(navigateTo).not.toHaveBeenCalled();
    fireEvent.click(submitButton);
    expect(navigateTo).toHaveBeenCalled();
  });
});
