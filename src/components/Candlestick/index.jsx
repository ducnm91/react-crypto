import React, { useEffect, useState, useRef } from "react";
import _ from 'lodash';
import './index.scss';
import Select from 'react-select';
import RepositoryFactory from "../../repositories/RepositoryFactory";
import Highcharts from "highcharts/highstock";
import loadIndicatorsAll from 'highcharts/indicators/indicators-all';
import numeral from 'numeral';

import { Row, Col } from "react-bootstrap";

import { getZeroDecimal } from '../../utils/formatNumber';

loadIndicatorsAll(Highcharts)

const BinanceRepository = RepositoryFactory.get("binance");

// 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w,1M
const intervalOptions = [
  { value: '5m', label: '5 minutes' },
  { value: '30m', label: '30 minutes' },
  { value: '1h', label: '1 hours' },
  { value: '4h', label: '4 hours' },
  { value: '12h', label: '12 hours' },
  { value: '1d', label: '1 days' },
  { value: '1w', label: '1 weeks' },
]

const quoteTokenOptions = [
  { value: 'usdt', label: 'USDT' },
  { value: 'bnb', label: 'BNB' },
  { value: 'eth', label: 'ETH' },
  { value: 'btc', label: 'BTC' },
]

const Candlestick = (props) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState([]);
  const [chartInstance, setChartInstance] = useState();
  const [interval, setInterval] = useState('5m');
  const [quoteToken, setQuoteToken] = useState('usdt');
  const [pairToken, setPairToken] = useState('BTC-USDT')
  const [orderBook, setOrderBook] = useState([])
  const [tokenLastestPrice, setTokenLastestPrice] = useState(0)

  useEffect(() => {
    if(props.baseToken !== quoteToken) {
      let pair = `${props.baseToken}-${quoteToken}`;

      if (pair.indexOf('eth') >=0 && pair.indexOf('btc') >=0) {
        pair = 'eth-btc'
      }

      if (pair.indexOf('bnb') >=0 && pair.indexOf('btc') >=0) {
        pair = 'bnb-btc'
      }

      if (pair.indexOf('bnb') >=0 && pair.indexOf('eth') >=0) {
        pair = 'bnb-eth'
      }

      setPairToken(pair.toUpperCase())
    }
    
  }, [props.baseToken, quoteToken])


  useEffect(() => {
    BinanceRepository.getCandlestickData(
      pairToken.replace('-', ''),
      interval,
      90
    ).then((res) => {
      // console.log(res.data)
      const parseData = res.data.map((item) => {
        return item.map(i => Number(i))
      });

      setChartData(parseData);
    });
  }, [pairToken, interval]);

  useEffect(() => {
    BinanceRepository.getDepth(
      pairToken.replace('-', ''),
      10
    ).then((res) => {
      // console.log(res.data)
      const { asks, bids } = res.data
      const parseAsks = asks.map((item) => {
        return item.map(i => Number(i))
      });

      const parseBids = bids.map((item) => {
        return item.map(i => Number(i))
      });

      setOrderBook({ asks: parseAsks, bids: parseBids });
    });

    BinanceRepository.getLastestPrice(pairToken.replace('-', '')).then(res => {
      console.log(res)
      setTokenLastestPrice(Number(res.data.price))
    })
  }, [pairToken])

  useEffect(() => {
    initChart();
  }, [chartData, props.baseToken]);

  useEffect(() => {
    console.log(orderBook)
  }, [orderBook])

  const initChart = () => {
    Highcharts.stockChart(chartRef.current, {
      title: {
        text: pairToken,
      },

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
        height: '600px'
      },

      scrollbar: {
          enabled: false
      },
      navigator: {
          enabled: false
      },
      rangeSelector: {
          enabled: false
      },
      exporting: { enabled: false },

      yAxis: {
          offset: 50,
          // gridLineColor: 'transparent'
      },

      xAxis: {
          minorTickLength: 0,
          tickLength: 0
      },

      plotOptions: {
        candlestick: {
          color: 'rgb(222, 95, 95)',
          lineColor: 'rgb(222, 95, 95)',
          upColor: 'rgb(49, 186, 160)',
          upLineColor: 'rgb(49, 186, 160)'
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

      series: [
        {
          type: "candlestick",
          id: 'aapl',
          name: `${props.baseToken.toUpperCase()}-${quoteToken.toUpperCase()}`,
          data: chartData
        }, {
          type: 'sma',
          linkedTo: 'aapl',
          params: {
            period: 5
          }
        }, {
          type: 'sma',
          linkedTo: 'aapl',
          params: {
            period: 10
          }
        }, {
          type: 'sma',
          linkedTo: 'aapl',
          params: {
            period: 20
          }
        }
      ],
    });
  };

  const changeInterval = (option) => {
    if (option) {
      setInterval(option.value)
    }
  }

  const changeQuoteToken = (option) => {
    if (option) {
      setQuoteToken(option.value)
    }
  }

  return (
    <>
      <Row>
        <Col lg={9}>
          <div ref={chartRef} />
        </Col>

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
      </Row>
      
      <Row className="filter mb-4">
        <Col lg={3}>
          <Select 
            options={quoteTokenOptions}
            defaultValue={[{ value: 'usdt', label: 'USDT' }]}
            onChange={changeQuoteToken}
          />
        </Col>
        <Col lg={6}>
          <Select 
            options={intervalOptions}
            defaultValue={[{ value: '5m', label: '5 minutes' }]}
            onChange={changeInterval}
            className='ms-4'
          />
        </Col>
      </Row>

      <p>SMA(5) - blue;  SMA(10) - black;  SMA(20) - green</p>
      <ul>
        <li>Đường SMA (hay Simple Moving Average - xanh blue) là đường trung bình động đơn giản  được tính bằng trung bình cộng các mức giá đóng cửa trong một khoảng thời gian giao dịch nhất định.</li>
        <li>Đường EMA (hay Exponential Moving Average - đen) là đường trung bình lũy thừa được tính bằng công thức hàm mũ, trong đó đặt nặng các biến động giá gần nhất. Do đó, EMA khá nhạy cảm với các biến động ngắn hạn, nhận biết các tín hiệu bất thường nhanh hơn đường SMA giúp nhà đầu tư phản ứng nhanh hơn trước các biến động giá ngắn hạn.</li>
        <li>Đường WMA (hay Weighted Moving Average - xanh green) là đường trung bình tỉ trọng tuyến tính, nó sẽ chú trọng các tham số có tần suất xuất hiện cao nhất. Nghĩa là đường trung bình trọng số WMA sẽ đặt nặng các bước giá có khối lượng giao dịch lớn, quan tâm đến yếu tố chất lượng của dòng tiền.</li>
      </ul>
    </>
  ) 
};

export default Candlestick;
