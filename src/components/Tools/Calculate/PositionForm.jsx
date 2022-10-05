import React, { useEffect, useState } from "react";

const PositionForm = (props) => {
  const [price, setPrice] = useState();
  const [volume, setVolume] = useState('');
  const [leverage, setLeverage] = useState(10);

  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  }

  const handleChangeVolume = (event) => {
    setVolume(event.target.value);
  }

  const handleChangeLeverage = (event) => {
    setLeverage(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addPosition({
      price,
      volume,
      leverage
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="" className="form-label">Price</label>
        <input type="text" className="form-control" value={price} onChange={handleChangePrice} />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="" className="form-label">Volume</label>
        <input type="text" className="form-control" value={volume} onChange={handleChangeVolume} />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="" className="form-label">Đòn bẩy</label>
        <select className="form-control" value={leverage} onChange={handleChangeLeverage}>
          <option value="5">5x</option>
          <option value="10">10x</option>
          <option value="15">15x</option>
          <option value="20">20x</option>
        </select>
      </div>
      <button className="btn btn-primary">Add position</button>
    </form>
  )
}

export default PositionForm;