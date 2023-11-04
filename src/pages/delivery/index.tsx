import DeliveryDashboardView from "@/components/templates/delivery/DeliveryDashboardView/DeliveryDashboardView";
import { getDeliveryProps } from "@/lib/auth-delivery";

export default DeliveryDashboardView;

export const getServerSideProps = getDeliveryProps;
