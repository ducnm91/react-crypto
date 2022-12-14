import React, { useState, useEffect } from "react";
import Figure from "react-bootstrap/Figure";
import "./style.scss";

import { useAppDispatch } from "../../state/hooks";

import { setBaseToken } from "../../state/coin/coinSlice";

import { binanceCoins, stableCoins } from "../../config/coins";

import RepositoryFactory from "../../repositories/RepositoryFactory";
const CoingeckoRepository = RepositoryFactory.get("coingecko");

function Trending() {
  const [coinsTrending, setCoinsTrending] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    CoingeckoRepository.getListTrending().then((res) => {
      setCoinsTrending(
        res.data.coins.filter(
          (coin) => {
            return binanceCoins.indexOf(coin.item.symbol.toLowerCase()) >= 0 &&
                  stableCoins.indexOf(coin.item.symbol.toLowerCase()) < 0
          }
        )
      );
    });
  }, []);

  return (
    <>
      {!!coinsTrending.length && (
        <>
          <h3>Coins Trending</h3>
          <div className="coins-trending">
            {coinsTrending.map((coin) => (
              <Figure
                key={coin.item.coin_id}
                onClick={() => dispatch(setBaseToken({id: coin.item.id, symbol: coin.item.symbol}))}
              >
                <Figure.Image
                  width={25}
                  height={25}
                  alt={coin.item.name}
                  src={coin.item.thumb}
                />
                <Figure.Caption>
                  <h6>
                    {coin.item.symbol} - {coin.item.name}
                  </h6>
                  <p className="mb-0">
                    Market cap rank: {coin.item.market_cap_rank}
                  </p>
                </Figure.Caption>
              </Figure>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Trending;
