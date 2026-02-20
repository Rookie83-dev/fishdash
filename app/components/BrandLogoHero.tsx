import Image from "next/image";
import styles from "./BrandLogoHero.module.css";

type Props = {
  className?: string;
};

export default function BrandLogoHero({ className }: Props) {
  return (
    <div className={`${styles.wrap} ${className ?? ""}`}>
      <div className={styles.logo}>
        <Image
          src="/brand/fishdash-logo.webp" // promeni u .png ako koristiš PNG
          alt="Fishdash"
          width={1378}
          height={397}
          priority
          sizes="(max-width: 480px) 260px, (max-width: 768px) 340px, 460px"
          className={styles.img}
        />
      </div>
    </div>
  );
}