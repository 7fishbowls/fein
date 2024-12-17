"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import Image from "next/image";

function AResearch({ styles, researches }) {
  const r = JSON.parse(researches);
  const deletedResearches = useRef([]);

  const [researches_, setResearches] = useState(r);
  const [logged, setUser] = useState("");

  const handleDelete = async (date) => {
    const req = await fetch("/api/delete_research", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(date),
    });
    const res = await req.json();
    deletedResearches.current.push(date);
    const newResearches = r.filter(
      (elem) => !deletedResearches.current.includes(elem.date)
    );

    setResearches(newResearches);
  };

  useEffect(() => {
    const user = localStorage.getItem("unique_id");
    setUser(user);
  }, []);

  return (
    <section className={styles.researches}>
      {researches_.length === 0 && logged && (
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
      {researches_.map((elem, index) => {
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
                    <p>{new Date(elem.date).toLocaleDateString()}</p>
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

export default AResearch;
