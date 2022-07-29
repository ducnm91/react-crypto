import React, { useEffect, useState } from "react";
import _ from 'lodash'
import numeral from "numeral";
import { getZeroDecimal } from "../../utils/formatNumber";
import { indicatorRelativeStrengthIndex } from '@d3fc/d3fc-technical-indicator';

const rsi = indicatorRelativeStrengthIndex().period(14);
// const rsiInputData = chartData.map(item => item[4])
// console.log(rsi(rsiInputData))

const formularProfit = (fund, sellPrice, buyPrice) => {
  return fund * (sellPrice - buyPrice) / buyPrice;
}

const calculateProfit = (data, fund) => {
  data.reduce((previousValue, currentValue) => {
    const sellPrice = currentValue.sell.close
    const buyPrice = currentValue.buy.close
    const profit = formularProfit(fund, sellPrice, buyPrice);

    return previousValue + Number(profit.toFixed(3));
  }, 0)
}

const getLast3Candles = (threeCandles) => {
  const greens3Candles = threeCandles.greens;
  const reds3Candles = threeCandles.reds;
  let last3Candles;
  if (greens3Candles.length && !reds3Candles.length) {
    last3Candles = greens3Candles[greens3Candles.length - 1]
  } else if (!greens3Candles.length && reds3Candles.length) {
    last3Candles = reds3Candles[reds3Candles.length - 1]
  } else {
    const lastGreend3Candles = greens3Candles[greens3Candles.length - 1]
    const lastRed3Candles = reds3Candles[reds3Candles.length - 1]
    last3Candles = lastGreend3Candles.closeTime > lastRed3Candles.closeTime ? lastGreend3Candles : lastRed3Candles
  }
  
  return last3Candles
}

const ThreeCandle = ({data, lastCandle, target, fund, pairToken}) => {
  const [buyCouldGetProfit, setBuyCouldGetProfit] = useState([]);
  const [buyCouldGetProfitValue, setBuyCouldGetProfitValue] = useState(0);
  const [tradeStore, setTradeStore] = useState([])

  useEffect(()=>{
    if (localStorage.getItem('trade')) {
      setTradeStore(JSON.parse(localStorage.getItem('trade')))
    }
  },[])

  // get api history, update status for tradeStore

  useEffect(()=> {
    // tool trade
    if (data) {
      // console.log(data)
      const last3Candles = getLast3Candles(data)
      const isLast3RedCandle = last3Candles.open > last3Candles.close
      
      // buy if curent candle is next to last 3 red candles
      if (lastCandle[0] - last3Candles.closeTime > 1) {
        return true
      }

      const tradeStoreWithPairToken = tradeStore.filter((t) => {
        return t.pairToken === pairToken
      })
      console.log('----------')
      if (tradeStoreWithPairToken.length) {
        console.log(1)
        const dataHistory = tradeStoreWithPairToken[0].data;
        const lastTrade = dataHistory[dataHistory.length - 1]
        console.log(dataHistory, lastTrade)
        if (lastTrade.status === 'success') {
          console.log(2)
          if(lastTrade.type === 'buy' && !isLast3RedCandle) {
            console.log(3)
            const newTrade = {
              type: 'sell',
              status: 'success',
              price: last3Candles.close
            }
            // const newTradeStore = [...tradeStoreWithPairToken];
            tradeStoreWithPairToken[0].data.push(newTrade)
            setTradeStore(oldTradeStore => {
              const newTradeStore = _.merge(oldTradeStore, tradeStoreWithPairToken)
              localStorage.setItem('trade', JSON.stringify(newTradeStore))
              return newTradeStore
            })
            // sell
          } else if (lastTrade.type === 'sell' && isLast3RedCandle) {
            console.log(4)
            // buy
            const newTrade = {
              type: 'buy',
              status: 'success',
              price: last3Candles.close
            }
            // const newTradeStore = [...tradeStoreWithPairToken];
            tradeStoreWithPairToken[0].data.push(newTrade)
            setTradeStore(oldTradeStore => {
              const newTradeStore = _.merge(oldTradeStore, tradeStoreWithPairToken)
              localStorage.setItem('trade', JSON.stringify(newTradeStore))
              return newTradeStore
            })
          }
        }
      } else if (last3Candles.open > last3Candles.close) {
        console.log(5)
        const newTradeWithPair = [{
          pairToken: pairToken,
          fund: {
            token: fund,
            quoteToken: fund * last3Candles.close
          },
          result: {
            token: 0,
            quoteToken: 0
          },
          data: [
            {
              type: 'buy',
              status: 'success',
              price: last3Candles.close
            }
          ]
        }]
        setTradeStore(oldTradeStore => {
          const newTradeStore = oldTradeStore.concat(newTradeWithPair)
          localStorage.setItem('trade', JSON.stringify(newTradeStore))
          return newTradeStore
        })
        // buy
      }
    }
  }, [data, pairToken, lastCandle])

  useEffect(() => {
    // history analysis
    if (data) {
      setBuyCouldGetProfitValue(0)
      const itemDetected = data;
      console.log(itemDetected);
      const results = [];

      itemDetected.reds.forEach((buy) => {
        const couldSell = itemDetected.greens.filter((sell) => {
          const profit = formularProfit(fund, sell.close, buy.close);
          return (
            buy.openTime < sell.openTime &&
            buy.close < sell.close &&
            profit >= target
          );
        });
        if (couldSell.length) {
          results.push({
            buy,
            sell: couldSell[0],
          });
        }
      });

      setBuyCouldGetProfit(results);
      console.log(results);
    }
  }, [data]);

  useEffect(() => {
    if (buyCouldGetProfit.length) {
      setBuyCouldGetProfitValue(calculateProfit(buyCouldGetProfit, fund))
    }
  }, [buyCouldGetProfit]);

  return (
    <>
      <h4>Result:</h4>
      <p>
        Could Buy: {data?.reds?.length} - Buy could get profit -{" "}
        {buyCouldGetProfit.length}
      </p>
      { !!buyCouldGetProfitValue && <p>
        With {fund} will get {" "}
        {numeral(buyCouldGetProfitValue).format(
          `0,0[.]${getZeroDecimal(buyCouldGetProfitValue)}`
        )}
      </p> }
    </>
  );
};

export default ThreeCandle;
