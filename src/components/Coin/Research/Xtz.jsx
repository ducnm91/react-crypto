import React from "react";
import { Image } from "react-bootstrap";
import ecosystem from "../../../images/research/solana-ecosystem.jpg";

const Xtz = () => {
  return (
    <>
      <h2>Tezos là gì?</h2>

      <p>
        Tezos là Blockchain nền tảng với các tính năng chính tương tự như
        Ethereum. Tuy nhiên, Tezos còn có các tính năng nổi bật khác như:
        Onchain Governance, Self-Amendment (tự sửa đổi). Mục tiêu của dự án là
        trở thành nền tảng hợp đồng thông minh duy nhất mà người dùng cần đến
        sau này.
      </p>

      <figure class="image">
        <img src="https://file.publish.vn/coin98/2021-09/website-tezos-1632572508207.png" />
        <figcaption>
          Giao diện website Tezos:{" "}
          <a
            href="https://tezos.com/"
            rel="nofollow noopener noreferrer"
            target="_blank"
          >
            tezos.com
          </a>
        </figcaption>
      </figure>

      <h2>Tezos giải quyết vấn đề gì?</h2>

      <h3>Vấn đề đặt ra</h3>

      <p>
        Có hai vấn đề chính được Tezos đặt ra đối với nhiều Blockchain nền tảng
        hiện tại:
      </p>

      <p>
        <strong>1. Cộng đồng bị chia rẽ khi Hardfork</strong>
      </p>
      <p>
        <strong>2. Chi phí duy trì an ninh mạng quá lớn</strong>
      </p>
      <h3>Giải pháp của Tezos </h3>

      <p>
        Tezos phát triển một Middleware gọi là Network Shell. Network Shell hỗ
        trợ trong giao tiếp giữa Network Protocol và Blockchain Protocol. Nói
        một cách đơn giản, Network Shell cho phép Tezos phát triển một sổ cái có
        thể tự nâng cấp (Self-Amending Ledger).
      </p>

      <p>Bên dưới là sơ đồ để anh em có thể hiểu rõ hơn về Network Shell.</p>

      <figure class="image">
        <img src="https://file.publish.vn/coin98/2021-09/network-shell-tezos-1632756758748.png" />
      </figure>

      <h2>Điểm nổi bật của Tezos</h2>

      <p>Trong phần này mình sẽ trình bày một vài điểm nổi bật của Tezos:</p>

      <h3>
        <strong>Tự sửa đổi và Quản trị On-chain</strong>
      </h3>

      <p>
        Mình sẽ lấy ví dụ: A muốn hạ số lượng XTZ cần khóa từ 10,000 XTZ xuống
        8,000 XTZ để có thể bắt đầu{" "}
        <a href="https://coin98.net/staking-la-gi" target="_blank">
          <strong>Staking </strong>
        </a>
        và nhận Reward từ việc xác nhận khối (blockc).
      </p>

      <p>
        Dự án ABC cần Hardfork để thực hiện cải tiến này. Trong trường hợp tất
        cả cộng đồng đều ủng hộ việc này, họ chỉ cần cập nhập bản Update bản vá
        mới là cả cộng đồng sẽ chuyển qua một nhánh mới.
      </p>

      <p>
        Nếu xảy ra việc không thống nhất ý kiến, một nhóm người không đồng ý
        việc giảm Token cần khóa từ 10,000 xuống 8,000 họ sẽ không cập nhập bản
        vá và tiếp tục chạy trên nhánh cũ. Thế là cộng đồng của Project ABC bị
        tách ra.
      </p>

      <p>
        Trường hợp tương tự là Hardfork của{" "}
        <a href="https://coin98.net/ethereum-la-gi" target="_blank">
          <strong>Ethereum </strong>
        </a>
        và{" "}
        <a href="https://coin98.net/ethereum-classic-etc" target="_blank">
          <strong>Ethereum Classic</strong>
        </a>
        .
      </p>

      <p>
        Ở dự án Tezos, A tạo đề xuất Athena. Với một ít sửa đổi ở cấp độ giao
        thức và A yêu cầu một số XTZ cho việc A bỏ công sức ra Code cho Tezos.
        Số XTZ này nhằm đảm bảo cho các Developers có động lực để đóng góp cho
        hệ sinh thái.
      </p>

      <p>
        Ở giai đoạn đoạn này, các Owner XTZ có thể dùng XTZ của mình để vote.
        Nếu quá trình này kết thúc với việc đề xuất Athena đạt được đa số vote
        ủng hộ thì đề xuất Athena sẽ chuyển qua giai đoạn thử nghiệm.
      </p>

      <p>
        Một chuỗi thử nghiệm sẽ thử chạy đề xuất này và cộng đồng có thể góp ý
        cải thiện nó. Nếu Athena hoàn thiện nó sẽ được update thành mạng chính
        mà không cần phải thực hiện Hardfork.
      </p>

      <h3>
        <strong>Thuật toán Liquid Proof of Stake (LPoS)</strong>
      </h3>

      <p>
        Cơ bản LPoS là một biến thể của DPoS nhưng khác một điểm quan trọng là:
        Anh em có thể ủy quyền Vote của mình cho người mà anh em tin tưởng.
      </p>

      <p>
        Vì vậy, để trở thành người có quyền lực trong mạng lưới, anh em không
        nhất thiết phải bỏ vài chục triệu đô la mua XTZ mà chỉ cần giành được sự
        tin tưởng của cộng đồng Tezos.
      </p>
      <h3>XTZ Token Use Case</h3>

      <p>
        Trước khi nói về đồng XTZ coin, mình sẽ nói một chút và các thuật ngữ
        liên quan đến Tezos mà ít nhiều anh em sẽ nghe qua khi tìm hiểu về
        Tezos.
      </p>

      <p>
        <strong>Liquidity, Michelson và Tezos VM là gì?</strong>
      </p>

      <ul>
        <li>
          Liquidity, Michelson là ngôn ngữ được dùng để viết Smart Contract trên
          Tezos.
        </li>
        <li>
          Tezos VM (Tezos Virtual Machine) có chức năng tương như máy ảo EVM.
          EVM là viết tắt của cụm từ Ethereum Virtual Machine - một máy ảo
          Turing hoàn toàn, có nhiệm vụ giúp các Smart Contract chạy được.
        </li>
      </ul>

      <p>
        <strong>Banking, Baker và Delegate là gì?</strong>
      </p>

      <ul>
        <li>
          Banking là quá trình các khối được sản xuất và xác nhận trên chuỗi
          khối Tezos.{" "}
        </li>
        <li>
          Banker là người tham gia quá trình Banking. Để trở thành một Banker
          thì cần ít nhất 1 Roll (1 Roll = 10,000 XTZ)
        </li>
        <li>
          Khi anh em không đủ 10,000 XTZ để trở thành Banker, anh em có thể
          Delegate số coin XTZ của mình cho 1 Baker mà mình tin tưởng. Vệc này
          giúp Banker đó cơ hội cao hơn được chọn là người đại diện và nhận được
          phần thưởng khối, bù lại phần thưởng sẽ được chia một phần cho anh em.
        </li>
      </ul>

      <p>
        Trong hệ sinh thái của Tezos ở thời điểm hiện tại, XTZ được dùng chủ yếu
        để:
      </p>

      <ul>
        <li>Làm phí giao dịch.</li>
        <li>Làm phần thưởng khối cho Baker.</li>
        <li>
          Onchain Governance: bằng việc Vote các đề xuất để chọn ra ra đề xuất
          được đồng ý bởi số đông.
        </li>
        <li>
          Được Tezos Foundation dùng để xây dựng và phát triển hệ sinh thái của
          Tezos.
        </li>
      </ul>

      <p>
        Một số tính năng sẽ có khi hệ sinh thái Wanchain được chấp nhận rộng rãi
        như Ethereum:
      </p>

      <ul>
        <li>XTZ được dùng để là xây dựng Dapps trên Tezos.</li>
        <li>Gọi vốn bằng XTZ trên nền tảng Tezos.</li>
      </ul>
      <h2>Roadmap &amp; Updates</h2>

      <p>
        Đối với Tezos sẽ không có một Roadmap “Official” nào cả, nếu có cũng chỉ
        là của cá nhân hay một nhóm Dev nào đó đưa ra lộ trình cam kết cho những
        việc mà họ định phát triển trên nền tảng Tezos.
      </p>

      <p>
        Tezos là một nền tảng phi tập trung nên bất cứ cá nhân hay nhóm Dev nào
        đó cũng có thể triển khai ý tưởng của mình trên nó. Còn việc có được áp
        dụng hay không còn tùy vào cộng đồng quyết định (Vote).
      </p>

      <p>
        Tổng quan có một số tính năng đang được các nhóm cộng đồng Build trên
        Tezos:
      </p>

      <ul>
        <li>
          <strong>Cơ chế đồng thuận: </strong>Tendermint,{" "}
          <a href="https://coin98.net/avalanche-avax" target="_blank">
            <strong>Avalanche</strong>
          </a>
          .
        </li>
        <li>
          <strong>Bảo mật:</strong> zk-SNARKs.
        </li>
        <li>
          <strong>Khả năng mở rộng:</strong> Sharding.
        </li>
        <li>
          <strong>Layer 2 </strong>và một số ngôn ngữ hợp đồng thông minh mới.
        </li>
      </ul>

      <p>
        Anh em có thể xem đóng góp của cộng đồng Tezos{" "}
        <a
          href="https://gitlab.com/tezos/tezos"
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          <strong>tại đây</strong>
        </a>
        <strong>. </strong>Ngoài ra, dưới đây là các đề xuất đã được thông qua
        của Tezos:
      </p>

      <ul>
        <li>
          <strong>Athens (5/2019):</strong> Tăng giới hạn{" "}
          <a href="https://coin98.net/gas-la-gi" target="_blank">
            <strong>Gas Limit</strong>
          </a>{" "}
          và giảm giá trị 1 Roll xuống từ 10,000 XTZ xuống 8,000 XTZ.
        </li>
        <li>
          <strong>Babylon (10/2019):</strong> Ra mắt phiên bản mạnh mẽ hơn của
          thuật toán đồng thuận blockchain (Emmy +); phát triển Smart Contract
          đơn giản hóa; tinh chỉnh quy trình Delegate.
        </li>
        <li>
          <strong>Carthage (3/2020): </strong>Tăng gas limit trên mỗi Block và
          mỗi lần vận hành; cải thiện công thức được sử dụng để tính toán Baking
          và xác nhận phần thưởng.
        </li>
        <li>
          <strong>Delphi (9/2020): </strong>Cải thiện gas fee. Giảm chi phí lưu
          trữ theo hệ số 4 để phản ánh những cải tiến trong lớp lưu trữ bên
          dưới.
        </li>
        <li>
          <strong>Edo (2/2021): </strong>Thêm Sapling và BLS12-381 để kích hoạt
          Smart Contract bảo vệ quyền riêng tư và ticket cho Native Permissons.
          Cập nhật quy trình sửa đổi bằng cách giảm độ dài khoảng thời gian
          xuống còn 5 Cycles và thêm Adoption Period lần thứ 5.
        </li>
        <li>
          <strong>Florence (5/2021): </strong>Tăng gấp đôi size của Operation,
          và Smart Contract. Tối ưu hóa gas cũng như tăng tốc lên hệ số 10. Cho
          phép phát triển Smart Contract trực quan hơn bằng cách áp dụng thứ tự
          thực hiện theo chiều sâu. Hủy kích hoạt Test Chain trong Economic
          Protocol, dẫn đến quy trình sửa đổi được tổ chức hợp lý hơn.
        </li>
        <li>
          <strong>Granada (8/2021):</strong> Ra mắt Liquidity Baking, tạo ra một
          lượng nhỏ tez mỗi Block và gửi vào Market Making Smart Contract. Điều
          này khuyến khích lượng lớn thanh khoản phi tập trung giữa tez và
          tzBTC. Bao gồm một số cải tiến dẫn đến mức gas fee giảm 3-6 lần.
        </li>
      </ul>

      <h2>Đội ngũ dự án, nhà đầu tư &amp; đối tác</h2>

      <h3>Đội ngũ dự án</h3>

      <p>Updating...</p>

      <h3>Nhà đầu tư</h3>

      <p>Updating...</p>

      <h3>Đối tác</h3>

      <ul>
        <li>
          <strong>Elevated Returns:</strong> Một công ty tài chính, tập trung
          vào Tokenized tài sản.
        </li>
        <li>
          <strong>Brazilian Investment Bank:</strong> Ngân hàng đầu tư của
          Brazil.
        </li>
      </ul>
    </>
  );
};

export default Xtz;
