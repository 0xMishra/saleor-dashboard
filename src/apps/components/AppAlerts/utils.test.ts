import { EventDeliveryStatusEnum } from "@dashboard/graphql";

import { getLatestFailedAttemptFromWebhooks, Webhook } from "./utils";

describe("getLatestFailedAttemptFromWebhook", () => {
  it("should return the latest failed attempt from failedDelivers", () => {
    // Arrange
    const webhook: Webhook = {
      failedDelivers: {
        edges: [
          {
            node: {
              id: "id",
              createdAt: "2023-10-01T10:00:00Z",
              __typename: "EventDelivery",
            },
            __typename: "EventDeliveryCountableEdge",
          },
        ],
        __typename: "EventDeliveryCountableConnection",
      },
      pendingDelivers: {
        edges: [
          {
            node: {
              attempts: {
                edges: [
                  {
                    node: {
                      id: "id2",
                      status: EventDeliveryStatusEnum.FAILED,
                      createdAt: "2023-09-01T10:00:00Z",
                      __typename: "EventDeliveryAttempt",
                    },
                    __typename: "EventDeliveryAttemptCountableEdge",
                  },
                ],
                __typename: "EventDeliveryAttemptCountableConnection",
              },
              id: "idnode",
              __typename: "EventDelivery",
            },
            __typename: "EventDeliveryCountableEdge",
          },
        ],
        __typename: "EventDeliveryCountableConnection",
      },
      __typename: "Webhook",
    };

    // Act
    const result = getLatestFailedAttemptFromWebhooks([webhook]);

    // Assert
    expect(result?.createdAt.toISOString()).toEqual("2023-10-01T10:00:00.000Z");
  });

  it("should return the latest failed attempt from pendingDelivers", () => {
    // Arrange
    const webhook: Webhook = {
      failedDelivers: {
        edges: [
          {
            node: {
              id: "id",
              createdAt: "2023-09-01T10:00:00Z",
              __typename: "EventDelivery",
            },
            __typename: "EventDeliveryCountableEdge",
          },
        ],
        __typename: "EventDeliveryCountableConnection",
      },
      pendingDelivers: {
        edges: [
          {
            node: {
              attempts: {
                edges: [
                  {
                    node: {
                      id: "id2",
                      status: EventDeliveryStatusEnum.FAILED,
                      createdAt: "2023-10-01T10:00:00Z",
                      __typename: "EventDeliveryAttempt",
                    },
                    __typename: "EventDeliveryAttemptCountableEdge",
                  },
                ],
                __typename: "EventDeliveryAttemptCountableConnection",
              },
              id: "idnode",
              __typename: "EventDelivery",
            },
            __typename: "EventDeliveryCountableEdge",
          },
        ],
        __typename: "EventDeliveryCountableConnection",
      },
      __typename: "Webhook",
    };

    // Act
    const result = getLatestFailedAttemptFromWebhooks([webhook]);

    // Assert
    expect(result?.createdAt.toISOString()).toEqual("2023-10-01T10:00:00.000Z");
  });

  it("should return null if there are no failed attempts", () => {
    // Arrange
    const webhook: Webhook = {
      failedDelivers: {
        edges: [],
        __typename: "EventDeliveryCountableConnection",
      },
      pendingDelivers: {
        edges: [],
        __typename: "EventDeliveryCountableConnection",
      },
      __typename: "Webhook",
    };

    // Act
    const result = getLatestFailedAttemptFromWebhooks([webhook]);

    // Assert
    expect(result).toBeNull();
  });

  it("should return the latest failed attempt when both failedDelivers and pendingDelivers are present", () => {
    // Arrange
    const webhook: Webhook = {
      failedDelivers: {
        edges: [
          {
            node: {
              createdAt: "2023-10-01T10:00:00Z",
              id: "old",
              __typename: "EventDelivery",
            },
            __typename: "EventDeliveryCountableEdge",
          },
        ],
        __typename: "EventDeliveryCountableConnection",
      },
      pendingDelivers: {
        edges: [
          {
            node: {
              attempts: {
                edges: [
                  {
                    node: {
                      status: EventDeliveryStatusEnum.FAILED,
                      createdAt: "2023-10-02T10:00:00Z",
                      id: "new",
                      __typename: "EventDeliveryAttempt",
                    },
                    __typename: "EventDeliveryAttemptCountableEdge",
                  },
                ],
                __typename: "EventDeliveryAttemptCountableConnection",
              },
              id: "idnode",
              __typename: "EventDelivery",
            },
            __typename: "EventDeliveryCountableEdge",
          },
        ],
        __typename: "EventDeliveryCountableConnection",
      },
      __typename: "Webhook",
    };

    // Act
    const result = getLatestFailedAttemptFromWebhooks([webhook]);

    // Assert
    expect(result?.id).toBe("new");
  });
});
