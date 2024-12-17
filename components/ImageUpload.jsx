function ImageUpload({ styles, index, setIndex, setFormData }) {
  const handleImageUpload = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (event) => {
      const base64 = event.target.result;
      setFormData((prev) => ({ ...prev, research_img_link: base64 }));
      setIndex((prev) => prev + 1);
    };

    reader.readAsDataURL(file);
  };

  return (
    <section
      className={styles.image_upload}
      style={{ transform: `translateX(-${index * 100}vw)` }}
    >
      <section>
        <header>
          <h2>Upload research images.</h2>
        </header>
        <section className={styles.image_upload_}>
          <label htmlFor="fileInput">Select Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            id="fileInput"
          ></input>
        </section>
      </section>
    </section>
  );
}

export default ImageUpload;
