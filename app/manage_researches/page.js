"use client";
import styles from "@/styles/manage.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

function ManageResearches() {
  const [researches, setResearches] = useState([]);
  const [logged, setLogged] = useState(false);

  const handleDelete = async (date) => {
    const req = await fetch("/api/delete_research", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(date),
    });
    const res = await req.json();
    const newResearches = researches.filter((elem) => elem.date !== date);
    setResearches(newResearches);
  };

  useEffect(() => {
    const unique_id = localStorage.getItem("unique_id");
    setLogged(unique_id);
    const fetching = async () => {
      const req = await fetch("/api/create_research");
      const res = await req.json();
      console.log(res);
      const filterIt = res.filter((elem, index) => {
        return elem.posted_by === unique_id;
      });
      setResearches(filterIt);
    };
    fetching();
  }, []);
  return (
    <section className={styles.manage_researches}>
      {researches.length === 0 && logged && (
        <p className={styles.no_error}>
          You haven't uploaded any research yet.
        </p>
      )}
      {!logged && (
        <>
          <Link
            href={"/login"}
            className={styles.no_error}
            style={{
              textAlign: "center",
              width: "100vw",
              paddingLeft: 0,
              marginLeft: 0,
            }}
          >
            Login to manage researches.
          </Link>
        </>
      )}
      {researches.map((elem, index) => {
        return (
          <section key={index} className={styles.researches_}>
            <section className={styles.research}>
              <button
                className={styles.delete}
                onClick={() => handleDelete(elem.date)}
              >
                <MdDelete />
              </button>
              <Image
                src={elem.research_img_link}
                fill
                alt={elem.research_keyword}
                priority
              />

              <div className={styles.content}>
                <header>
                  <h2>{elem.research_title}</h2>
                  <p className={styles.author}>{elem.research_author}</p>
                </header>
                <div className={styles.explanation}>
                  <p>{elem.research_explanation}</p>
                  <div className={styles.date}>
                    <p>01-05-2023</p>
                  </div>
                </div>
              </div>
            </section>
          </section>
        );
      })}
    </section>
  );
}

export default ManageResearches;
