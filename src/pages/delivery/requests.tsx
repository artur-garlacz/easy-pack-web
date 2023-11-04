import { DeliveryRequestsTable } from "@/components/organisms/DeliveryRequestsTable/DeliveryRequestsTable";
import { getDeliveryProps } from "@/lib/auth-delivery";

export default DeliveryRequestsTable;

export const getServerSideProps = getDeliveryProps;
