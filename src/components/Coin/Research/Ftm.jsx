import React from "react";
import { Image } from "react-bootstrap";
import ecosystem from "../../../images/research/fantom-ecosystem.jpg";

const Ftm = () => {
  return (
    <>
      <h2>Fantom là gì?</h2>
      <p>
        Fantom là một nền tảng sử dụng công nghệ sổ cái phân tán, cho phép xây
        dựng các dApps cải tiến các vấn đề về mở rộng mạng lưới mà các nền tảng
        Blockchain hiện nay đang gặp phải. Về mặt bản chất, Fantom sử dụng cấu
        trúc DAG, đây không phải là Blockchain nhưng cùng sổ cái phân tán.
      </p>
      <h2>Hệ sinh thái Fantom</h2>
      <p>
        Fantom giờ đây đã trở thành một hệ sinh thái giống như Solana, Binance
        Smart Chain,… nhưng với quy mô nhỏ hơn. Tương tự Kava, Fantom cũng tạo
        riêng cho mình các tính năng DeFi cơ bản và tích hợp vào ví Fantom, đó
        là: Liquid Staking, fMint, fLend, fTrade.
      </p>
      <p>
        Hệ sinh thái Fantom không chỉ có một mình Blockchain Fantom, mà còn có
        gần 100 dự án.
      </p>
      <Image src={ecosystem} fluid />

      <h2>Đội ngũ dự án</h2>
      <p>
        Thành viên nổi bật nhất trong team có lẽ là <a href="https://coin98.net/andre-cronje">Andre Cronje</a> - nhân vật cực
        kỳ nổi tiếng trong giới Crypto, đồng thời là Founder của cả hệ sinh thái
        nổi tiếng bật nhất DeFi: <a href="https://coin98.net/yearn-finance-yfi">Yearn Finance</a>.
      </p>
    </>
  );
};

export default Ftm;
