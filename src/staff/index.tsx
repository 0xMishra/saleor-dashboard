import { Route } from "@dashboard/components/Router";
import { sectionNames } from "@dashboard/intl";
import { asSortParams } from "@dashboard/utils/sort";
import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { RouteComponentProps, Switch } from "react-router-dom";

import { WindowTitle } from "../components/WindowTitle";
import {
  staffListPath,
  StaffListUrlQueryParams,
  StaffListUrlSortField,
  staffMemberDetailsPath,
  StaffMemberDetailsUrlQueryParams,
} from "./urls";
import StaffDetailsComponent from "./views/StaffDetails";
import StaffListComponent from "./views/StaffList";

const StaffList = ({ location }: RouteComponentProps<{}>) => {
  const qs = parseQs(location.search.substr(1)) as any;
  const params: StaffListUrlQueryParams = asSortParams(qs, StaffListUrlSortField);

  return <StaffListComponent params={params} />;
};

interface StaffDetailsRouteProps {
  id: string;
}

const StaffDetails = ({ match }: RouteComponentProps<StaffDetailsRouteProps>) => {
  const qs = parseQs(location.search.substr(1));
  const params: StaffMemberDetailsUrlQueryParams = qs;

  return <StaffDetailsComponent id={decodeURIComponent(match.params.id)} params={params} />;
};
const Component = () => {
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.staff)} />
      <Switch>
        <Route exact path={staffListPath} component={StaffList} />
        <Route path={staffMemberDetailsPath(":id")} component={StaffDetails} />
      </Switch>
    </>
  );
};

export default Component;
