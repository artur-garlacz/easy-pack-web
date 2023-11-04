import CouriersView from "@/components/templates/delivery/CouriersView/CouriersView";
import { getDeliveryProps } from "@/lib/auth-delivery";

export default CouriersView;

export const getServerSideProps = getDeliveryProps;
