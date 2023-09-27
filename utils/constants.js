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

export const timePeriod = {
    "1 day": "1",
    "7 days": "7",
    "1 month": "30",
    "3 months": "90",
    "6 months": "180",
    "1 year": "360",
    "2 years": "720",
    "5 years": "1800",
    "10 years": "3600"
}

export const stockkeys = [
    "Date",
    "Open Price",
    "High Price",
    "Low Price",
    "Close Price",
    "WAP",
    "No.of Shares",
    "No. of Trades",
    "Total Turnover (Rs.)",
    "% Deli. Qty to Traded Qty",
    "Spread High-Low",
    "Spread Close-Open"
]

export const necessarykeys = [
    "Date",
    "Open Price",
    "High Price",
    "Low Price",
    "Close Price"
]

export const otherkeys = [
    "WAP",
    "No.of Shares",
    "No. of Trades",
    "Total Turnover (Rs.)",
    "% Deli. Qty to Traded Qty",
    "Spread High-Low",
    "Spread Close-Open"
]

export const dashboardOptions = {
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
        }
    },
    stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        colors: undefined,
        width: 2,
        dashArray: 0
    },
    dataLabels: {
        enabled: false
    },
    markers: {
        size: 0
    },
    title: {
        text: "Stock Price Movement",
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
                return val.toFixed();
            }
        },
        title: {
            text: "Price in Rs"
        }
    },
    xaxis: {
        type: "datetime",
        labels: {
            formatter: (val) => {
                const dt = new Date(val);
                return (
                    dt.getDate() +
                    "-" +
                    (dt.getMonth() + 1) +
                    "-" +
                    dt.getFullYear()
                );
            }
        },
        title: {
            text: "Time Period"
        }
    },

    tooltip: {
        shared: false,
        x: {
            formatter: (val) => {
                const dt = new Date(val);
                return (
                    dt.getDate() +
                    "-" +
                    (dt.getMonth() + 1) +
                    "-" +
                    dt.getFullYear()
                );
            }
        },
        y: {
            formatter: (val) => {
                return val;
            }
        }
    }
}