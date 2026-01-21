import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LogoutButton from "./logout-button";

// ✅ Runtime mock for Storybook
const mockSignOut = () => {
  alert("Mock logout → redirect to /login");
};

// Override next-auth signOut ONLY in Storybook
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).__NEXTAUTH_SIGNOUT__ = mockSignOut;

const meta: Meta<typeof LogoutButton> = {
  title: "Components/LogoutButton",
  component: LogoutButton,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof LogoutButton>;

export const Default: Story = {};
