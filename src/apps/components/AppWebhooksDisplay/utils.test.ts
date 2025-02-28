import { sortWebhooksByFailedDeliveries, Webhook } from "./utils";

describe("sortWebhooksByFailedDeliveries", () => {
  it("should sort webhooks with deliveries first in array", () => {
    // Arrange
    const webhooks = [
      {
        name: "empty-one",
        eventDeliveries: { edges: [] },
      } as Webhook,
      {
        name: "non-empty-one",
        eventDeliveries: { edges: [{}] },
      } as Webhook,
      {
        name: "empty-two",
        eventDeliveries: { edges: [] },
      } as Webhook,
    ];

    // Act
    const result = webhooks.sort(sortWebhooksByFailedDeliveries);

    // Assert
    expect(result[0].name).toBe("non-empty-one");
  });

  it("should maintain relative order of webhooks with same delivery count", () => {
    // Arrange
    const webhooks = [
      {
        name: "first",
        eventDeliveries: { edges: [] },
      } as Webhook,
      {
        name: "second",
        eventDeliveries: { edges: [] },
      } as Webhook,
    ];

    // Act
    const result = webhooks.sort(sortWebhooksByFailedDeliveries);

    // Assert
    expect(result[0].name).toBe("first");
    expect(result[1].name).toBe("second");
  });

  it("should handle mixed undefined and empty deliveries in array", () => {
    // Arrange
    const webhooks = [
      {
        name: "undefined",
        eventDeliveries: undefined,
      } as Webhook,
      {
        name: "non-empty",
        eventDeliveries: { edges: [{}] },
      } as Webhook,
      {
        name: "empty",
        eventDeliveries: { edges: [] },
      } as Webhook,
    ];

    // Act
    const result = webhooks.sort(sortWebhooksByFailedDeliveries);

    // Assert
    expect(result[0].name).toBe("non-empty");
  });
});
