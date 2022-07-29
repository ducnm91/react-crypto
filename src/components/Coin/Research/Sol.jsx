import React from "react";
import { Image } from "react-bootstrap";
import ecosystem from "../../../images/research/solana-ecosystem.jpg";

const Sol = () => {
  return (
    <>
      <h2>Solana là gì?</h2>
      <p>
        Solana là nền tảng blockchain mã nguồn mở có hiệu suất cao với khả năng
        mở rộng lên đến 700,000 TPS (Transactions Per Second - số lượng giao
        dịch xử lý trong mỗi giây) và thời gian khối 400ms. Solana không cần áp
        dụng các giải pháp phức tạp như Sharding (phân mảnh cơ sở dữ liệu) hay
        Layer 2.
      </p>
      <p>
        CEO của sàn giao dịch FTX - Sam Bankman Fried gọi Solana là một nền tảng
        tuyệt vời và khẳng định “nó nhanh hơn 10,000 lần và rẻ hơn 1,000,000 lần
        so với Ethereum”.
      </p>
      <h2>Hệ sinh thái Terra</h2>
      <Image src={ecosystem} fluid />
    </>
  );
};

export default Sol;
