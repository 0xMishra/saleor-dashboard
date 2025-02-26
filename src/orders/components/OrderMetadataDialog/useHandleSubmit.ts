import { MetadataFormData } from "@dashboard/components/Metadata";
import { useUpdateMetadataMutation, useUpdatePrivateMetadataMutation } from "@dashboard/graphql";
import useNotifier from "@dashboard/hooks/useNotifier";
import { commonMessages } from "@dashboard/intl";
import createMetadataUpdateHandler from "@dashboard/utils/handlers/metadataUpdateHandler";
import { useMemo, useRef } from "react";
import { useIntl } from "react-intl";

import { OrderMetadataDialogData } from "./OrderMetadataDialog";

export const useHandleOrderLineMetadataSubmit = ({
  initialData,
}: {
  initialData: OrderMetadataDialogData | undefined;
}) => {
  const notify = useNotifier();
  const intl = useIntl();
  const [updateMetadata] = useUpdateMetadataMutation({});
  const [updatePrivateMetadata] = useUpdatePrivateMetadataMutation({});

  const submittedData = useRef<MetadataFormData>();

  const submitHandler = useMemo(() => {
    if (!initialData) {
      return () => Promise.resolve();
    }

    return createMetadataUpdateHandler(
      initialData,
      () => Promise.resolve([]),
      variables => updateMetadata({ variables }),
      variables => updatePrivateMetadata({ variables }),
    );
  }, [initialData, updateMetadata, updatePrivateMetadata]);

  const onSubmit = async (data: MetadataFormData) => {
    submittedData.current = data;

    const errors = await submitHandler(data);

    if (Array.isArray(errors) && errors.length === 0) {
      notify({
        status: "success",
        text: intl.formatMessage(commonMessages.savedChanges),
      });
    }
  };

  return { onSubmit, lastSubmittedData: submittedData.current };
};
