import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card";
import { parcelRepository } from "@/repositories/parcel-repository";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import React, { useEffect, useState } from "react";
import { ParcelDelivery } from "@/typings/parcel";
import { dateFormats } from "@/lib/date";
import { ParcelStatusBadge } from "@/components/molecules/ParcelStatusBadgeWithTooltip/ParcelStatusBadge";
import { AlertTriangle } from "lucide-react";

export function DeliveryParcelList() {
  const api = parcelRepository({});
  const [filter, setFilter] = useState();
  const { ref, inView } = useInView();
  const {
    status,
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    [api.getParcelDeliveries.name],
    async ({ pageParam = 1 }) =>
      api.getParcelDeliveries({ page: pageParam, filters: {} }),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.numberOfPages > lastPage.currentPage) {
          return lastPage.currentPage + 1;
        }
        return undefined;
      },
    }
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div>
      <div>sd</div>
      <div className="overflow-y-scroll h-[88vh]">
        <ul className="list-none flex flex-col gap-y-3">
          {status === "loading" ? (
            <p>Loading...</p>
          ) : status === "error" ? (
            <span>Error </span>
          ) : (
            <>
              {data.pages.length > 0 &&
                data.pages.map((page) => (
                  <React.Fragment key={page.currentPage}>
                    {page.data.map((parcel) => (
                      <DeliveryParcelItem data={parcel} key={parcel.id} />
                    ))}
                  </React.Fragment>
                ))}
              <div>
                <button
                  ref={ref}
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {isFetchingNextPage
                    ? "Loading more..."
                    : hasNextPage
                    ? "Load Newer"
                    : "Nothing more to load"}
                </button>
              </div>
              <div>
                {isFetching && !isFetchingNextPage
                  ? "Background Updating..."
                  : null}
              </div>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

function DeliveryParcelItem({ data }: { data: ParcelDelivery }) {
  return (
    <li>
      <Card className="cursor-pointer hover:bg-slate-50">
        <CardHeader>
          <div className="flex justify-between">
            <div className="flex-col">
              <p className="text-xs font-medium text-gray-600">
                Tracking number
              </p>
              <h3 className="text-sm font-medium">{data.trackingNumber}</h3>
            </div>
            <div className="flex gap-2 items-center">
              <AlertTriangle size={20} className="text-yellow-500" />
              <ParcelStatusBadge status={data.status} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-y-4 grid-cols-2">
            <div className="flex-col">
              <p className="text-xs font-medium text-gray-600">
                Departure Time
              </p>
              <h3 className="text-sm font-medium">
                {dateFormats.common(data.createdAt)}
              </h3>
            </div>
            <div className="flex-col">
              <p className="text-xs font-medium text-gray-600">
                Departure Time
              </p>
              <h3 className="text-sm font-medium">
                {dateFormats.common(data.createdAt)}
              </h3>
            </div>
            <div className="flex-col">
              <p className="text-xs font-medium text-gray-600">
                Pick up address
              </p>
              <h3 className="text-sm font-medium">
                Kraków, 30-100, <br /> ul Kalwaryjska 20/2
              </h3>
            </div>
            <div className="flex-col">
              <p className="text-xs font-medium text-gray-600">
                Recipant address
              </p>
              <h3 className="text-sm font-medium">
                Poznań, 40-100, <br /> ul Wadowicka 20/2
              </h3>
            </div>
          </div>
          {/* <p className="text-sm">{dateFormats.common(data.createdAt)}</p> */}
        </CardContent>
      </Card>
    </li>
  );
}
