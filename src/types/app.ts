export interface LabelValue<T = string>{
    label: string;
    value: T;
}

export interface INavLink extends LabelValue<React.ReactNode> {
    href: string;
}