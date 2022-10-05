import React, { useEffect, useState } from "react";
import _ from "lodash";
import "./index.scss";

import PositionForm from "./PositionForm";

const types = {
  short: "SHORT",
  long: "LONG",
};

const typesMargin = {
  cross: "CROSS",
  isolated: "ISOLATED"
}

const lables = {
  takeProfit: "Take Profit",
  stopLoss: "Stop Loss",
};

const totalMultipler = (multiplers) => multiplers.reduce(
  (previousValue, currentValue) => _.add(previousValue, currentValue)
)

const Position = (props) => {
  const positionPercent = _.multiply(_.divide(10, props.number.length - 1), 10);
  const listItems = props.number.map((number, index) => {
    let position;
    if (index === 0) {
      if (props.type === types.short) {
        position = { bottom: 0 };
      } else {
        position = { top: 0 };
      }
    } else if (index === props.number.length - 1) {
      if (props.type === types.short) {
        position = { top: 0 };
      } else {
        position = { bottom: 0 };
      }
    } else {
      if (props.type === types.short) {
        position = { bottom: _.multiply(positionPercent, index) + "%" };
      } else {
        position = { top: _.multiply(positionPercent, index) + "%" };
      }
    }
    return (
      <span className="position" key={index} style={{ ...position }}>
        Price: {number} <br /> Volume: {props.volume[index]} USDT
      </span>
    );
  });

  return listItems;
};

const calculatorRange = (initPrice, priceScale, safetyOrders, type) => {
  const priceRangeValue = [];
  let priceDcaValue = 0;
  for (let i = 0; i < safetyOrders; i++) {
    if (i === 0) {
      priceRangeValue.push(initPrice);
      priceDcaValue = initPrice;
    } else {
      let nextPrice;
      if (type === types.short) {
        nextPrice = _.add(
          priceDcaValue,
          _.divide(_.multiply(priceScale, priceDcaValue), 100)
        );
      } else {
        nextPrice = _.subtract(
          priceDcaValue,
          _.divide(_.multiply(priceScale, priceDcaValue), 100)
        );
      }

      priceDcaValue = _.divide(_.add(priceDcaValue, nextPrice), 2);
      priceRangeValue.push(nextPrice);
    }
  }
  return {
    priceDcaValue,
    priceRangeValue,
  };
};

const Calculator = (props) => {
  const [type, setType] = useState(types.short);
  const [typeMargin, setTypeMargin] = useState(typesMargin.cross);
  const [leverage, setLeverage] = useState(20);
  const [initPrice, setInitPrice] = useState(1000);
  const [isDisableInitPrice, setIsDisableInitPrice] = useState(false);
  const [priceScale, setPriceScale] = useState(4);
  const [takeProfitPercent, setTakeProfitPercent] = useState(10);
  const [takeProfitPrice, setTakeProfitPrice] = useState(0);
  const [stopLossPercent, setStopLossPercent] = useState(30);
  const [stopLossPrice, setStopLossPrice] = useState(30);
  const [totalInvestment, setTotalInvestment] = useState(100);
  const [volumeScale, setVolumeScale] = useState(1);
  const [safetyOrders, setSafetyOrders] = useState(2);
  const [priceDca, setPriceDca] = useState(0);
  const [positionDcaPercent, setPositionDcaPercent] = useState(0);
  const [priceRange, setPriceRange] = useState([]);
  const [volumeRange, setVolumeRange] = useState([]);
  const [precision, setPrecision] = useState(2);

  useEffect(() => {
    const { priceDcaValue, priceRangeValue } = calculatorRange(
      initPrice,
      priceScale,
      safetyOrders,
      type
    );
    setPriceDca(priceDcaValue);
    setPriceRange(priceRangeValue);
  }, [initPrice, priceScale, safetyOrders, type]);

  useEffect(() => {
    if (priceDca && stopLossPercent) {
      if (type === types.short) {
        setStopLossPrice(
          _.ceil(_.add(priceDca, _.divide(_.multiply(priceDca, stopLossPercent), 100)), precision)
        );
      } else {
        setStopLossPrice(
          _.ceil(_.subtract(
            priceDca,
            _.divide(_.multiply(priceDca, stopLossPercent), 100)
          ), precision)
        );
      }
    }
  }, [priceDca, stopLossPercent, type, precision]);

  useEffect(() => {
    if (priceDca && takeProfitPercent) {
      if (type === types.short) {
        setTakeProfitPrice(
          _.ceil(_.subtract(
            priceDca,
            _.divide(_.multiply(priceDca, takeProfitPercent), 100)
          ), precision)
          
        );
      } else {
        setTakeProfitPrice(
          _.ceil(_.add(
            priceDca,
            _.divide(_.multiply(priceDca, takeProfitPercent), 100)
          ), precision)
        );
      }
    }
  }, [priceDca, takeProfitPercent, type, precision]);

  useEffect(() => {
    if (priceDca) {
      const percent = _.multiply(_.divide(
        _.subtract(priceDca, priceRange[0]),
        _.subtract(priceRange[priceRange.length - 1], priceRange[0])
      ), 100);

      setPositionDcaPercent(percent);
    }
  }, [priceDca, priceRange]);

  useEffect(() => {
    // multipler x volume = totalInvestment
    let multiplers = [1];
    
    for (let i = 0; i < priceRange.length; i++) {
      if (i > 0) {
        const prev = totalMultipler(multiplers)
        multiplers.push(_.multiply(prev, volumeScale));
      }
    }

    const initVolume = _.divide(_.multiply(totalInvestment, leverage), totalMultipler(multiplers));

    const initVolumes = [];
    for (let i = 0; i < multiplers.length; i++) {
      initVolumes.push(_.multiply(initVolume, multiplers[i]));
    }

    setVolumeRange(initVolumes);
  }, [priceRange, volumeScale, totalInvestment, leverage]);

  useEffect(() => {
    const liqPercent = _.divide(100, leverage);
    setPriceScale(_.multiply(liqPercent, 0.8));
  }, [leverage]);

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleChangeTypeMargin = (event) => {
    setTypeMargin(event.target.value);
  };

  const handleChangeLeverage = (event) => {
    setLeverage(event.target.value);
  };

  const handleChangeTakeProfitPercent = (event) => {
    setTakeProfitPercent(event.target.value);
  };

  const handleChangeStopLossPercent = (event) => {
    setStopLossPercent(event.target.value);
  };

  const handleChangeTotalInvestment = (event) => {
    setTotalInvestment(event.target.value);
  };

  const handleChangeVolumeScale = (event) => {
    setVolumeScale(event.target.value);
  };

  const handleChangeSafetyOrders = (event) => {
    setSafetyOrders(event.target.value);
  };

  const handleChangeInitPrice = (event) => {
    setInitPrice(parseFloat(event.target.value));
  };

  const handleChangePrecision = (event) => {
    setPrecision(event.target.value)
  }

  const handleAddPosition = (formData) => {
    setIsDisableInitPrice(true);
    setInitPrice(formData.initPrice);
    setLeverage(formData.leverage);

  }

  return (
    <div className="Card">
      <div className="card-body">
        <h5 className="card-title text-center">Caculate Volume Future</h5>
        <div className="row">
          <div className="col-lg-5">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="" className="form-label">
                    Type L/S
                  </label>
                  <select
                    name=""
                    id=""
                    className="form-control"
                    value={type}
                    onChange={handleChangeType}
                  >
                    <option value="SHORT">Short</option>
                    <option value="LONG">Long</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="" className="form-label">
                    Type Margin
                  </label>
                  <select
                    name=""
                    id=""
                    className="form-control"
                    value={typeMargin}
                    onChange={handleChangeTypeMargin}
                  >
                    <option value="CROSS">Cross</option>
                    <option value="ISOLATED">Isolated</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="" className="form-label">
                    Đòn bẩy
                  </label>
                  <select
                    className="form-control"
                    value={leverage}
                    onChange={handleChangeLeverage}
                  >
                    <option value="5">5x</option>
                    <option value="10">10x</option>
                    <option value="20">20x</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="" className="form-label">
                    Chốt giá từng phần
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={priceScale}
                      readOnly
                    />
                    <span className="input-group-text">%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="" className="form-label">
                    Tỷ lệ chốt lời
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={takeProfitPercent}
                      onChange={handleChangeTakeProfitPercent}
                    />
                    <span className="input-group-text">%</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="" className="form-label">
                    Tỷ lệ dừng lỗ
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={stopLossPercent}
                      onChange={handleChangeStopLossPercent}
                    />
                    <span className="input-group-text">%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <label htmlFor="" className="form-label">
                    Khoản đầu tư
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={totalInvestment}
                    onChange={handleChangeTotalInvestment}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <label htmlFor="" className="form-label">
                    Hệ số
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={volumeScale}
                    onChange={handleChangeVolumeScale}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <label htmlFor="" className="form-label">
                    Số lệnh DCA
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={safetyOrders}
                    onChange={handleChangeSafetyOrders}
                  />
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-12">
                <label htmlFor="" className="form-label">
                  Nhập giá kích hoạt hoặc vị thế hiện tại
                </label>
              </div>
              <div className="col-md-6">
                <label htmlFor="" className="form-label">
                  Init price
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={initPrice}
                  onChange={handleChangeInitPrice}
                />
              </div>
              <div className="col-md-6">
                <PositionForm />
              </div>
            </div>
            
            
            <div className="form-group mb-3">
              <label htmlFor="" className="form-label">
                Số chữ số thập phân
              </label>
              <input
                type="number"
                className="form-control"
                value={precision}
                onChange={handleChangePrecision}
              />
            </div>
          </div>
          <div className="col-lg-7 d-flex justify-content-center">
            <div className="emulator">
              <span className="position position--up">
                {type === types.short ? lables.stopLoss : lables.takeProfit} :{" "}
                {type === types.short ? stopLossPrice : takeProfitPrice}
              </span>
              <div className="ranks">
                <span
                  className="position position--dca"
                  style={
                    type === types.short
                      ? { bottom: positionDcaPercent + "%" }
                      : { top: positionDcaPercent + "%" }
                  }
                >
                  Price Dca: {priceDca}
                </span>
                <Position
                  number={priceRange}
                  volume={volumeRange}
                  type={type}
                />
              </div>
              <span className="position position--bottom">
                {type === types.short ? lables.takeProfit : lables.stopLoss} :{" "}
                {type === types.short ? takeProfitPrice : stopLossPrice}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
