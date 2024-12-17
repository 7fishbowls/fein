"use client";
import Loaderv2 from "@/components/create_loading";
import styles from "@/styles/create.module.css";

import { useEffect, useState } from "react";
import CreateResearch from "@/components/CreateResearch";
import Counter from "@/components/Counter";
import KeywordSearch from "@/components/KeywordSearch";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Create() {
  const [hide, setHide] = useState(false);
  const [index, setIndex] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [uid, setUid] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState({
    research_title: "",
    research_keyword: "",
    research_explanation: "",
    research_img_link: "",
    research_author: "",
  });

  useEffect(() => {
    setUid(localStorage.getItem("unique_id"));
  }, []);

  const final_data = {
    ...formData,
    posted_by: uid,
  };

  const postForm = async () => {
    setLoading(true);
    try {
      const request = await fetch("/api/create_research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(final_data),
      });
      setLoading(false);
      router.push("/researches");
    } catch (error) {
      console.error("Error while logging in:", error);
    }
  };
  if (uid) {
    return (
      <>
        <section
          className={`${styles.create_researhes} ${hide ? styles.active : ""}`}
        >
          <CreateResearch
            styles={styles}
            hide={hide}
            title="Pick up a title for research."
            index={index}
            setIndex={setIndex}
            place_holder={"Eg,. Mysteries of Black Hole"}
            btn_visible={false}
            formData={formData}
            setFormData={setFormData}
          />
          <KeywordSearch
            index={index}
            styles={styles}
            formData={formData}
            setFormData={setFormData}
            setIndex={setIndex}
          />
          <CreateResearch
            styles={styles}
            hide={hide}
            title="Explain the research."
            index={index}
            setIndex={setIndex}
            btn_visible={true}
            input_visible={false}
            formData={formData}
            place_holder={"I discovered something hidden in the stars..."}
            setFormData={setFormData}
          />
          <CreateResearch
            styles={styles}
            hide={hide}
            title="Give the research image link."
            index={index}
            setIndex={setIndex}
            img_={true}
            btn_visible={true}
            input_visible={true}
            place_holder={"Eg., https://example.jpg"}
            formData={formData}
            setFormData={setFormData}
          />
          <CreateResearch
            styles={styles}
            hide={hide}
            title="Who's the genius behind this?"
            index={index}
            setIndex={setIndex}
            btn_visible={true}
            input_visible={true}
            place_holder={"Eg., Shaik Ali"}
            formData={formData}
            postForm={postForm}
            setFormData={setFormData}
            setLoading={setLoading}
            isLoading={isLoading}
          />
        </section>
        <Loaderv2 hide={hide} setHide={setHide} />
        {hide && (
          <Counter current_index={index} max={10} research={true}></Counter>
        )}
      </>
    );
  }
  if (!uid) {
    return (
      <div className={styles.no_login}>
        <p>Please login to create researches.</p>
        <Link href={"/login"}>Loign here</Link>
      </div>
    );
  }
}

export default Create;
