// @ts-strict-ignore
import CardTitle from "@dashboard/components/CardTitle";
import { ConfirmButtonTransitionState } from "@dashboard/components/ConfirmButton";
import Grid from "@dashboard/components/Grid";
import Hr from "@dashboard/components/Hr";
import Skeleton from "@dashboard/components/Skeleton";
import { TablePaginationWithContext } from "@dashboard/components/TablePagination";
import { SubmitPromise } from "@dashboard/hooks/useForm";
import { buttonMessages } from "@dashboard/intl";
import {
  TranslationField,
  TranslationFieldType,
} from "@dashboard/translations/types";
import { ListProps } from "@dashboard/types";
import { OutputData } from "@editorjs/editorjs";
import { Card, CardContent, Typography } from "@material-ui/core";
import ArrowIcon from "@material-ui/icons/ArrowDropDown";
import { Button, IconButton, makeStyles } from "@saleor/macaw-ui";
import clsx from "clsx";
import React from "react";
import { FormattedMessage } from "react-intl";

import TranslationFieldsLong from "./TranslationFieldsLong";
import TranslationFieldsRich from "./TranslationFieldsRich";
import TranslationFieldsShort from "./TranslationFieldsShort";

type Pagination = Pick<
  ListProps,
  Exclude<keyof ListProps, "getRowHref" | "disabled">
>;

export interface TranslationFieldsProps {
  activeField: string;
  disabled: boolean;
  title: string;
  fields: TranslationField[];
  initialState: boolean;
  saveButtonState: ConfirmButtonTransitionState;
  pagination?: Pagination;
  richTextResetKey: string; // temporary workaround TODO: fix rich text editor
  onEdit: (field: string) => void;
  onDiscard: () => void;
  onSubmit: (
    field: TranslationField,
    data: string | OutputData,
  ) => SubmitPromise;
}

const useStyles = makeStyles(
  theme => ({
    cardCaption: {
      fontSize: 14,
    },
    cardContent: {
      "&:last-child": {
        paddingBottom: theme.spacing(1),
      },
    },
    columnHeader: {
      marginBottom: theme.spacing(0.5),
    },
    content: {
      "& a": {
        color: theme.palette.textHighlighted.active,
      },
      "& blockquote": {
        borderLeft: `2px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing(1, 2),
      },
      "& h2": {
        fontSize: 22,
        marginBottom: theme.spacing(1),
      },
      "& h3": {
        fontSize: 19,
        marginBottom: theme.spacing(1),
      },
      "& p": {
        "&:last-child": {
          marginBottom: 0,
        },
        marginBottom: theme.spacing(),
        marginTop: 0,
      },
      paddingBottom: theme.spacing(2),
    },
    editButtonContainer: {
      alignItems: "center",
      display: "flex",
      justifyContent: "flex-end",
    },
    fieldName: {
      color: theme.typography.caption.color,
      fontSize: 14,
      fontWeight: 500,
      marginBottom: theme.spacing(),
      marginTop: theme.spacing(2),
    },
    grid: {
      gridRowGap: 0,
    },
    hr: {
      gridColumnEnd: "span 2",
    },

    rotate: {
      transform: "rotate(180deg)",
    },
  }),
  { name: "TranslationFields" },
);

const numberOfColumns = 2;

const TranslationFields: React.FC<TranslationFieldsProps> = props => {
  const {
    activeField,
    disabled,
    fields,
    initialState,
    title,
    saveButtonState,
    pagination,
    richTextResetKey,
    onEdit,
    onDiscard,
    onSubmit,
  } = props;
  const classes = useStyles(props);

  const [expanded, setExpandedState] = React.useState(initialState);

  return (
    <Card>
      <CardTitle
        title={title}
        toolbar={
          <IconButton
            variant="secondary"
            onClick={() => setExpandedState(!expanded)}
          >
            <ArrowIcon
              className={clsx({
                [classes.rotate]: expanded,
              })}
            />
          </IconButton>
        }
      />
      {expanded ? (
        <CardContent className={classes.cardContent}>
          <Grid className={classes.grid} variant="uniform">
            <Typography className={classes.columnHeader} variant="body1">
              <FormattedMessage id="Xtd0AT" defaultMessage="Original String" />
            </Typography>
            <Typography className={classes.columnHeader} variant="body1">
              <FormattedMessage
                id="bVY7j0"
                defaultMessage="Translation"
                description="Translated Name"
              />
            </Typography>
            {fields.map(field => (
              <React.Fragment key={field.name}>
                <Hr className={classes.hr} />
                <Typography className={classes.fieldName} variant="body1">
                  {field.displayName}
                </Typography>
                <div className={classes.editButtonContainer}>
                  <Button
                    data-test-id={`edit-${field.name}`}
                    onClick={() => onEdit(field.name)}
                  >
                    <FormattedMessage {...buttonMessages.edit} />
                  </Button>
                </div>
                <div className={classes.content}>
                  {field && field.value !== undefined ? (
                    field.type === TranslationFieldType.SHORT ? (
                      <TranslationFieldsShort
                        disabled={disabled}
                        edit={false}
                        initial={field.value}
                        saveButtonState="default"
                        onDiscard={onDiscard}
                        onSubmit={undefined}
                      />
                    ) : field.type === TranslationFieldType.LONG ? (
                      <TranslationFieldsLong
                        disabled={disabled}
                        edit={false}
                        initial={field.value}
                        saveButtonState="default"
                        onDiscard={onDiscard}
                        onSubmit={undefined}
                      />
                    ) : (
                      <TranslationFieldsRich
                        resetKey={richTextResetKey}
                        disabled={disabled}
                        edit={false}
                        initial={field.value}
                        saveButtonState="default"
                        onDiscard={onDiscard}
                        onSubmit={undefined}
                      />
                    )
                  ) : (
                    <Skeleton />
                  )}
                </div>
                <Typography className={classes.content}>
                  {field && field.translation !== undefined ? (
                    field.type === TranslationFieldType.SHORT ? (
                      <TranslationFieldsShort
                        disabled={disabled}
                        edit={activeField === field.name}
                        initial={field.translation}
                        saveButtonState={saveButtonState}
                        onDiscard={onDiscard}
                        onSubmit={data => onSubmit(field, data)}
                      />
                    ) : field.type === TranslationFieldType.LONG ? (
                      <TranslationFieldsLong
                        disabled={disabled}
                        edit={activeField === field.name}
                        initial={field.translation}
                        saveButtonState={saveButtonState}
                        onDiscard={onDiscard}
                        onSubmit={data => onSubmit(field, data)}
                      />
                    ) : (
                      <TranslationFieldsRich
                        resetKey={richTextResetKey}
                        disabled={disabled}
                        edit={activeField === field.name}
                        initial={field.translation}
                        saveButtonState={saveButtonState}
                        onDiscard={onDiscard}
                        onSubmit={data => onSubmit(field, data)}
                      />
                    )
                  ) : (
                    <Skeleton />
                  )}
                </Typography>
              </React.Fragment>
            ))}
          </Grid>
          {pagination && (
            <TablePaginationWithContext
              colSpan={numberOfColumns}
              settings={pagination.settings}
              onUpdateListSettings={pagination.onUpdateListSettings}
              component="div"
            />
          )}
        </CardContent>
      ) : (
        <CardContent>
          <Typography className={classes.cardCaption} variant="caption">
            <FormattedMessage
              id="bh+Keo"
              defaultMessage="{numberOfFields} Translations, {numberOfTranslatedFields} Completed"
              values={{
                numberOfFields: fields.length,
                numberOfTranslatedFields: fields.reduce(
                  (acc, field) => acc + +(field.translation !== null),
                  0,
                ),
              }}
            />
          </Typography>
        </CardContent>
      )}
    </Card>
  );
};
TranslationFields.displayName = "TranslationFields";
export default TranslationFields;
