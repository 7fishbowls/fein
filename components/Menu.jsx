"use client";
import styles from "@/styles/menu.module.css";
import { BsDoorOpenFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { GoArrowUpLeft } from "react-icons/go";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaPencil } from "react-icons/fa6";
import { MdMenuBook } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { CgSmileMouthOpen } from "react-icons/cg";

function Menu() {
  const [active, setActive] = useState(false);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setValid(localStorage.getItem("unique_id"));
  }, []);

  return (
    <nav className={`${styles.menu} ${active ? styles.menu_active : ""}`}>
      <header onClick={() => setActive(!active)}>
        <h2>
          <GoArrowUpLeft size={27} className={styles.bar} />
        </h2>
      </header>
      <section className={styles.main}>
        <Link href={"/create"}>
          <div className={`${styles.star} ${styles.star_one}`}>
            <FaPencil size={20} style={{ marginBottom: "5px" }} />
            <h2>Create Research</h2>
          </div>
        </Link>
        <Link href="/manage_researches">
          <div className={`${styles.star} ${styles.star_two}`}>
            <MdMenuBook size={20} style={{ marginBottom: "5px" }} />
            <h2>Manage Researches</h2>
          </div>
        </Link>
        {valid && (
          <>
            <Link
              href="/login"
              onClick={() => localStorage.removeItem("unique_id")}
            >
              <div
                className={`${styles.star} ${styles.star_three} ${
                  valid ? styles.star_three_ : ""
                }`}
              >
                <BsDoorOpenFill size={20} style={{ marginBottom: "5px" }} />
                <h2>Log out</h2>
              </div>
            </Link>
          </>
        )}
        <Link href="/">
          <div
            className={`${styles.star} ${valid ? styles.star_four : ""}`}
            style={{ borderRight: "none" }}
          >
            <FaHome size={20} style={{ marginBottom: "5px" }} />
            <h2>Home</h2>
          </div>
        </Link>
        <Link href="https://www.instagram.com/cele5phos">
          <div className={styles.star}>
            <CgSmileMouthOpen size={20} style={{ marginBottom: "5px" }} />
            <h2>Me</h2>
          </div>
        </Link>
      </section>
    </nav>
  );
}

export default Menu;
