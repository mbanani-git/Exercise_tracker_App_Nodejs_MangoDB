const urlForm = document.querySelector(".url-form");
const urlInput = document.querySelector(".url-input");
const urlSubmit = document.querySelector(".url-submit");

urlForm.addEventListener("submit", async (e) => {
  // e.preventDefault();
  const url = urlInput.value;
  try {
    await axios.post("/", { original_url: url });
    await axios.get("/api/shorturl");
  } catch (error) {
    console.log(error);
  }
});
