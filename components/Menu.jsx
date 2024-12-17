"use client";
import styles from "@/styles/menu.module.css";
import { useEffect, useState } from "react";
import { GoArrowUpLeft } from "react-icons/go";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Menu() {
  const [active, setActive] = useState(false);
  const [valid, setValid] = useState(false);
  const router = useRouter();
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
          <div className={styles.star}>
            <h2>Create Research</h2>
          </div>
        </Link>
        <Link href="/manage_researches">
          <div className={styles.star}>
            <h2>Manage Researches</h2>
          </div>
        </Link>
        {valid && (
          <h2
            onClick={() => {
              localStorage.removeItem("unique_id");
              router.push("/login");
            }}
          >
            <div className={styles.star}>Logout</div>
          </h2>
        )}
        <Link href="/">
          <div className={styles.star}>
            <h2>Home</h2>
          </div>
        </Link>
        <Link href="https://www.instagram.com/cele5phos">
          <div className={styles.star}>
            <h2>Me</h2>
          </div>
        </Link>
      </section>
    </nav>
  );
}

export default Menu;
