import React from "react";
import { Image } from "react-bootstrap";
import roadMap from "../../../images/research/terra-columbus-roadmap.jpg";
import ecosytem from "../../../images/research/terra-ecosystem.jpg";
import funding from "../../../images/research/terra-funding.jpg"

const Luna = () => {
  return (
    <>
      <h2>Terra là gì?</h2>
      <p>
        Terra có trự sở tại Hàn Quốc cách đây 4 năm. Terra là một một mạng lưới thanh toán tài chính phi tập trung xây dựng
        lại hệ thống thanh toán truyền thống trên blockchain trong hệ sinh thái
        Cosmos, ban đầu được nhiều người biết đến với các ứng dụng thanh toán
        như Chai, Memepay, dùng đồng UST của Terra để thanh toán. Nhưng bắt đầu
        từ tháng 10/2020, sau bản cập nhật Columbus-4, Terra có cho mình Smart
        contract, chính thức xây dựng một hệ sinh thái.
      </p>
      <h2>Luna là gì?</h2>
      <p>
        Luna là đơn vị tiền tệ dự trữ - reserve currency của nền tảng Terra.
      </p>
      <ul>
        <li>Khai thác các giao dịch Terra thông qua việc đặt cược - staking</li>
        <li>Đảm bảo sự ổn định về giá của các stablecoin Terra</li>
        <li>
          Cung cấp các ưu đãi cho các trình xác thực blockchain - validator của
          nền tảng
        </li>
      </ul>
      <Image src={roadMap} fluid />
      <h2>Hệ sinh thái Terra</h2>
      <p>Hệ sinh thái Terra hiện tại đã có khoảng 80 dự án</p>
      <Image src={ecosytem} fluid />
      <p>
        ​Ngoài ra, dự án có lẽ là lớn nhất hiện tại ở Terra, đó là Anchor
        Protocol đã có TVL lên đến $4B - con số khủng khiếp đối với một dự án
        Lending ra mắt chưa đầy 1 năm (ra mắt vào tháng 3/2021).
      </p>
      <p>
        Để dễ so sánh, Compound và Aave là một trong những dự án lâu đời nhất về
        Lending, nhưng TVL cũng đang ở khoảng $11B, chỉ lớn hơn khoảng 3 lần so
        với Anchor Protocol.
      </p>
      <p>
        Trong năm 2021, Terra đã được “rót tiền” lên đến 3 lần, với lần gần nhất
        là vào ngày 9/9/2021 với 5M LUNA (~$150M), đến từ chính Terraform Labs
        với tên gọi Project Dawn.
      </p>
      <Image src={funding} fluid />
    </>
  );
};

export default Luna;