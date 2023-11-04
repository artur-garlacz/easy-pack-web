import { DeliveryProfileView } from "@/components/templates/delivery/DeliveryProfileView/DeliveryProfileView";
import { getDeliveryProps } from "@/lib/auth-delivery";

export default DeliveryProfileView;

export const getServerSideProps = getDeliveryProps;
