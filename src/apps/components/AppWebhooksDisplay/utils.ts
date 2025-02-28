import { AppWebhookDeliveriesQuery } from "@dashboard/graphql";

export type Webhook = NonNullable<NonNullable<AppWebhookDeliveriesQuery["app"]>["webhooks"]>[0];

export const sortWebhooksByFailedDeliveries = (webhookOne: Webhook, webhookTwo: Webhook) => {
  const deliveriesOne = webhookOne.eventDeliveries?.edges?.length ?? 0;
  const deliveriesTwo = webhookTwo.eventDeliveries?.edges?.length ?? 0;

  if (deliveriesOne > 0 && deliveriesTwo === 0) {
    return -1;
  }

  if (deliveriesOne === 0 && deliveriesTwo > 0) {
    return 1;
  }

  return 0;
};
