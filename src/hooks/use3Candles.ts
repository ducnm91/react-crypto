import { useState, useEffect } from 'react';

interface Candle {
  open: number
  close: number
  openTime: number
  closeTime: number
}

interface ThreeCandles {
  changePercent: number
  open: number
  close: number
  openTime: number
  closeTime: number
  data: Candle[]
}

interface Result {
  greens: ThreeCandles[]
  reds: ThreeCandles[]
}

const use3Candles = (chartData: any) => {
  const [result, setResult] = useState<Result | null>(null);
  const [ dataAnalysis, setDataAnalysis ] = useState([])
  useEffect(() => {
    if(chartData.length) {
      setDataAnalysis(chartData.slice(0, chartData.length - 1))
    }
  }, [chartData])
  useEffect(() => {
    if (dataAnalysis.length) {
      const itemDetected: Result = {
        greens: [],
        reds: [],
      };
      const itemsRed: Candle[] = [];
      const itemsGreen: Candle[] = [];
      dataAnalysis.forEach((candle: any, index: number) => {
        const currentCandle = {
          open: candle[1],
          high: candle[2],
          low: candle[3],
          close: candle[4],
          openTime: candle[0],
          closeTime: candle[6]
        };

        if (currentCandle.open === currentCandle.close) {
          return true;
        }

        const isRedCurrentCandle = currentCandle.open > currentCandle.close;

        if (!itemsRed.length && !itemsGreen.length) {
          if (isRedCurrentCandle) {
            itemsRed.push(currentCandle);
          } else {
            itemsGreen.push(currentCandle);
          }
        } else {
          const isPrevCandle = itemsRed.length ? itemsRed[itemsRed.length - 1] : itemsGreen[itemsGreen.length - 1]
          const isRedPrevCandle = isPrevCandle.open > isPrevCandle.close;

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

        if (itemsRed.length > 1 && itemsRed[0].open > itemsRed[itemsRed.length - 1].close) {
          const tmp = [...itemsRed];
          const changePercent =
            (tmp[0].open - tmp[tmp.length - 1].close) / tmp[0].open;
          itemDetected.reds.push({
            changePercent,
            open: tmp[0].open,
            close: tmp[tmp.length - 1].close,
            openTime: tmp[0].openTime,
            closeTime: tmp[tmp.length - 1].closeTime,
            data: tmp,
          });
        }
        if (itemsGreen.length > 1 && itemsGreen[0].open < itemsGreen[itemsGreen.length - 1].close) {
          const tmp = [...itemsGreen];
          const changePercent =
            (tmp[tmp.length - 1].close - tmp[0].open) / tmp[0].open;
          itemDetected.greens.push({
            changePercent,
            open: tmp[0].open,
            close: tmp[tmp.length - 1].close,
            openTime: tmp[0].openTime,
            closeTime: tmp[tmp.length - 1].closeTime,
            data: tmp,
          });
        }
      });

      setResult(itemDetected)
    }
  }, [dataAnalysis]);

  return result;
}

export default use3Candles;