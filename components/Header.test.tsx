import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { Header } from "./Header";

afterEach(() => {
  cleanup();
});

describe("Header", () => {
  it("renders left nav, centered logo, and social labels", () => {
    render(<Header />);
    const primary = screen.getByRole("navigation", { name: "Primary" });
    expect(within(primary).getByRole("link", { name: "Articles" })).toHaveAttribute(
      "href",
      "/articles",
    );
    expect(within(primary).getByRole("link", { name: "Database" })).toHaveAttribute(
      "href",
      "/database",
    );
    expect(within(primary).getByRole("link", { name: "About Us" })).toHaveAttribute(
      "href",
      "/about",
    );
    expect(within(primary).getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/contact",
    );
    expect(screen.getByRole("link", { name: "PixelPitch" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getAllByRole("link", { name: "YouTube" }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("link", { name: "X" }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("link", { name: "Instagram" }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("link", { name: "Facebook" }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("link", { name: "TikTok" }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("link", { name: "Discord" }).length).toBeGreaterThanOrEqual(1);
  });

  it("toggles mobile navigation panel", async () => {
    const user = userEvent.setup();
    const { container } = render(<Header />);
    const toggle = within(container).getByRole("button", { name: "Menu" });
    const panel = within(container).getByTestId("mobile-panel");
    expect(panel).toHaveAttribute("hidden");
    await user.click(toggle);
    expect(panel).not.toHaveAttribute("hidden");
    expect(
      within(container).getByRole("button", { name: "Close menu" }),
    ).toBeInTheDocument();
  });
});
