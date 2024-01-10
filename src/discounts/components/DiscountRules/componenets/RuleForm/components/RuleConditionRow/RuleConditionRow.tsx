import { Combobox } from "@dashboard/components/Combobox";
import { useDiscountRulesContext } from "@dashboard/discounts/components/DiscountRules/context/consumer";
import { Rule } from "@dashboard/discounts/models";
import { CatalogCondition } from "@dashboard/discounts/models/Catalog/CatalogCondition";
import { Box, Button, RemoveIcon, Select } from "@saleor/macaw-ui-next";
import React from "react";
import { useController, useFormContext } from "react-hook-form";

import { RuleCondtionRightOperators } from "../RuleCondtionRightOperators";
import { RuleInputWrapper } from "../RuleInputWrapper/RuleInputWrapper";
import { getConditionTypeValue } from "./utils";

interface DiscountConditionRowProps {
  disabled?: boolean;
  conditionIndex: number;
  onRemove: () => void;
  updateCondition: (index: number, value: CatalogCondition) => void;
  isConditionTypeSelected: (conditionType: string) => boolean;
}

export const RuleConditionRow = ({
  conditionIndex,
  onRemove,
  isConditionTypeSelected,
  updateCondition,
  disabled = false,
}: DiscountConditionRowProps) => {
  const ruleConditionNameFieldName =
    `conditions.${conditionIndex}.name` as const;
  const { field: nameField } = useController<
    Rule,
    typeof ruleConditionNameFieldName
  >({
    name: ruleConditionNameFieldName,
  });

  const ruleCondtionTypeFileName = `conditions.${conditionIndex}.type` as const;
  const { field: typeField } = useController<
    Rule,
    typeof ruleCondtionTypeFileName
  >({
    name: ruleCondtionTypeFileName,
  });

  const { watch } = useFormContext<Rule>();
  const condition = watch(`conditions.${conditionIndex}`);

  const { conditionLeftOptions, getConditionTypesOptions } =
    useDiscountRulesContext();

  const filteredConditionLeftOptions = conditionLeftOptions.filter(
    condition => !isConditionTypeSelected(condition.value),
  );

  return (
    <Box
      display="grid"
      gap={0.5}
      __gridTemplateColumns="2fr 1fr 3fr 35px"
      placeItems="center"
      alignItems="start"
    >
      <RuleInputWrapper>
        <Combobox
          value={getConditionTypeValue(
            nameField.name as any,
            filteredConditionLeftOptions,
          )}
          fetchOptions={() => {}}
          options={filteredConditionLeftOptions}
          onChange={e => {
            condition.values = [];
            updateCondition(conditionIndex, condition as any);
            nameField.onChange(e.target.value);
          }}
          size="medium"
          data-test-id="rule-type"
          onBlur={typeField.onBlur}
          disabled={disabled}
        />
      </RuleInputWrapper>

      <RuleInputWrapper>
        <Select
          value={typeField.value}
          size="medium"
          options={getConditionTypesOptions(condition.name as any)}
          onChange={typeField.onChange}
          disabled={disabled}
        />
      </RuleInputWrapper>

      <RuleInputWrapper>
        <RuleCondtionRightOperators
          conditionIndex={conditionIndex}
          disabled={disabled}
        />
      </RuleInputWrapper>

      <Button variant="tertiary" icon={<RemoveIcon />} onClick={onRemove} />
    </Box>
  );
};
