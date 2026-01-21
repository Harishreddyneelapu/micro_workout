import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SpinButton from "./SpinButton";

const meta: Meta<typeof SpinButton> = {
  title: "Components/SpinButton",
  component: SpinButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof SpinButton>;

export const Default: Story = {
  args: {
    onSpin: () => {
      alert("Spin triggered!");
    },
  },
};

export const DisabledLikeState: Story = {
  args: {
    onSpin: () => {},
  },
  decorators: [
    (Story) => (
      <div className="opacity-50 pointer-events-none">
        <Story />
      </div>
    ),
  ],
};
