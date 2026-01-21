import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AccountMenu from "./AccountMenu";

const meta: Meta<typeof AccountMenu> = {
  title: "Components/AccountMenu",
  component: AccountMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AccountMenu>;

export const Default: Story = {
  args: {
    email: "harishreddy@gmail.com",
  },
};

export const LongEmail: Story = {
  args: {
    email: "harish.reddy.super.long.email@examplecompany.com",
  },
};

export const OpenedMenu: Story = {
  args: {
    email: "harishreddy@gmail.com",
  },
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector(
      "button[aria-label='Account menu']"
    );

    button?.dispatchEvent(
      new MouseEvent("click", { bubbles: true })
    );
  },
};
