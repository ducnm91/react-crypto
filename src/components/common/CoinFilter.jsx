import React, { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import numeral from "numeral";
import { getZeroDecimal } from "../../utils/formatNumber";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Select from "react-select";
import RepositoryFactory from "../../repositories/RepositoryFactory";
import { Row, Col, Form } from "react-bootstrap";

import { orderByList, getByList } from "../../config/coins";
import { useAppSelector } from "../../state/hooks";
import { selectCoin } from "../../state/coin/coinSlice";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const CoingeckoRepository = RepositoryFactory.get("coingecko");

const CoinFilter = (props) => {
  const coins = useAppSelector(selectCoin);

  const [platforms, setPlatforms] = useState([]);
  const [platform, setPlatform] = useState();
  const [currentToken, setCurrentToken] = useState();
  const [getBy, setGetBy] = useState(getByList[0]);
  const [orderBy, setOrderBy] = useState();
  const [volumeRange, setVolumeRange] = useState()
  const [isSupportLoan, setIsSupportLoan] = useState(false)

  const coinsToSearch = useMemo(() => {
    return coins.map((coin) => {
      return {
        value: coin.id,
        label: coin.symbol,
      };
    });
  }, [coins]);

  const minVolume = useMemo(() => {
    if (coins.length) {
      return _.minBy(coins, "total_volume").total_volume;
    }
    return 0;
  }, [coins]);

  const maxVolume = useMemo(() => {
    if (coins.length) {
      return _.maxBy(coins, "total_volume").total_volume;
    }
    return 0;
  }, [coins]);

  useEffect(() => {
    CoingeckoRepository.getCategories().then((res) => {
      setPlatforms(
        res.data.map((platform) => {
          return {
            value: platform.id,
            label: platform.name,
          };
        })
      );
    });
  }, []);

  useEffect(() => {
    props.changeFilter({
      platform: platform?.value,
      orderBy: orderBy?.value,
      getBy: getBy?.value,
      idToken: currentToken?.value,
      volume: volumeRange,
      isSupportLoan
    });
  }, [platform, orderBy, getBy, currentToken, volumeRange, isSupportLoan]);

  const changeSelectToken = (option) => {
    if (option) {
      setCurrentToken(option);
    } else {
      setCurrentToken("");
    }
  };

  const changeSelectPlatform = (option) => {
    if (option) {
      setPlatform(option);
    } else {
      setPlatform("");
    }
  };

  const changeSelectOrderBy = (option) => {
    if (option) {
      setOrderBy(option);
    } else {
      setOrderBy("")
    }
  };

  const changeSelectGetBy = (option) => {
    if (option) {
      setGetBy(option);
    }
  };

  const formatTooltip = (value) => {
    return numeral(value).format('$0,0[.]00 a')
  };

  const changeFilterVolume = (value) => {
    setVolumeRange({min: value[0], max: value[1]})
  }

  const changeSupportLoan = (event) => {
    setIsSupportLoan(event.target.checked)
  }

  return (
    <>
      <h3>Get by:</h3>
      <Row className="filter mb-4 align-items-center">
        <Col lg={2}>
          <Select
            options={getByList}
            defaultValue={[getByList[0]]}
            value={getBy}
            onChange={changeSelectGetBy}
          />
        </Col>
        <Col lg={2}>
          <Select
            options={platforms}
            onChange={changeSelectPlatform}
            isClearable
          />
        </Col>
      </Row>
      <h3>Filter By:</h3>
      <Row className="filter mb-4 align-items-center">
        <Col lg={2}>
          <Select
            options={coinsToSearch}
            onChange={changeSelectToken}
            isClearable
          />
        </Col>
        <Col lg={2}>
          <Select
            options={orderByList}
            onChange={changeSelectOrderBy}
            isClearable
          />
        </Col>
        <Col lg={2}>
          { minVolume && <p className="d-flex justify-content-between">
            <span>{volumeRange?.min ? numeral(volumeRange.min).format('$0,0[.]00 a') : numeral(minVolume).format('$0,0[.]00 a')}</span>-
            <span>{volumeRange?.max ? numeral(volumeRange.max).format('$0,0[.]00 a') : numeral(maxVolume).format('$0,0[.]00 a')}</span>
          </p> }

          {maxVolume && (
            <Range
              min={minVolume}
              max={maxVolume}
              defaultValue={[minVolume, maxVolume]}
              tipFormatter={formatTooltip}
              onAfterChange={changeFilterVolume}
            />
          )}
        </Col>
        <Col lg={2}>
          <Form.Check 
            type='checkbox'
            id='is-support-loan'
            label='Support loan'
            checked={isSupportLoan}
            onChange={changeSupportLoan}
          />  
        </Col>
      </Row>
    </>
  );
};

export default CoinFilter;
