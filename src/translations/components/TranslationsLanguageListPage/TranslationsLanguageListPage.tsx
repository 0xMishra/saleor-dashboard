import { TopNav } from "@dashboard/components/AppLayout/TopNav";
import { LanguageFragment } from "@dashboard/graphql";
import { useIntl } from "react-intl";

import TranslationsLanguageList from "../TranslationsLanguageList";

export interface TranslationsLanguageListPageProps {
  languages: LanguageFragment[];
}

const TranslationsLanguageListPage = ({ languages }: TranslationsLanguageListPageProps) => {
  const intl = useIntl();

  return (
    <>
      <TopNav
        title={intl.formatMessage({
          id: "GsBRWL",
          defaultMessage: "Languages",
        })}
      ></TopNav>
      <TranslationsLanguageList languages={languages} />
    </>
  );
};

TranslationsLanguageListPage.displayName = "TranslationsLanguageListPage";
export default TranslationsLanguageListPage;
