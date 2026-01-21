import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { Session } from "next-auth";
import Navbar from "./navbar";

/* ------------------ Mock session ------------------ */

const mockSession: Session = {
  user: {
    name: "Harish Reddy",
    email: "harish@example.com",
    image: null,
  },
  expires: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
};

/* ------------------ Story meta ------------------ */

const meta: Meta<typeof Navbar> = {
  title: "Components/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

/* ------------------ Stories ------------------ */

export const LoggedOut: Story = {
  args: {
    session: null,
  },
};

export const LoggedIn: Story = {
  args: {
    session: mockSession,
  },
};
