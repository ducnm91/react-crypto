import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";
import "./detail.scss";
import RepositoryFactory from "../../repositories/RepositoryFactory";
import { Container, Tab, Tabs } from "react-bootstrap";
import Research from "../../components/Coin/Research";
import MediaLink from "../../components/Coin/MediaLink";
import Chart from "../../components/Coin/Chart";

const CoingeckoRepository = RepositoryFactory.get("coingecko");

const Coin = () => {
  const params = useParams(); 

  const [tokenInfo, setTokenInfo] = useState();

  useEffect(() => {
    CoingeckoRepository.getCoinInfo(params.id).then((res) => {
      setTokenInfo(res.data);
    });
  }, [params]);

  return (
    <>
      <Chart symbol={tokenInfo?.symbol} />
      <Container>
        {/* <p>SMA(7) - blue; SMA(25) - black; SMA(99) - green</p>
        <p>EMA(7) - orange; EMA(25) - purple; EMA(99) - pink</p>
        <p>WMA(7) - yellow; WMA(25) - dark blue; WMA(99) - pink</p>
        <ul>
          <li>
            Đường SMA (hay Simple Moving Average - xanh blue) là đường trung
            bình động đơn giản được tính bằng trung bình cộng các mức giá đóng
            cửa trong một khoảng thời gian giao dịch nhất định.
          </li>
          <li>
            Đường EMA (hay Exponential Moving Average - đen) là đường trung bình
            lũy thừa được tính bằng công thức hàm mũ, trong đó đặt nặng các biến
            động giá gần nhất. Do đó, EMA khá nhạy cảm với các biến động ngắn
            hạn, nhận biết các tín hiệu bất thường nhanh hơn đường SMA giúp nhà
            đầu tư phản ứng nhanh hơn trước các biến động giá ngắn hạn.
          </li>
          <li>
            Đường WMA (hay Weighted Moving Average - xanh green) là đường trung
            bình tỉ trọng tuyến tính, nó sẽ chú trọng các tham số có tần suất
            xuất hiện cao nhất. Nghĩa là đường trung bình trọng số WMA sẽ đặt
            nặng các bước giá có khối lượng giao dịch lớn, quan tâm đến yếu tố
            chất lượng của dòng tiền.
          </li>
          <li>
            RSI là chỉ báo động lượng đo lường các thay đổi về giá của một tài
            sản trong các giai đoạn thời gian lấy con số 14 (14 ngày theo đồ thị
            hàng ngày, 14 giờ theo biểu đồ hàng giờ, v.v.). Chỉ số được xác định
            bằng cách chia trung bình giá tăng cho trung bình giá giảm trong
            khoảng thời gian tính và sau đó biểu diễn chỉ số này trên thang điểm
            được đặt từ 0 đến 100. Nó đánh giá giá tài sản trên thang điểm từ 0
            đến 100 trong các giai đoạn thời gian lấy con số 14. Khi RSI có điểm
            nằm dưới mức 30, nó cho biết giá tài sản có thể gần chạm đáy (quá
            bán); nếu RSI có điểm nằm trên mức 70, nó cho biết giá tài sản gần
            mức đỉnh (quá mua) trong khoảng thời gian đó và có khả năng sẽ giảm.
          </li>
        </ul>
        <MediaLink tokenInfo={tokenInfo} />
        <p dangerouslySetInnerHTML={{ __html: tokenInfo?.description?.en }}></p>
        <Research symbol={tokenInfo?.symbol} /> */}
        <Tabs
          defaultActiveKey="position"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="position" title="Positions">
            Vị thế
          </Tab>
          <Tab eventKey="openOrder" title="Open orders">
            Các lệnh đang mở
          </Tab>
        </Tabs>
      </Container>

    </>
  );
};

export default Coin;
