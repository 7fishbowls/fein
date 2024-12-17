"use client";
import Counter from "@/components/Counter";
import Form from "@/components/Form";
import styles from "@/styles/signup.module.css";
import { useState } from "react";
import signup_forms from "@/constants/forms";
import { useRouter } from "next/navigation";

function Signup() {
  const router = useRouter();

  const [index, setIndex] = useState(0);
  const [allError, setAllError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const postForm = async () => {
    try {
      if (
        formData.name &&
        formData.email &&
        formData.username &&
        formData.password
      ) {
        const request = await fetch("/api/create_user", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(formData),
        });
        const data = await request.json();
        localStorage.setItem("unique_id", data.unique_key);
        router.push("/researches");
      } else {
        setAllError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section className={styles.signup}>
        {signup_forms.map((elem, id) => {
          return (
            <Form
              styles={styles}
              index={index}
              setIndex={setIndex}
              title={elem.title}
              place_holder={elem.place_holder}
              key={id}
              max={signup_forms.length - 1}
              setFormData={setFormData}
              formData={formData}
              postForm={postForm}
              allError={allError}
            />
          );
        })}
      </section>
      <Counter max={20} current_index={index} />
    </>
  );
}

export default Signup;
