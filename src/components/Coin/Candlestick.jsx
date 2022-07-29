import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from 'highcharts-react-official';
import loadIndicatorsAll from "highcharts/indicators/indicators-all";

import RepositoryFactory from "../../repositories/RepositoryFactory";

import use3Candles from "../../hooks/use3Candles";
import TradeSpot from "../Tools/TradeSpot";

import TradeFuture from "../Tools/Calculate";

const BinanceRepository = RepositoryFactory.get("binance");

loadIndicatorsAll(Highcharts);

const Candlestick = (props) => {
  const [chartData, setChartData] = useState([]);
  const threeCandles = use3Candles(chartData);

  const [series, setSeries] = useState('')

  const [options, setOptions] = useState({
    title: {
      text: `${props.pairToken}`
    },
    chart: {
      height: "600px",
      events: {
        load: function (e) {
          setSeries(this.series[0])
        },
      },
    },
    scrollbar: {
      enabled: false,
    },
    navigator: {
      enabled: false,
    },
    rangeSelector: {
      enabled: false,
    },
    exporting: { enabled: false },

    xAxis: {
      minorTickLength: 0,
      tickLength: 0,
    },

    plotOptions: {
      candlestick: {
        color: "rgb(222, 95, 95)",
        lineColor: "rgb(222, 95, 95)",
        upColor: "rgb(49, 186, 160)",
        upLineColor: "rgb(49, 186, 160)",
      },
      sma: {
        color: 'yellow'
      },
      ema: {
        color: 'pink'
      },
      wma: {
        color: 'purple'
      }
    },

    yAxis: {
      offset: 50,
    },

    series: [
      {
        type: "candlestick",
        id: `${props.pairToken}`,
        showInLegend: false,
        data: [],
      },
      {
          type: 'ema',
          linkedTo: `${props.pairToken}`,
          params: {
              period: 7
          }
        },
        {
          type: 'ema',
          linkedTo: `${props.pairToken}`,
          params: {
              period: 25
          }
        },
        {
          type: 'ema',
          linkedTo: `${props.pairToken}`,
          params: {
              period: 99
          }
        },
        {
          type: 'wma',
          linkedTo: `${props.pairToken}`,
          params: {
            period: 7
          }
        },
        {
          type: 'wma',
          linkedTo: `${props.pairToken}`,
          params: {
            period: 25
          }
        },
        {
          type: 'wma',
          linkedTo: `${props.pairToken}`,
          params: {
            period: 99
          }
        }
    ]
  })

  useEffect(() => {
    if (props.hasRsi) {
      const newOptions = {...options}
      newOptions.yAxis = [
        {
          offset: 50,
          height: "48%",
        },
        {
          offset: 50,
          height: "48%",
          top: "52%",
        },
      ];

      newOptions.series.push({
        yAxis: 1,
        type: "rsi",
        linkedTo: `${props.pairToken}`
      })

      setOptions(newOptions)
    }
  }, []);

  useEffect(() => {
    if (props.pairToken && props.interval) {
      BinanceRepository.getCandlestickData(
        props.pairToken.replace("-", ""),
        props.interval,
        90
      ).then((res) => {
        const parseData = res.data.map((item) => {
          return item.map((i) => Number(i));
        });

        setChartData(parseData);
      });
    }
  }, [props.pairToken, props.interval]); //fastRefresh

  useEffect(() => {
    if (chartData.length) {
      const newOptions = {...options}
      newOptions.series[0].data = chartData
      setOptions(newOptions)
      initSocket()
    }
  }, [chartData]);

  const initSocket = () => {
    const symbol = props.pairToken.replace("-", "").toLowerCase()
    const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@kline_${props.interval}`)

    socket.addEventListener('message', function (event) {
      if(series & series.data) {
        const lastPoint = series.data[series.data.length - 1];

        const rawData = JSON.parse(event.data)
        const timeOpen = rawData['k']['t']
        const openPrice = Number(rawData['k']['o'])
        const highPrice = Number(rawData['k']['h'])
        const lowPrice = Number(rawData['k']['l'])
        const closePrice = Number(rawData['k']['c'])
        const candleData = [timeOpen, openPrice, highPrice, lowPrice, closePrice]

        if (lastPoint.options.x !== timeOpen) {
          series.addPoint(candleData, true, true);
        } else {
          lastPoint.update(candleData, true);
        }
      }
    });
  }

  return (
    <>
      { chartData.length && <HighchartsReact
        highcharts={Highcharts}
        options={options}
        constructorType="stockChart"
      /> }

      {chartData.length && (
        <TradeSpot
          threeCandles={threeCandles}
          lastCandle={chartData[chartData.length - 1]}
          targetPercentage={0.002}
          funds={100}
          pairToken={props.pairToken}
        />
      )}

      <TradeFuture />
    </>
  );
};

export default Candlestick;
