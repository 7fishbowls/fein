"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import Image from "next/image";
import Content from "./Content";

function AResearch({ styles, researches }) {
  const r = JSON.parse(researches);
  const deletedResearches = useRef([]);

  const [researches_, setResearches] = useState([]);
  const [logged, setUser] = useState("");

  const handleDelete = async (date) => {
    deletedResearches.current.push(date);
    const newResearches = r.filter(
      (elem) => !deletedResearches.current.includes(elem.date)
    );

    setResearches(newResearches);
    await fetch("/api/delete_research", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(date),
    });
  };

  useEffect(() => {
    const user = localStorage.getItem("unique_id");
    const thisone = r.filter((elem) => elem.posted_by === user);
    setResearches(thisone);
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
                alt={elem.research_keyword}
                width={450}
                height={550}
              />
              <Content styles={styles} elem={JSON.stringify(elem)}></Content>
            </section>
          </section>
        );
      })}
    </section>
  );
}

export default AResearch;
