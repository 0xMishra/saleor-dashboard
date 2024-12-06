import GiftCardUpdatePage from "./GiftCardUpdatePage";
import GiftCardDetailsProvider from "./providers/GiftCardDetailsProvider";
import GiftCardUpdateDialogsProvider from "./providers/GiftCardUpdateDialogsProvider";
import GiftCardUpdateFormProvider from "./providers/GiftCardUpdateFormProvider/GiftCardUpdateFormProvider";
import { GiftCardUpdatePageUrlQueryParams } from "./types";

interface GiftCardUpdateProps {
  params: GiftCardUpdatePageUrlQueryParams;
  id: string;
}

const GiftCardUpdate = ({ id, params }: GiftCardUpdateProps) => (
  <GiftCardDetailsProvider id={id}>
    <GiftCardUpdateFormProvider>
      <GiftCardUpdateDialogsProvider id={id} params={params}>
        <GiftCardUpdatePage />
      </GiftCardUpdateDialogsProvider>
    </GiftCardUpdateFormProvider>
  </GiftCardDetailsProvider>
);

export default GiftCardUpdate;
