import { useApolloClient } from "@apollo/client";
import useNotifier from "@dashboard/hooks/useNotifier";
import * as React from "react";
import { useIntl } from "react-intl";

import { UserContext } from "./";
import { useAuthProvider } from "./hooks/useAuthProvider";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const apolloClient = useApolloClient();
  const intl = useIntl();
  const notify = useNotifier();
  const authProvider = useAuthProvider({ intl, notify, apolloClient });

  return <UserContext.Provider value={authProvider}>{children}</UserContext.Provider>;
};

export default AuthProvider;
