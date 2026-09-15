import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AdSlot } from "./AdSlot";

describe("AdSlot", () => {
  it("renders advertisement label and data-ad-slot", () => {
    render(<AdSlot slotId="home-leaderboard" variant="leaderboard" />);
    expect(screen.getByText("Advertisement")).toBeInTheDocument();
    expect(screen.getByRole("complementary")).toHaveAttribute(
      "data-ad-slot",
      "home-leaderboard",
    );
  });
});
