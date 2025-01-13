export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps {
    variant?: "primary" | "secondary";
    size?: "small" | "medium" | "large";
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}
