import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";
import "./detail.scss";
import Select from "react-select";
import RepositoryFactory from "../../repositories/RepositoryFactory";
import Highcharts from "highcharts/highstock";
import loadIndicatorsAll from "highcharts/indicators/indicators-all";
import numeral from "numeral";

import { Row, Col, Container } from "react-bootstrap";

import { getZeroDecimal } from "../../utils/formatNumber";

import useRefresh from "../../hooks/useRefresh";

import Research from "../../components/Coin/Research";

loadIndicatorsAll(Highcharts);

const BinanceRepository = RepositoryFactory.get("binance");
const CoingeckoRepository = RepositoryFactory.get("coingecko");

// 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w,1M
const intervalOptions = [
  { value: "5m", label: "5 minutes" },
  { value: "30m", label: "30 minutes" },
  { value: "1h", label: "1 hours" },
  { value: "4h", label: "4 hours" },
  { value: "12h", label: "12 hours" },
  { value: "1d", label: "1 days" },
  { value: "1w", label: "1 weeks" },
];

const quoteTokenOptions = [
  { value: "usdt", label: "USDT" },
  { value: "bnb", label: "BNB" },
  { value: "eth", label: "ETH" },
  { value: "btc", label: "BTC" },
];

const Coin = () => {
  const params = useParams();
  const { fastRefresh } = useRefresh();
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState([]);
  const [chartInstance, setChartInstance] = useState();
  const [interval, setInterval] = useState("5m");
  const [quoteToken, setQuoteToken] = useState("usdt");
  const [pairToken, setPairToken] = useState("BTC-USDT");
  const [orderBook, setOrderBook] = useState([]);
  const [tokenLastestPrice, setTokenLastestPrice] = useState(0);
  const [token24hrPrice, setToken24hrPrice] = useState({
    highPrice: 0,
    lastPrice: 0,
    lowPrice: 0,
    weightedAvgPrice: 0,
  });

  const [tokenInfo, setTokenInfo] = useState();

  useEffect(() => {
    if (tokenInfo?.symbol && tokenInfo.symbol !== quoteToken) {
      let pair = `${tokenInfo.symbol}-${quoteToken}`;

      if (pair.indexOf("eth") >= 0 && pair.indexOf("btc") >= 0) {
        pair = "eth-btc";
      }

      if (pair.indexOf("bnb") >= 0 && pair.indexOf("btc") >= 0) {
        pair = "bnb-btc";
      }

      if (pair.indexOf("bnb") >= 0 && pair.indexOf("eth") >= 0) {
        pair = "bnb-eth";
      }

      setPairToken(pair.toUpperCase());
    }
  }, [tokenInfo, quoteToken]);

  useEffect(() => {
    BinanceRepository.getCandlestickData(
      pairToken.replace("-", ""),
      interval,
      144
    ).then((res) => {
      // console.log(res.data)
      const parseData = res.data.map((item) => {
        return item.map((i) => Number(i));
      });

      setChartData(parseData);
    });
  }, [pairToken, interval, fastRefresh]);

  useEffect(() => {
    BinanceRepository.getDepth(pairToken.replace("-", ""), 10).then((res) => {
      // console.log(res.data)
      const { asks, bids } = res.data;
      const parseAsks = asks.map((item) => {
        return item.map((i) => Number(i));
      });

      const parseBids = bids.map((item) => {
        return item.map((i) => Number(i));
      });

      setOrderBook({ asks: parseAsks, bids: parseBids });
    });

    BinanceRepository.getLastestPrice(pairToken.replace("-", "")).then(
      (res) => {
        setTokenLastestPrice(Number(res.data.price));
      }
    );

    BinanceRepository.getTicker24h(pairToken.replace("-", "")).then((res) => {
      const { highPrice, lastPrice, lowPrice, weightedAvgPrice } = res.data;
      setToken24hrPrice({ highPrice, lastPrice, lowPrice, weightedAvgPrice });
    });

    CoingeckoRepository.getCoinInfo(params.id).then((res) => {
      setTokenInfo(res.data);
    });
  }, [pairToken, fastRefresh, params]);

  useEffect(() => {
    initChart();
  }, [chartData, tokenInfo]);

  useEffect(() => {
    if (chartData.length) {
      const itemDetected = {
        greens: [],
        reds: [],
      };
      const itemsRed = [];
      const itemsGreen = [];
      chartData.forEach((candle, index) => {
        const currentCandle = {
          open: candle[1],
          close: candle[4],
          openTime: candle[0],
          closeTime: candle[6],
        };

        const isRedCurrentCandle = currentCandle.open > currentCandle.close;
        if (!index) {
          if (isRedCurrentCandle) {
            itemsRed.push(currentCandle);
          } else {
            itemsGreen.push(currentCandle);
          }
        } else {
          const isRedPrevCandle =
            chartData[index - 1][1] > chartData[index - 1][4];
          if (isRedPrevCandle) {
            if (isRedCurrentCandle) {
              itemsRed.push(currentCandle);
            } else {
              itemsGreen.push(currentCandle);
              itemsRed.splice(0, itemsRed.length);
            }
          } else {
            if (!isRedCurrentCandle) {
              itemsGreen.push(currentCandle);
            } else {
              itemsRed.push(currentCandle);
              itemsGreen.splice(0, itemsGreen.length);
            }
          }
        }

        if (itemsRed.length > 2) {
          const tmp = [...itemsRed];
          const changePercent =
            (tmp[0].open - tmp[tmp.length - 1].close) / tmp[0].open;
          itemDetected.reds.push({
            changePercent,
            data: tmp,
          });
          // itemsRed.splice(0,itemsRed.length)
        }
        if (itemsGreen.length > 2) {
          const tmp = [...itemsGreen];
          const changePercent =
            (tmp[tmp.length - 1].close - tmp[0].open) / tmp[0].open;
          itemDetected.greens.push({
            changePercent,
            data: tmp,
          });
          // itemsGreen.splice(0,itemsGreen.length)
        }
      });
      console.log(itemDetected);
      console.log("--------green");

      itemDetected.greens.forEach((element) => {
        if (element.changePercent * 100 > 1) {
          console.log(element.changePercent * 100);
        }
      });
      console.log("--------red");
      itemDetected.reds.forEach((element) => {
        if (element.changePercent * 100 > 1) {
          console.log(element.changePercent * 100);
        }
      });
    }
  }, [chartData]);

  const initChart = () => {
    Highcharts.stockChart(chartRef.current, {
      chart: {
        events: {
          load: function (e) {
            setChartInstance(e.target);
            // const series = this.series[0];
            // socket.addEventListener('message', function(event) {
            //   const rawData = JSON.parse(event.data)
            //   const candleData = [rawData['E'], Number(rawData['k']['o']), Number(rawData['k']['c']), Number(rawData['k']['h']), Number(rawData['k']['l'])]
            //   series.addPoint(candleData, true, true);
            // });
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

      yAxis: {
        offset: 50,
        // gridLineColor: 'transparent'
      },

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

      yAxis: [
        {
          height: "48%",
        },
        {
          height: "48%",
          top: "52%",
        },
      ],

      series: [
        {
          type: "candlestick",
          id: "aapl",
          name: `${tokenInfo?.symbol.toUpperCase()}-${quoteToken.toUpperCase()}`,
          data: chartData,
        },
        {
          yAxis: 1,
          type: "rsi",
          linkedTo: "aapl",
        },
        
        
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

  const changeInterval = (option) => {
    if (option) {
      setInterval(option.value);
    }
  };

  const changeQuoteToken = (option) => {
    if (option) {
      setQuoteToken(option.value);
    }
  };

  return (
    <>
      <Row>
        <Col lg={3}>
          <Row className="pt-2">
            <Col lg={6}>Price ({ pairToken.split('-')[1] })</Col>
            <Col lg={6}>Amount ({ pairToken.split('-')[0] })</Col>
          </Row>
          { orderBook.bids &&
            <div className="bids">
              { orderBook.bids.map(order => (
                <Row key={`${order[0]}-${order[1]}`}>
                  <Col lg={6} className="text-price-bid">{ numeral(order[0]).format(`0,0[.]${getZeroDecimal(order[0])}`) }</Col>
                  <Col lg={6} className="text-end text-amount-bid">{ numeral(order[1]).format(`0,0[.]${getZeroDecimal(order[1])} a`) }</Col>
                </Row>
              )) }
            </div>
          }
          <div className="lastest-price fw-bold fs-3 mt-2 mb-2">{ numeral(tokenLastestPrice).format(`0,0[.]${getZeroDecimal(tokenLastestPrice)}`) }</div>
          { orderBook.asks &&
            <div className="asks">
              { orderBook.asks.map(order => (
                <Row key={`${order[0]}-${order[1]}`}>
                  <Col lg={6} className="text-price-ask">{ numeral(order[0]).format(`0,0[.]${getZeroDecimal(order[0])}`) }</Col>
                  <Col lg={6} className="text-end text-amount-ask">{ numeral(order[1]).format(`0,0[.]${getZeroDecimal(order[1])} a`) }</Col>
                </Row>
              )) }
            </div>
          }
        </Col>

        <Col lg={6}>
          <Row>
            <Col lg={2}>{pairToken}</Col>
            <Col lg={10} className="d-flex">
              <div className="d-flex flex-column">
                <div className="label">24h high</div>
                <div className="value">
                  {numeral(token24hrPrice.highPrice).format(
                    `0,0[.]${getZeroDecimal(token24hrPrice.highPrice)}`
                  )}
                </div>
              </div>
              <div className="d-flex flex-column ms-4">
                <div className="label">24h low</div>
                <div className="value">
                  {numeral(token24hrPrice.lowPrice).format(
                    `0,0[.]${getZeroDecimal(token24hrPrice.lowPrice)}`
                  )}
                </div>
              </div>
              <div className="d-flex flex-column ms-4">
                <div className="label">24h average</div>
                <div className="value">
                  {numeral(token24hrPrice.weightedAvgPrice).format(
                    `0,0[.]${getZeroDecimal(token24hrPrice.weightedAvgPrice)}`
                  )}
                </div>
              </div>
            </Col>
          </Row>
          <div ref={chartRef} />
        </Col>

        <Col lg={3}>
          <p dangerouslySetInnerHTML={{ __html: tokenInfo?.description?.en }}></p>
          <ul>
            <li><a href={tokenInfo?.links?.homepage[0]} target="_blank">Homepage</a></li>
            <li><a href={ `https://twitter.com/${tokenInfo?.links?.twitter_screen_name}` } target="_blank">Twitter</a></li>
            { tokenInfo?.links?.telegram_channel_identifier && <li><a href={`https://t.me/${tokenInfo?.links?.telegram_channel_identifier}`} target="_blank">Telegram</a></li> }
            <li><a href={ tokenInfo?.links?.repos_url.github[0] } target="_blank">Source on Github</a></li>
          </ul>
        </Col>
      </Row>

      <Row className="filter mb-4">
        <Col lg={3}>
          <Select
            options={quoteTokenOptions}
            defaultValue={[{ value: "usdt", label: "USDT" }]}
            onChange={changeQuoteToken}
          />
        </Col>
        <Col lg={6}>
          <Select
            options={intervalOptions}
            defaultValue={[{ value: "5m", label: "5 minutes" }]}
            onChange={changeInterval}
            className="ms-4"
          />
        </Col>
      </Row>
      <Container>
        {/* <p>SMA(7) - blue; SMA(25) - black; SMA(99) - green</p>
        <p>EMA(7) - orange; EMA(25) - purple; EMA(99) - pink</p>
        <p>WMA(7) - yellow; WMA(25) - dark blue; WMA(99) - pink</p>
        <ul>
          <li>
            ???????ng SMA (hay Simple Moving Average - xanh blue) l?? ???????ng trung
            b??nh ?????ng ????n gi???n ???????c t??nh b???ng trung b??nh c???ng c??c m???c gi?? ????ng
            c???a trong m???t kho???ng th???i gian giao d???ch nh???t ?????nh.
          </li>
          <li>
            ???????ng EMA (hay Exponential Moving Average - ??en) l?? ???????ng trung b??nh
            l??y th???a ???????c t??nh b???ng c??ng th???c h??m m??, trong ???? ?????t n???ng c??c bi???n
            ?????ng gi?? g???n nh???t. Do ????, EMA kh?? nh???y c???m v???i c??c bi???n ?????ng ng???n
            h???n, nh???n bi???t c??c t??n hi???u b???t th?????ng nhanh h??n ???????ng SMA gi??p nh??
            ?????u t?? ph???n ???ng nhanh h??n tr?????c c??c bi???n ?????ng gi?? ng???n h???n.
          </li>
          <li>
            ???????ng WMA (hay Weighted Moving Average - xanh green) l?? ???????ng trung
            b??nh t??? tr???ng tuy???n t??nh, n?? s??? ch?? tr???ng c??c tham s??? c?? t???n su???t
            xu???t hi???n cao nh???t. Ngh??a l?? ???????ng trung b??nh tr???ng s??? WMA s??? ?????t
            n???ng c??c b?????c gi?? c?? kh???i l?????ng giao d???ch l???n, quan t??m ?????n y???u t???
            ch???t l?????ng c???a d??ng ti???n.
          </li>
          <li>
            RSI l?? ch??? b??o ?????ng l?????ng ??o l?????ng c??c thay ?????i v??? gi?? c???a m???t t??i
            s???n trong c??c giai ??o???n th???i gian l???y con s??? 14 (14 ng??y theo ????? th???
            h??ng ng??y, 14 gi??? theo bi???u ????? h??ng gi???, v.v.). Ch??? s??? ???????c x??c ?????nh
            b???ng c??ch chia trung b??nh gi?? t??ng cho trung b??nh gi?? gi???m trong
            kho???ng th???i gian t??nh v?? sau ???? bi???u di???n ch??? s??? n??y tr??n thang ??i???m
            ???????c ?????t t??? 0 ?????n 100. N?? ????nh gi?? gi?? t??i s???n tr??n thang ??i???m t??? 0
            ?????n 100 trong c??c giai ??o???n th???i gian l???y con s??? 14. Khi RSI c?? ??i???m
            n???m d?????i m???c 30, n?? cho bi???t gi?? t??i s???n c?? th??? g???n ch???m ????y (qu??
            b??n); n???u RSI c?? ??i???m n???m tr??n m???c 70, n?? cho bi???t gi?? t??i s???n g???n
            m???c ?????nh (qu?? mua) trong kho???ng th???i gian ???? v?? c?? kh??? n??ng s??? gi???m.
          </li>
        </ul> */}

        {/* <Research symbol={tokenInfo?.symbol} /> */}
      </Container>
    </>
  );
};

export default Coin;
