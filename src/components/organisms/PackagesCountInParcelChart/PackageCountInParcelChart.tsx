import { Cell, Legend, Pie, PieChart } from "recharts";
import { Flex, useToken } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { ParcelDeliveriesStatsResponse } from "@/typings/parcel";
import { WidgetBorderBox } from "@/components/atoms/WidgetBorderBox/WidgetBorderBox";
import { PACKAGE_TYPE } from "@/typings/requests";

const RADIAN = Math.PI / 180;

export function PackagesCountInParcelChart({
  isEmpty,
  data,
}: {
  isEmpty: boolean;
  data: ParcelDeliveriesStatsResponse["packagesCountInParcel"];
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const pieColors = useToken("colors", Object.values(PACKAGE_COUNT_COLOR_MAP));
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setChartWidth(ref.current.getBoundingClientRect().width);
    }
  }, []);

  console.log(data.items);
  return (
    <WidgetBorderBox title="Packages count in one parcel" bg="white">
      <Flex
        justifyContent="center"
        flexBasis={"100%"}
        width={"100%"}
        ref={ref}
        gap={4}
      >
        <PieChart width={400} height={400}>
          <Pie
            style={{ outline: "none" }}
            data={data.items}
            cx="50%"
            cy="50%"
            labelLine={false}
            // name="Parcels with grouped number of packages"
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              percent,
              index,
            }) => {
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  fill="white"
                  textAnchor={x > cx ? "start" : "end"}
                  dominantBaseline="central"
                >
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              );
            }}
            outerRadius={180}
            dataKey="parcelsCount"
          >
            {data.items.map((entry, index) => (
              <Cell
                style={{ outline: "none" }}
                key={`cell-${index}`}
                fill={pieColors[index]}
              />
            ))}
          </Pie>

          <Legend margin={{ top: 40 }} />
        </PieChart>
      </Flex>
    </WidgetBorderBox>
  );
}

export const PACKAGE_COUNT_COLOR_MAP: Record<number, string> = {
  1: "cyan.500",
  2: "purple.500",
  3: "pink.500",
} as const;
