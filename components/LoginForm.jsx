import { BsArrowRight } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useRef, useState } from "react";

function LoginForm({
  styles,
  index,
  allError,
  title,
  place_holder,
  setIndex,
  formData,
  setFormData,
  max,
  postForm,
}) {
  const [error_, setError_] = useState(false);
  const [err_msg, setErrMsg] = useState(null);
  const inputRef = useRef(null);

  const handlePrev = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleInput = (e) => {
    switch (index) {
      case 0:
        setFormData({ ...formData, username: e.target.value });
        break;
      case 1:
        setFormData({ ...formData, password: e.target.value });
        break;
    }
  };

  const handleNext = () => {
    if (!inputRef.current.value) {
      setErrMsg(
        index === 0 ? "Username cannot be empty." : "Password cannot be empty."
      );
      return setError_(true);
    } else if (
      index === 0 &&
      (inputRef.current.value.trim().length < 3 ||
        inputRef.current.value.trim().includes(" "))
    ) {
      setErrMsg("Invalid username.");
      return setError_(true);
    }
    setError_(false);
    setIndex((prev) => (prev < max ? prev + 1 : max));
    if (index === 1) postForm();
  };

  return (
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
          type={index === 1 ? "password" : "text"}
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
          <button onClick={handleNext}>
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
            <p>Invalid email or password!</p>
          </div>
        )}
      </section>
    </section>
  );
}

export default LoginForm;
