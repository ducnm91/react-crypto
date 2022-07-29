import React, { useEffect, useState, useRef } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from 'highcharts-react-official';
import loadIndicatorsAll from "highcharts/indicators/indicators-all";
import RepositoryFactory from "../../repositories/RepositoryFactory";

import use3Candles from "../../hooks/use3Candles";
import TradeSpot from "../Tools/TradeSpot";

import useRefresh from "../../hooks/useRefresh";

const BinanceRepository = RepositoryFactory.get("binance");

loadIndicatorsAll(Highcharts);

const Candlestick = (props) => {
  const { fastRefresh } = useRefresh();
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState([]);
  const [yAxisRsi, setYAxisRsi] = useState({
    offset: 50,
  });
  const [seriesRsi, setSeriresRsi] = useState([]);
  const threeCandles = use3Candles(chartData);

  const options = {
    
  }

  // const [series, setSeries] = useState('')

  useEffect(() => {
    if (props.hasRsi) {
      setYAxisRsi([
        {
          offset: 50,
          height: "48%",
        },
        {
          offset: 50,
          height: "48%",
          top: "52%",
        },
      ]);

      setSeriresRsi([
        {
          yAxis: 1,
          type: "rsi",
          linkedTo: "aapl"
        },
      ]);
    }
  }, [props.hasRsi]);

  useEffect(() => {
    if (props.pairToken && props.interval) {
      BinanceRepository.getCandlestickData(
        props.pairToken.replace("-", ""),
        props.interval,
        144
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
      initChart();
    }
  }, [chartData]);

  const initChart = () => {
    Highcharts.stockChart(chartRef.current, {
      chart: {
        events: {
          load: function (e) {
            // setChartInstance(e.target);
            // const series = this.series[0];
            // socket.addEventListener('message', function(event) {
            //   const rawData = JSON.parse(event.data)
            //   const candleData = [rawData['E'], Number(rawData['k']['o']), Number(rawData['k']['c']), Number(rawData['k']['h']), Number(rawData['k']['l'])]
            //   series.addPoint(candleData, true, true);
            // });
            // setSeries(this.series[0])
            // console.log(this.series[0])
            // initSocket()
          },
        },
        height: "600px",
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
        // sma: {
        //   color: 'yellow'
        // },
        // ema: {
        //   color: 'pink'
        // },
        // wma: {
        //   color: 'purple'
        // }
      },

      yAxis: yAxisRsi,

      series: [
        {
          type: "candlestick",
          id: "aapl",
          name: `${props.pairToken}`,
          data: chartData,
          showInLegend: false
        },
        ...seriesRsi,

        // {
        //   type: 'ema',
        //   linkedTo: 'aapl',
        //   params: {
        //       period: 7
        //   }
        // },
        // {
        //   type: 'ema',
        //   linkedTo: 'aapl',
        //   params: {
        //       period: 25
        //   }
        // },
        // {
        //   type: 'ema',
        //   linkedTo: 'aapl',
        //   params: {
        //       period: 99
        //   }
        // },
        // {
        //   type: 'wma',
        //   linkedTo: 'aapl',
        //   params: {
        //     period: 7
        //   }
        // },
        // {
        //   type: 'wma',
        //   linkedTo: 'aapl',
        //   params: {
        //     period: 25
        //   }
        // },
        // {
        //   type: 'wma',
        //   linkedTo: 'aapl',
        //   params: {
        //     period: 99
        //   }
        // }
      ],
    });
  };

  const initSocket = (series) => {
    const symbol = props.pairToken.replace("-", "").toLowerCase()
    const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@kline_${props.interval}`)

    socket.addEventListener('message', function (event) {
      console.log(event)
      // const lastPoint = series.data[series.data.length - 1];

      // const rawData = JSON.parse(event.data)
      // const timeOpen = rawData['k']['t']
      // const openPrice = Number(rawData['k']['o'])
      // const highPrice = Number(rawData['k']['h'])
      // const lowPrice = Number(rawData['k']['l'])
      // const closePrice = Number(rawData['k']['c'])
      // const candleData = [timeOpen, openPrice, highPrice, lowPrice, closePrice]

      // if (lastPoint.options.x !== timeOpen) {
      //   series.addPoint(candleData, true, true);
      // } else {
      //   lastPoint.update(candleData, true);
      // }
    });
  }

  return (
    <>
      {chartData.length && <div ref={chartRef} />}
      {chartData.length && (
        <TradeSpot
          threeCandles={threeCandles}
          lastCandle={chartData[chartData.length - 1]}
          targetPercentage={0.002}
          funds={100}
          pairToken={props.pairToken}
        />
      )}
    </>
  );
};

export default Candlestick;
