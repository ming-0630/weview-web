// import { ButtonProps, Button as MantineButton, createPolymorphicComponent } from "@mantine/core";
// import { random } from "lodash";
// import { forwardRef } from "react";

// const _Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...others }, ref) => (
//     <MantineButton
//         radius='md'
//         classNames={{
//             root: 'bg-main p-0 h-auto',
//             inner: 'h-auto px-5 py-3 box-border',
//             label: 'h-auto'
//         }}
//         uppercase
//         name={random().toString()}
//         {...others}
//     >
//         {children}
//     </MantineButton>
// ));

// export const Button = () => { return (createPolymorphicComponent<'button', ButtonProps>(_Button)) };