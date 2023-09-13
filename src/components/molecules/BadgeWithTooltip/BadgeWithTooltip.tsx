import { Box } from "@chakra-ui/react";
import { BADGE_VARIANT } from "@/components/atoms/Badge/Badge";
import { Badge } from "@/components/atoms/Badge/Badge";
import { HoverSelect } from "@/components/molecules/HoverSelect/HoverSelect";

type BadgeData = {
  value: string;
  label: string;
  color: string;
  hoverColor: string;
}[];

export function BadgeWithTooltip({
  items,
  value,
  callback,
  readOnly,
  hoverDescription = "Update Status:",
}: {
  items: BadgeData;
  value: number;
  callback: (value: number) => any;
  readOnly?: boolean;
  hoverDescription?: string;
}) {
  return (
    <Box width="fit-content">
      {readOnly ? (
        <Badge
          title={items[value].label}
          color={items[value].color}
          hoverColor={items[value].hoverColor}
          variant={BADGE_VARIANT.READ_ONLY}
        />
      ) : (
        <HoverSelect
          items={items}
          initialValue={value}
          description={hoverDescription}
          render={(value, isActive) => (
            <Badge
              title={items[value].label}
              color={items[value].color}
              hoverColor={items[value].hoverColor}
              variant={
                isActive ? BADGE_VARIANT.ACTIVE : BADGE_VARIANT.COMPLETED
              }
            />
          )}
          onChange={callback}
        >
          <Badge
            title={items[value].label}
            color={items[value].color}
            hoverColor={items[value].hoverColor}
            variant={BADGE_VARIANT.DROPDOWN_TRIGGER}
          />
        </HoverSelect>
      )}
    </Box>
  );
}
