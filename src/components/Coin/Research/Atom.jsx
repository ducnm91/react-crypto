import React from "react";
import { Image } from "react-bootstrap";
import cosmosNetwork from "../../../images/research/Cosmos-ATOM.png";

const Atom = () => {
  return (
    <>
      <h2>Cosmos Network (ATOM) là gì?</h2>
      <p>
        Cosmos, hay Cosmos Network, là một Blockchain nền tảng với cơ chế đồng
        thuận Tendermint. Khác với cách suy nghĩ thông thường như Solana, Terra,
        Binance Smart Chain,... đó là Blockchain nền tảng sẽ có các ứng dụng
        được xây ở trên, thì Cosmos có thể xem như "Layer 0", ở trên sẽ là rất
        nhiều Layer 1.
      </p>
      <p>
        Tầm nhìn của dự án là “Internet of Blockchains” tạo ra một thế giới mà
        các Layer 1 liên kết với nhau thông qua cầu nối có tên là IBC (Internet
        Blockchain Communication).
      </p>
      <h2>Điểm nổi bật của Cosmos</h2>
      <p>
        Rất nhiều nền tảng ra đời chỉ để giải quyết vấn đề tắc nghẽn của
        Ethereum. Điều này vô tình gây ra sự phân mảnh thanh khoản, hay tệ hơn
        là làm cho người dùng bị bối rối khi không biết chuyển tài sản từ chain
        này sang chain khác bằng cách nào. Do đó, Cosmos không chỉ giải quyết
        vấn đề phí giao dịch, mà còn làm đơn giản hóa trải nghiệm người dùng khi
        các Layer 1 (gọi là các Zone hoặc Hub, được xây dựng dựa trên Cosmos SDK
        - framework xây dựng Blockchain của Cosmos) trên Cosmos sẽ tương tác
        thông qua cầu nối IBC.
      </p>
      <Image src={cosmosNetwork} fluid />
      <h2>Roadmap</h2>
      <p>
        Trong năm 2022, một số cập nhật quan trọng được team giới thiệu đến cộng
        đồng, đó là Interchain Security, Interchain Account, Liquid Staking.
        Ngoài ra, theo như CEO của Cosmos, năm 2022 sẽ là một năm bùng nổ của
        Cosmos với hơn 200 Layer 1.
      </p>
    </>
  );
};

export default Atom;
