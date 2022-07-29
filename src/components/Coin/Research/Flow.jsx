import React from "react";
import { Image, Alert } from "react-bootstrap";
import investor from "../../../images/research/investor-flow.jpg";
import partner from "../../../images/research/doi-tac-flow.jpg";
import ecosystem from "../../../images/research/flow-ecosystem.jpg";

const Flow = () => {
  return (
    <>
      <h2>Flow là gì?</h2>
      <p>
        Flow là một nền tảng hợp đồng thông minh (Smart Contract), được phát
        triển dựa trên một kiến trúc mới cho phép xử lý giao dịch nhanh, rẻ và
        thân thiện hơn với các nhà phát triển. Flow được xây dựng bởi Dapper
        Labs, team phát triển CryptoKitties - một trò chơi nuôi thú ảo trên
        Blockchain.
      </p>
      <p>
        Ngay từ ban đầu, Flow tập trung nhắm vào mảng Dapps Games (Game phi tập
        trung), collectibles (bộ sưu tầm) và các ứng dụng tương tác với chúng.
      </p>
      <h2>Flow có điểm gì nổi bật?</h2>
      <p>
        Điểm nổi bật chính của Flow là kiến trúc đa tầng của Flow. Trong đa số
        các Blockchain, các Node trong trình xác thực (Validation) đều lưu trữ
        toàn bộ thông tin (account balances, Smart Contract Code,...) và thực
        hiện tất cả các công việc liên quan đến xử lý giao dịch trên chuỗi. Tuy
        nhiên với Flow thì khác, họ tách các nhiệm vụ kia thành 4 vai trò:
      </p>
      <ul>
        <li>Collection: Các node thu thập tăng hiệu quả.</li>
        <li>Consensus: Các node đồng thuận đảm bảo phân cấp.</li>
        <li>Execution: Các node thực thi cho phép tốc độ và quy mô.</li>
        <li>Verification: Các node xác minh đảm bảo tính đúng đắn.</li>
      </ul>

      <h2>Ecosystem</h2>
      <Image src={ecosystem} fluid />
      <h3>Dex</h3>
      <p>
        BloctoSwap là sàn DEX duy nhất đã ra sản phẩm và đã chạy beta trên Flow.
        Tuy là sàn DEX duy nhất, nhưng thanh khoản và volume của AMM DEX này còn
        rất bé: volume 24h chỉ đạt 250,000 đô. Chứng tỏ, đây mới chỉ là giai
        đoạn sơ khởi của các sàn DEX trên hệ sinh thái Flow.
      </p>
      <h3>Lending</h3>
      <p>Chưa dự án nào đi vào hoạt động</p>
      <h3>Stablecoin</h3>
      <p>
        Các stablecoin trên hệ Flow đều chưa có số lượng lớn. Marketcap các
        token này trên hệ Flow vẫn đang ở con số rất thấp, có lẽ bởi chưa có
        nhiều Dapp sử dụng các token stablecoin này làm phương tiện thanh toán.
      </p>
      <h2>Nhà đầu tư</h2>
      <Image src={investor} fluid />
      <h2>Đối tác</h2>
      <Image src={partner} fluid />
      <Alert variant='warning'>
        Nền tảng chưa có nhiều dự án chạy thật suy ra chưa có tính ứng dụng cao. giá tăng có thể do bơm thổi
      </Alert>
    </>
  );
};

export default Flow;
