"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";
import { IoMdInformationCircleOutline } from "react-icons/io";

function Form({
  title,
  index,
  place_holder,
  styles,
  setIndex,
  max,
  setFormData,
  formData,
  postForm,
  allError,
}) {
  const everything =
    formData.name && formData.email && formData.username && formData.password;

  const inputRef = useRef(null);
  const [error_, setError] = useState(false);
  const [canGo, setCanGo] = useState(true);
  const [err_msg, setErrorMsg] = useState("");

  const checkValidUser = async (inputData) => {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username: inputData.toLowerCase() }),
    });
    const final = await response.json();
    return final.available;
  };

  const handleInput = (e) => {
    switch (index) {
      case 0:
        setFormData({ ...formData, name: inputRef.current.value });
        break;
      case 1:
        setFormData({ ...formData, email: inputRef.current.value });
        break;
      case 2:
        setFormData({ ...formData, username: inputRef.current.value });
        break;
      case 3:
        setFormData({ ...formData, password: inputRef.current.value });
        break;
    }
  };

  const handleNext = async () => {
    if (!canGo) return;

    if (canGo) {
      setCanGo(false);
      setTimeout(() => {
        setCanGo(true);
      }, 1000);

      if (!inputRef.current.value) {
        setErrorMsg("Whoa, can’t leave this blank like a black hole.");
        return setError(true);
      } else if (index === 2 && inputRef.current.value.length < 3) {
        setError(true);
        return setErrorMsg("Username can't be that short!");
      } else if (index === 2 && inputRef.current.value.trim().includes(" ")) {
        setError(true);
        return setErrorMsg("No spaces allowed, keep it tight and clean.");
      } else if (index === 3 && inputRef.current.value.length < 8) {
        setError(true);
        return setErrorMsg(
          "Password's too short, make it atleast 8 characters."
        );
      } else if (
        index === 1 &&
        (inputRef.current.value.trim().includes(" ") ||
          !inputRef.current.value.includes("@gmail.com"))
      ) {
        setError(true);
        setErrorMsg("Invalid one, try again with a valid one!");
      } else {
        if (error_) setError(false);
        let isTaken;
        if (index === 2) isTaken = await checkValidUser(inputRef.current.value);

        if (index === 2 && !isTaken) {
          setError(true);
          return setErrorMsg(
            `"${inputRef.current.value}" already taken, time to get creative.`
          );
        }
        switch (index) {
          case 0:
            setFormData({ ...formData, name: inputRef.current.value });
            break;
          case 1:
            setFormData({ ...formData, email: inputRef.current.value });
            break;
          case 2:
            setFormData({ ...formData, username: inputRef.current.value });
            break;
          case 3:
            setFormData((prev) => {
              return { ...prev, password: inputRef.current.value };
            });
            break;
        }
        setIndex((prev) => (prev < max ? prev + 1 : max));
        if (index === 3) postForm();
      }
    }
  };

  const handlePrev = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <>
      <section
        className={styles.form}
        style={{ transform: `translateX(-${index * 100}vw)` }}
      >
        <section>
          <h2>
            {title}
            {error_ && (
              <span className={styles.error_icon}>
                <IoMdInformationCircleOutline />
              </span>
            )}
          </h2>
          <input
            type={index === 3 ? "password" : "text"}
            placeholder={place_holder}
            ref={inputRef}
            onChange={(e) => handleInput(e)}
          />
          <div className={styles.buttons}>
            <button onClick={handlePrev}>
              <span>
                <BsArrowLeft />
              </span>
            </button>
            <button
              onClick={handleNext}
              className={`${everything ? styles.special : ""}`}
            >
              <span>
                <BsArrowRight />
              </span>
            </button>
          </div>
          {error_ && (
            <div className={styles.error}>
              <p>{err_msg}</p>
            </div>
          )}
          {allError && (
            <div className={styles.error}>
              <p>Some feild is kinda missing!</p>
            </div>
          )}
        </section>
      </section>
      <div className={styles.login}>
        <Link href="/login">Login</Link>
      </div>
    </>
  );
}

export default Form;
