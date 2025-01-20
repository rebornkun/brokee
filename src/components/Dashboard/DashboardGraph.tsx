import { ReactElement } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { TAxisData } from "../../types/types";
import { currencyFormatter } from "../../utils/helper";

type Props = {
  data: TAxisData | undefined;
  currencySymbol: string | undefined;
};

export const DashboardGraph = ({
  data,
  currencySymbol,
}: Props): ReactElement => {
  const xAxis = data?.xAxis ?? [];
  const yAxis = data?.yAxis ?? [];

  const highestYValue = Math.max(...yAxis) + 100; // avoid graph reaching to top line

  const graphOptions: {
    options: ApexOptions;
    series: [{ name: string; data: any[] }];
  } = {
    options: {
      chart: {
        width: 500,
        id: "tradex-revenue-overview",
        type: "area",
        height: 320,
        toolbar: { show: false },
        animations: {
          enabled: true,
          easing: "easeout",
          speed: 10,
        },
      },
      annotations: {
        yaxis: [
          {
            y: 0,
            borderColor: "#e0e2e6",
            label: {
              text: new Date().toLocaleString("default", { month: "long" }),
              style: {
                color: "#fff",
                background: "#00BD6F",
              },
            },
          },
        ],
        // xaxis: [{ borderColor: "#e0e2e6" }],
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: xAxis,
      },
      markers: {
        size: 0,
        shape: "circle",
      },
      yaxis: {
        tickAmount: 5,
        max: highestYValue,
        min: 0,
        labels: {
          formatter: (value) =>
            `${currencySymbol ?? ""}${currencyFormatter(value)}`,
        },
      },
      colors: ["#00BD6F"],
      fill: {
        type: "gradient",
        colors: ["#00BD6F", "#F8F2E8"],
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.8,
          opacityTo: 0.8,
        },
      },
    },
    series: [
      {
        name: `Revenue (${currencySymbol})`,
        data: yAxis,
      },
    ],
  };

  return (
    <div>
      <Chart
        options={graphOptions.options}
        series={graphOptions.series}
        type="area"
        width={500}
        height={320}
      />
    </div>
  );
};
