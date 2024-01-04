import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardFooter,
  CardHeader,
  Flex,
  Text,
  useToken,
} from "@chakra-ui/react";
import { CardDescription, CardTitle } from "@/components/atoms/Card";
import { WidgetBorderBox } from "@/components/atoms/WidgetBorderBox/WidgetBorderBox";
import { useEffect, useRef, useState } from "react";
import { ParcelDeliveryStatChartItem } from "@/typings/parcel";

export function TotalParcelsIncomeChart({
  isEmpty,
  data,
}: {
  isEmpty: boolean;
  data: ParcelDeliveryStatChartItem[];
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [chartWidth, setChartWidth] = useState(0);
  const [currentHoverItem, setCurrentHoverItem] = useState<number | null>(null);

  useEffect(() => {
    if (ref.current) {
      setChartWidth(ref.current.getBoundingClientRect().width);
    }
  }, []);

  return (
    <Flex flexBasis={"100%"} width={"100%"} height={350} ref={ref} gap={4}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={200}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="period" strokeOpacity={0} />
          <Tooltip />

          {isEmpty && (
            <svg
              x={chartWidth / 2 - 42}
              y={82}
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <rect rx="2" width="84" height="27" fill="#EDF2F7"></rect>
                <text fontSize={16} y={18} x={12} fontWeight={500}>
                  No Data
                </text>
              </g>
            </svg>
          )}

          <Line
            type="monotone"
            dataKey="totalIncome"
            name="Total income [PLN]"
            stroke="#8884d8"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />

          <Legend margin={{ top: 40 }} />
        </LineChart>
      </ResponsiveContainer>
    </Flex>
  );
}
