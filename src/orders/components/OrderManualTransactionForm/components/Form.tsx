// @ts-strict-ignore

import { HTMLProps } from "react";

import { useManualTransactionContext } from "../context";

export const Form = ({ children, ...props }: HTMLProps<HTMLFormElement>) => {
  const { amount, description, pspReference, onAddTransaction } = useManualTransactionContext();

  return (
    <form
      {...props}
      onSubmit={e => {
        e.preventDefault();

        if (amount) {
          onAddTransaction({ amount, description, pspReference });
        }
      }}
    >
      {children}
    </form>
  );
};
