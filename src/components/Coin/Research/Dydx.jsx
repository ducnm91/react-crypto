import React from "react";
import { Image } from "react-bootstrap";
import ecosystem from "../../../images/research/dydx-investor.jpg";

const Dydx = () => {
  return (
    <>
      <h2>dYdX là gì?</h2>
      <p>
      dYdX là một nền tảng trading phi tập trung với nhiều tính năng hỗ trợ và Derivatives (sản phẩm phái sinh), bao gồm giao dịch Spot (giao ngay), Margin (ký quỹ) và Perpetuals (hợp đồng không kỳ hạn). 
      </p>
      <h2>Điểm nổi bật của dYdX</h2>
      <ul>
        <li>Leverage - Đòn bẩy: Trong Margin trading, các trader sẽ được hỗ trợ giao dịch với đòn bẩy lên đến 10x (giá trị tài sản) cùng hợp đồng không kỳ hạn (Perpetuals).</li>
        <li>Lending & Borrowing - Vay & cho vay: Người dùng có thể vay trực tiếp trên sàn, hoặc người cho vay có thể deposit lên sàn để tối ưu hoá lợi nhuận bằng cách nắm giữ tài sản crypto và nhận lãi suất.</li>
        <li>Portfolio - Quản lý danh mục: Xem, quản lý, đóng vị thế và có thể theo dõi hiệu suất của các tài sản crypto.</li>
        <li>Trustless: Không phụ thuộc vào bất kỳ trung gian thứ 3 nào, đồng thời giảm các rủi ro nếu sàn “giở trò”.</li>
        <li>dYdX Options Protocol được sử dụng để giảm rủi ro trong đầu cơ, bất kỳ ai cũng có thể tạo các giao dịch trên bất kỳ token ERC-20 nào và các giao dịch ấy luôn cho phép giao dịch dễ dàng.</li>
      </ul>
      <h2>Token Use Case</h2>
      <p>DYDX token sẽ được dùng để:</p>
      <ul>
        <li>Staking: Token DYDX sẽ được dùng để cung cấp thanh khoản trong protocol.</li>
        <li>Nhận Sản phẩm & phần thưởng hàng tháng trong ứng dụng bằng cách claim trên dYdX exchange.</li>
        <li>Voting: Dùng để đề xuất và bỏ phiếu cho các thay đổi quan trọng của hệ thống.</li>
      </ul>
      <h2>Nhà đầu tư</h2>
      <Image src={ecosystem} fluid />
    </>
  );
};

export default Dydx;
