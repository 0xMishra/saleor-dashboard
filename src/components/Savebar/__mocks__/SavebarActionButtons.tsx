import { ReactNode } from "react";

export const CancelButton = ({ children, ...props }: { children?: ReactNode }) => (
  <button {...props}>cancel</button>
);

export const ConfirmButton = ({ children, ...props }: { children?: ReactNode }) => (
  <button {...props}>save</button>
);

export const DeleteButton = ({ children, ...props }: { children?: ReactNode }) => (
  <button {...props}>delete</button>
);
