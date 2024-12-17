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
        <div className={styles.star}>
          <h2>
            <Link href={"/create"}>Create Research</Link>
          </h2>
        </div>
        <div className={styles.star}>
          <h2>
            <Link href="/manage_researches">Manage Researches</Link>
          </h2>
        </div>
        {valid && (
          <div className={styles.star}>
            <h2
              onClick={() => {
                localStorage.removeItem("unique_id");
                router.push("/login");
              }}
            >
              Logout
            </h2>
          </div>
        )}
        <div className={styles.star}>
          <h2>
            <Link href="/">Home</Link>
          </h2>
        </div>

        <div className={styles.star}>
          <h2>
            <Link href="https://www.instagram.com/celesphous">Me</Link>
          </h2>
        </div>
      </section>
    </nav>
  );
}

export default Menu;
