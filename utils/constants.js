export const sectorChartOptions = {
    chart: {
        background: "inherit",
        type: "area",
        height: "auto",
        zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: true
        },
        toolbar: {
            autoSelected: "zoom"
        },
        width: "100%"
    },
    plotOptions: {
        bar: {
            horizontal: false
        }
    },
    stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        colors: undefined,
        width: 0,
        dashArray: 0
    },
    dataLabels: {
        enabled: false
    },
    markers: {
        size: 0
    },

    title: {
        text: "Sectors Overview",
        align: "center",
        sx: {
            fontSize: "24px",
            fontWeight: "bold",
            fontFamily: undefined,
            color: "blue",
            display: "flex",
            justifyContent: "center"
        }
    },
    fill: {
        type: "solid",
        opacity: 0.9,
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 90, 100]
        }
    },
    yaxis: {
        labels: {
            formatter: (val) => {
                return val;
            }
        },
        title: {
            text: "Number of Companies"
        }
    },
    xaxis: {
        labels: {
            rotate: -60,
            maxHeight: 150,
            trim: true,
            formatter: (val) => {
                return val;
            }
        },
        title: {
            text: "Sectors"
        }
    },

    tooltip: {
        shared: false,
        x: {
            formatter: (val) => {
                return val;
            }
        },
        y: {
            formatter: (val) => {
                return val;
            }
        }
    }
}