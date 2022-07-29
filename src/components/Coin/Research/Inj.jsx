import React from "react";
import { Image } from "react-bootstrap";
import injectiveHub from "../../../images/research/injective-hub.jpeg";
import roadMap from "../../../images/research/injective-protocol-mainnet.jpg";
import investor from "../../../images/research/nha-dau-tu-injective.jpg";

const Inj = () => {
  return (
    <>
      <h2>Injective là gì?</h2>
      <p>
        Injective là một giao thức Cross-chain chuỗi chéo được xây dựng cho các
        ứng dụng tài chính, với Blockchain được gọi là Injective Chain. Trên đó
        sẽ có rất nhiều ứng dụng, một trong số đó là sàn giao dịch của
        Injective, đóng vai trò là nơi giao dịch sản phẩm spot, phái sinh, tương
        tự như phiên bản trước.
      </p>
      <h2>Điểm nổi bật của Injective</h2>
      <p>
        Với việc xây dựng riêng cho mình một Blockchain, Injective đang có mục
        tiêu lớn hơn là sàn giao dịch thông thường. Trên Blockchain này, dev có
        thể xây dựng các ứng dụng phi tập trung, và sau đó sẽ là một hệ sinh
        thái tương tự cách mà Solana, Terra, Binance Smart Chain,… đang phát
        triển.
      </p>
      <p>
        Đây là một xu hướng phát triển tất yếu, khi rất nhiều hệ sinh thái ra
        đời và rất thành công, một phần là do giải quyết được bài toán không thể
        mở rộng của Ethereum.
      </p>
      <p>
        Các Blockchain trên dù có đạt được các thành tựu nhất định, nhưng cũng
        không thể phủ nhận hệ sinh thái không thể nào bằng Ethereum. Ngoài ra,
        các Blockchain này đang xây dựng theo kiểu One-size-fits-all, nghĩa là
        trên đó sẽ có mọi thứ, một điều rất khó để có thể đạt được.
      </p>
      <p>
        Injective Chain được tạo ra để tương thích với Ethereum và Cross-chain,
        điều này sẽ giúp tập hợp người dùng trên các mạng blockchain riêng biệt
        thành một cộng đồng tiền điện tử thống nhất.
      </p>

      <Image src={injectiveHub} fluid />
      <p>
        Ngoài ra, Injective Chain thuộc hệ sinh thái Cosmos, do đó, sau khi tích
        hợp thành công với IBC thì Injective Chain sẽ có thể trao đổi lưu thông
        với các Blockchain khác trong Cosmos, có thể kể đến như Akash,
        Crypto.com, Osmosis,…
      </p>
      <h2>Roadmap & Updates</h2>
      <p>
        Injective đã hoàn thành Phase 1 vào tháng 6/2021. Hiện tại, dự án đang ở
        Phase 2 trong quá trình Mainnet.
      </p>
      <Image src={roadMap} fluid />
      <p>
        Cột mốc tiếp theo của Mainnet là sự ra mắt của Canary Chain Spot Trading
        cùng với một số tài sản giao dịch ban đầu bao gồm: INJ, SUSHI, LINK,
        USDT, USDC, AAVE,…
      </p>
      <p>Trong tương lai, nhiều thị trường sẽ được bổ sung vào thông qua quản trị.</p>
      <h2>Nhà đầu tư</h2>
      <Image src={investor} fluid />
    </>
  );
};

export default Inj;
