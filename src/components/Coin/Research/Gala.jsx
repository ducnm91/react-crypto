import React from "react";
import { Image } from "react-bootstrap";
import investor from "../../../images/research/gala-investors.jpg";

const Gala = () => {
  return (
    <>
      <h2>Gala Games là gì?</h2>
      <p>
        Gala Games là một nền tảng gaming kết hợp NFT trên blockchain, hoạt động
        trên cả hai hệ sinh thái Ethereum & Binance Smart Chain. Gala Games còn
        cung cấp các tính năng khác nhau, gồm đa dạng trò chơi NFT (Gala Games)
        và NFT Marketplace (Gala Store).
      </p>
      <h2>Điểm nổi bật của Gala Games</h2>
      <p>
        Vì Gala là một nền tảng đa dạng nên điểm nổi bật của dự án cũng chính là
        các tính năng mà ứng dụng mang lại cho người dùng, phải kể đến như:
      </p>
      <ul>
        <li>
          Gala Store: Nơi người dùng tham gia vào gaming và có thể sử dụng token
          GALA để trao đổi vật phẩm NFT.
        </li>
        <li>Gala Games: Nền tảng truy cập vào không gian gaming.</li>
        <li>
          Town Star: Trò chơi mô phỏng việc trồng trọt, cũng là game đầu tiên
          được phát hành bởi Gala.
        </li>
        <li>
          Triple Proof Node System: Gala kết hợp sử dụng cơ chế Proof-of-Work
          (PoW), Proof-of-Stake (PoS) và Proof-of-Storage.
        </li>
      </ul>
      <h2>Đội ngũ dự án</h2>
      <p>
        Eric Schiermeyer - CEO & Co-Founder của Gala Games, người có nhiều
        chuyên môn trong mảng Gaming & công nghệ Blockchain. Cùng đội ngũ dev
        với bề dày kinh nghiệm trong lĩnh vực tài chính.
      </p>
      <h2>Đối tác</h2>
      <ul>
        <li><a href="https://flare.xyz/">flare</a></li>
        <li><a href="https://mazer.gg/">mazer</a></li>
        <li><a href="https://www.bitrue.com/">bitrue</a></li>
        <li><a href="https://brave.com/">brave</a></li>
      </ul>
      <Image src={investor} fluid />
    </>
  );
};

export default Gala;
