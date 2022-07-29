import React, { useEffect, useState } from "react";
import _ from "lodash";
import numeral from "numeral";
import { getZeroDecimal } from "../../utils/formatNumber";
import { indicatorRelativeStrengthIndex } from "@d3fc/d3fc-technical-indicator";

import { binanceFees } from "../../config/fees";

const rsi = indicatorRelativeStrengthIndex().period(14);
// const rsiInputData = chartData.map(item => item[4])
// console.log(rsi(rsiInputData))

const changePercentage = (sellPrice, buyPrice) => {
  return (sellPrice - buyPrice) / buyPrice;
};

const formularProfit = (funds, sellPrice, buyPrice) => {
  return funds * changePercentage(sellPrice, buyPrice);
};

const calculateProfit = (data, funds) => {
  return data.reduce((previousValue, currentValue) => {
    const sellPrice = currentValue.sell.close;
    const buyPrice = currentValue.buy.close;
    const profit = formularProfit(funds, sellPrice, buyPrice);
    return previousValue + profit;
  }, 0);
};

const getLast3Candles = (threeCandles) => {
  const greens3Candles = threeCandles.greens;
  const reds3Candles = threeCandles.reds;
  let last3Candles;
  if (greens3Candles.length && !reds3Candles.length) {
    last3Candles = greens3Candles[greens3Candles.length - 1];
  } else if (!greens3Candles.length && reds3Candles.length) {
    last3Candles = reds3Candles[reds3Candles.length - 1];
  } else {
    const lastGreend3Candles = greens3Candles[greens3Candles.length - 1];
    const lastRed3Candles = reds3Candles[reds3Candles.length - 1];
    last3Candles =
      lastGreend3Candles.closeTime > lastRed3Candles.closeTime
        ? lastGreend3Candles
        : lastRed3Candles;
  }

  return last3Candles;
};

const TradeSpot = ({
  threeCandles,
  lastCandle,
  targetPercentage,
  funds,
  pairToken,
}) => {
  const [buyCouldGetProfit, setBuyCouldGetProfit] = useState([]);
  const [buyCouldGetProfitValue, setBuyCouldGetProfitValue] = useState(0);
  const [tradeStore, setTradeStore] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("trade")) {
      setTradeStore(JSON.parse(localStorage.getItem("trade")));
    }
  }, []);

  // get api history, update status for tradeStore

  useEffect(() => {
    // tool trade
    if (threeCandles) {
      const last3Candles = getLast3Candles(threeCandles);
      const isLast3RedCandle = last3Candles.open > last3Candles.close;

      // buy if curent candle is next to last 3 red candles
      if (lastCandle[0] - last3Candles.closeTime > 1) {
        return true;
      }

      const tradeStoreWithPairToken = tradeStore.filter((t) => {
        return t.pairToken === pairToken;
      });

      if (tradeStoreWithPairToken.length) {
        const dataHistory = tradeStoreWithPairToken[0].data;
        const lastTrade = dataHistory[dataHistory.length - 1];
        if (lastTrade.status === "success") {
          const chPercentage = changePercentage(
            last3Candles.close,
            lastTrade.price
          );
          if (
            lastTrade.type === "buy" &&
            !isLast3RedCandle &&
            chPercentage > targetPercentage &&
            chPercentage > binanceFees.spot.taker
          ) {
            const newTrade = {
              type: "sell",
              status: "success",
              price: last3Candles.close,
            };

            tradeStoreWithPairToken[0].data.push(newTrade);
            setTradeStore((oldTradeStore) => {
              const newTradeStore = _.merge(
                oldTradeStore,
                tradeStoreWithPairToken
              );
              localStorage.setItem("trade", JSON.stringify(newTradeStore));
              return newTradeStore;
            });
            // sell
          } else if (lastTrade.type === "sell" && isLast3RedCandle) {
            // buy
            const newTrade = {
              type: "buy",
              status: "success",
              price: last3Candles.close,
            };

            tradeStoreWithPairToken[0].data.push(newTrade);
            setTradeStore((oldTradeStore) => {
              const newTradeStore = _.merge(
                oldTradeStore,
                tradeStoreWithPairToken
              );
              localStorage.setItem("trade", JSON.stringify(newTradeStore));
              return newTradeStore;
            });
          }
        }
      } else if (last3Candles.open > last3Candles.close) {
        const newTradeWithPair = [
          {
            pairToken: pairToken,
            funds: {
              token: funds,
              quoteToken: funds * last3Candles.close,
            },
            result: {
              token: 0,
              quoteToken: 0,
            },
            data: [
              {
                type: "buy",
                status: "success",
                price: last3Candles.close,
              },
            ],
          },
        ];
        setTradeStore((oldTradeStore) => {
          const newTradeStore = oldTradeStore.concat(newTradeWithPair);
          localStorage.setItem("trade", JSON.stringify(newTradeStore));
          return newTradeStore;
        });
      }
    }
  }, [threeCandles, pairToken, lastCandle]);

  useEffect(() => {
    // history analysis
    if (threeCandles) {
      setBuyCouldGetProfitValue(0);
      const results = [];

      threeCandles.reds.forEach((buy) => {
        const couldSell = threeCandles.greens.filter((sell) => {
          const profitPercentage = changePercentage(sell.close, buy.close);
          return (
            buy.openTime < sell.openTime &&
            buy.close < sell.close &&
            profitPercentage >= targetPercentage
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
    }
  }, [threeCandles]);

  useEffect(() => {
    if (buyCouldGetProfit.length) {
      setBuyCouldGetProfitValue(
        calculateProfit(buyCouldGetProfit, funds).toFixed(3)
      );
    }
  }, [buyCouldGetProfit]);

  return (
    <>
      <h4>Result:</h4>
      <p>
        Could Buy: {threeCandles?.reds?.length} - Buy could get profit -{" "}
        {buyCouldGetProfit.length}
      </p>
      {!!buyCouldGetProfitValue && (
        <p>
          With {funds} will get{" "}
          {numeral(buyCouldGetProfitValue).format(
            `0,0[.]${getZeroDecimal(buyCouldGetProfitValue)}`
          )}
        </p>
      )}
    </>
  );
};

export default TradeSpot;
