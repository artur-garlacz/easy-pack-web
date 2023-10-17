export interface RequestRepository {
  getAllRequests: ({
    page,
    limit,
    filters,
  }: {
    filters: { status: any };
    page: number;
    limit?: number;
  }) => Promise<any>;
  getEstimation: ({
    type,
    pickUpAddress,
    shipmentUpAddress,
    packagesCount,
  }: {
    type: string;
    pickUpAddress: string;
    shipmentUpAddress: string;
    packagesCount: number;
  }) => Promise<any>;
}
