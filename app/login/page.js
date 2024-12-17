"use client";
import { useState } from "react";
import styles from "@/styles/signup.module.css";
import Link from "next/link";
import Counter from "@/components/Counter";
import LoginForm from "@/components/LoginForm";
import { loginForm } from "@/constants/forms";
import { useRouter } from "next/navigation";

function Login() {
  const [index, setIndex] = useState(0);
  const [allError, setAllError] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  const postData = async () => {
    try {
      const request = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await request.json();
      if (data.error) {
        setAllError(true);
      } else {
        setAllError(false);
        localStorage.setItem("unique_id", data.unique_key);
        router.push("/researches");
      }
    } catch (error) {
      console.error("Error while logging in:", error);
    }
  };

  return (
    <>
      <section className={styles.signup}>
        {loginForm.map((elem, id) => {
          return (
            <LoginForm
              title={elem.title}
              place_holder={elem.place_holder}
              styles={styles}
              index={index}
              key={id}
              setIndex={setIndex}
              max={loginForm.length - 1}
              formData={formData}
              setFormData={setFormData}
              allError={allError}
              postForm={postData}
            />
          );
        })}
        <div className={styles.login}>
          <Link href="/signup">Sign up</Link>
        </div>
        <Counter max={10} current_index={index} />
      </section>
    </>
  );
}

export default Login;
