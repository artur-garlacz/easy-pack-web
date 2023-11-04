import { CouriersResponse, CreateCourierPayload } from "@/typings/user";

export interface CourierRepository {
  getCouriers: ({
    page,
    limit,
  }: {
    filters: {};
    page: number;
    limit?: number;
  }) => Promise<CouriersResponse>;
  createCourier: (data: CreateCourierPayload) => Promise<void>;
}
