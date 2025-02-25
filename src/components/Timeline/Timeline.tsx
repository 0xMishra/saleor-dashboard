// @ts-strict-ignore
import { useUser } from "@dashboard/auth";
import { Button } from "@dashboard/components/Button";
import { getUserInitials } from "@dashboard/misc";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@saleor/macaw-ui";
import { sprinkles, vars } from "@saleor/macaw-ui-next";
import { ChangeEvent, FormEvent, ReactNode } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { DashboardCard } from "../Card";
import { UserAvatar } from "../UserAvatar";

const useStyles = makeStyles(
  theme => ({
    button: {
      padding: `7px`,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    input: {
      "& > div": {
        padding: "0 0 0 14px",
      },
      "& textarea": {
        "&::placeholder": {
          opacity: [[1], "!important"] as any,
        },
      },
      background: vars.colors.background.default1,
    },
    noteRoot: {
      marginBottom: theme.spacing(3),
      top: 0,
      left: -19,
      right: 0,
    },
    noteTitle: {
      "&:last-child": {
        paddingBottom: 0,
        paddingRight: 0,
      },
      paddingLeft: 0,
    },
    root: {
      marginLeft: 20,
      paddingLeft: 21,
      position: "relative",
    },
  }),
  { name: "Timeline" },
);

interface TimelineProps {
  children?: ReactNode;
}

interface TimelineAddNoteProps {
  disabled?: boolean;
  message: string;
  reset: () => void;
  onChange: (event: ChangeEvent<any>) => any;
  onSubmit: (event: FormEvent<any>) => any;
}

export const Timeline = (props: TimelineProps) => {
  const { children } = props;
  const classes = useStyles(props);

  return <div className={classes.root}>{children}</div>;
};

export const TimelineAddNote = (props: TimelineAddNoteProps) => {
  const { message, onChange, onSubmit, reset, disabled } = props;
  const classes = useStyles(props);
  const { user } = useUser();
  const intl = useIntl();
  const submit = e => {
    reset();
    onSubmit(e);
  };

  return (
    <div className={classes.noteRoot}>
      <DashboardCard.Content paddingX={0}>
        <UserAvatar
          url={user?.avatar?.url}
          initials={getUserInitials(user)}
          className={sprinkles({
            position: "absolute",
            top: 0,
          })}
          style={{ left: -19 }}
        />
        <TextField
          disabled={disabled}
          className={classes.input}
          placeholder={intl.formatMessage({
            id: "3evXPj",
            defaultMessage: "Leave your note here...",
          })}
          onChange={onChange}
          value={message}
          name="message"
          fullWidth
          multiline
          InputProps={{
            endAdornment: (
              <Button className={classes.button} disabled={disabled} onClick={e => submit(e)}>
                <FormattedMessage
                  id="v/1VA6"
                  defaultMessage="Send"
                  description="add order note, button"
                />
              </Button>
            ),
          }}
          variant="outlined"
        />
      </DashboardCard.Content>
    </div>
  );
};

Timeline.displayName = "Timeline";
export default Timeline;
