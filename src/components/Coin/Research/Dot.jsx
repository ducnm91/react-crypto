import React from "react";
import { Image } from "react-bootstrap";
import ecosystem from "../../../images/research/solana-ecosystem.jpg";

const Dot = () => {
  return (
    <>
      <h2>Polkadot là gì?</h2>
      <p>
        Polkadot là một nền tảng Blockchain, hay cụ thể là một công nghệ đa
        chuỗi (multi-chain), không đồng nhất và có khả năng mở rộng cao.
        Polkadot cho phép các Blockchain kết nối với nhau để chia sẻ dữ liệu và
        tạo thành một mạng lưới phi tập trung.
      </p>
      <p>
        Tầm nhìn của Polkadot là tạo ra một “Decentralized Web - Mạng phi tập
        trung”, nơi mà danh tính và dữ liệu của chúng ta sẽ được kiểm soát bởi
        chính chúng ta, chứ không phải bởi một bên thứ 3 như tổ chức hay chính
        phủ nào đó.
      </p>
      <h2>Ai đang chịu trách nhiệm xây dựng Polkadot?</h2>
      <p>
        Về cơ bản, Polkadot là một dự án mã nguồn mở và bất cứ ai cũng có thể tự
        do đóng góp cho sự phát triển của nền tảng. Ngoài cộng đồng mã nguồn mở,
        thì đứng đằng sau Polkadot là Web3 Foundation - một trong những tổ chức
        hàng đầu trong không gian Crypto. Web3 Foundation đóng góp về mặt tài
        chính tài chính lẫn công nghệ cho Polkadot.
      </p>
      <h2>Polkadot hoạt động như thế nào?</h2>
      <p>Tương tự như Cosmos Network, Polkadot tập trung giải quyết hai vấn đề chính của Blockchain đó là: Khả năng tương tác, Khả năng mở rộng của mạng lưới và Adoption</p>
      <Image src={ecosystem} fluid />
    </>
  );
};

export default Dot;
