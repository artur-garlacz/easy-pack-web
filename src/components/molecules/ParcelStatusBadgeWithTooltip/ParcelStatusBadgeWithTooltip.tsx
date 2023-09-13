import { BADGE_VARIANT, Badge } from "@/components/atoms/Badge/Badge";
import { HoverSelect } from "@/components/molecules/HoverSelect/HoverSelect";
import { capitalize } from "@/lib/capitalizeString";
import { allowedParcelStatusUpdates } from "@/lib/helpers/parcel-status-mapper";
import { PARCEL_STATUS } from "@/typings/parcel";
import { Box } from "@chakra-ui/react";

export function ParcelStatusBadgeWithTooltip({
  status,
  onChange,
}: {
  status: PARCEL_STATUS;
  onChange?: (newStatus: PARCEL_STATUS) => any;
}) {
  const statuses =
    allowedParcelStatusUpdates[status]?.map((allowedStatus) => ({
      value: allowedStatus,
      label: capitalize(allowedStatus),
      color: "gray.700",
      hoverColor: "gray.800",
    })) || [];

  return (
    <Box width="fit-content">
      {!onChange ? (
        <Badge
          title={capitalize(status)}
          color="gray.700"
          variant={BADGE_VARIANT.READ_ONLY}
          className="text-sm p-1"
        />
      ) : (
        <HoverSelect
          items={statuses}
          initialValue={23}
          description={"Update status"}
          render={(value) => (
            <Badge
              title={capitalize(statuses[value].label)}
              color={statuses[value].color}
              hoverColor={statuses[value].hoverColor}
              variant={BADGE_VARIANT.ACTIVE}
              className="py-1"
            />
          )}
          onChange={(index) => onChange(statuses[index].value)}
        >
          <Badge
            title={capitalize(status)}
            color="gray.700"
            hoverColor="gray.800"
            variant={BADGE_VARIANT.DROPDOWN_TRIGGER}
          />
        </HoverSelect>
      )}
    </Box>
  );
}
