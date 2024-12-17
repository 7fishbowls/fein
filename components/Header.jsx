import styles from "@/styles/header.module.css";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";

function Header() {
  const letters = [
    "Fueled by Shaik Ali.",
    "Propelled by Shaik Ali.",
    "Crafted by Shaik Ali.",
    "Deployed by Shaik Ali.",
  ][Math.floor(Math.random() * 4)];
  return (
    <div className={styles.top}>
      <footer className={styles.footer}>
        <p>{letters}</p>
      </footer>
      <div className={styles.social}>
        <Link href={"https://instagram.com/celesphos"}>
          <FaInstagram />
        </Link>
      </div>
    </div>
  );
}

export default Header;
