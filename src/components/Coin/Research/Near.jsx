import React from "react";
import { Image } from "react-bootstrap";
import investor from "../../../images/research/nha-dau-tu-near.jpg";
import ecosystem from "../../../images/research/ecosystem-near.png"

const Near = () => {
  return (
    <>
      <h2>NEAR Protocol là gì?</h2>
      <p>
        NEAR Protocol là một blockchain hoạt động theo cơ chế Public Proof of
        Stake và Sharded (phân đoạn). Đây giống như một nền tảng đám mây do cộng
        đồng điều hành, có khả năng mở rộng cao và chi phí thấp dành cho các nhà
        phát triển để tạo ra các ứng dụng phi tập trung dễ dàng.
      </p>
      <p>
        Dự án đã chính thức ra mắt mainnet vào tháng 5/2020, trở thành đối thủ
        đáng gờm của Ethereum 2.0. NEAR là một trong những cái tên mới nổi tự
        tin khẳng định hiệu quả hơn và ít tốn kém hơn gấp nhiều lần. Đặc biệt,
        với chi phí thấp hơn gấp 10.000 lần so với Ethereum và khả năng mở rộng
        đáng kinh ngạc, cái mà Ethereum đang phải loay hoay trăn trở.
      </p>
      <p>
        NEAR đủ an toàn để quản lý các tài sản có giá trị cao như tiền bạc hoặc
        danh tính và đủ hiệu suất để làm cho chúng hữu ích, đặc biệt là sức mạnh
        của Open Web vào tay người dùng.
      </p>
      <p>
        Và 1 điều cần lưu ý, NEAR không phải là side chain, càng không phải là
        ERC20 token hay một blockchain chuyên biệt, mà chỉ đơn giản là giao thức
        1 lớp (1 layer) được thiết kế để độc lập hỗ trợ cho nền tảng Open Web.
      </p>
      <h2>Nhà đầu tư (Investor)</h2>
      <Image src={investor} fluid />
      <h2>Ecosystem</h2>
      <Image src={ecosystem} fluid />
      <h3>Lending & Borrowing</h3>
      <p>Đây là mảnh ghép quan trọng bậc nhất đối với hệ sinh thái DeFi trên tất cả các nền tảng, nhưng trên NEAR Protocol thì mới chỉ Oin Finance (Stablecoin thế chấp vượt mức) là dApp đầu tiên thuộc mảng này.</p>
      <p>Ngoài ra, các dự án Lending sắp ra mắt trong thời gian gần (tháng 1/2022) bao gồm: Burrow Cash (lending trên Near), Aurigami (lending trên Aurora). Đây là mảng quan trọng trong bất cứ hệ sinh thái nào để giúp độ tận dụng vốn trong hệ được nâng cao, cũng như đưa marketcap lớn của NEAR vào TVL trong hệ.</p>
    </>
  );
};

export default Near;
