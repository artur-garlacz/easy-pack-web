import { Cell, Pie, PieChart } from "recharts";
import { Flex, useToken } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { ParcelDeliveriesStatsResponse } from "@/typings/parcel";
import { WidgetBorderBox } from "@/components/atoms/WidgetBorderBox/WidgetBorderBox";
import { PACKAGE_TYPE } from "@/typings/requests";

const RADIAN = Math.PI / 180;

export function PackagesCountByTypeChart({
  isEmpty,
  data,
}: {
  isEmpty: boolean;
  data: ParcelDeliveriesStatsResponse["groupPackagesByType"];
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const pieColors = useToken("colors", [
    PACKAGE_TYPE_COLOR_MAP.BOX,
    PACKAGE_TYPE_COLOR_MAP.ENVELOPE,
    PACKAGE_TYPE_COLOR_MAP.OTHER,
  ]);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setChartWidth(ref.current.getBoundingClientRect().width);
    }
  }, []);

  return (
    <WidgetBorderBox title="Total packages type" bg="white">
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
            dataKey="count"
          >
            {data.items.map((entry, index) => (
              <Cell
                style={{ outline: "none" }}
                key={`cell-${index}`}
                fill={pieColors[index]}
              />
            ))}
          </Pie>
        </PieChart>
      </Flex>
    </WidgetBorderBox>
  );
}

export const PACKAGE_TYPE_COLOR_MAP: Record<PACKAGE_TYPE, string> = {
  [PACKAGE_TYPE.BOX]: "cyan.500",
  [PACKAGE_TYPE.ENVELOPE]: "purple.500",
  [PACKAGE_TYPE.OTHER]: "pink.500",
} as const;
