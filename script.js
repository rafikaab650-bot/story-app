const storyText = document.getElementById("storyText");
const storyTitle = document.getElementById("storyTitle");
const counter = document.getElementById("counter");
const savedStories = document.getElementById("savedStories");

/* عداد الكلمات */
storyText.addEventListener("input", () => {
  const words = storyText.value.trim().split(/\s+/).filter(Boolean);
  counter.textContent = "عدد الكلمات: " + words.length;
});

/* حفظ القصة */
function saveStory() {
  if (!storyTitle.value) {
    alert("يرجى كتابة اسم القصة");
    return;
  }

  localStorage.setItem(
    storyTitle.value,
    storyText.value
  );

  updateSavedStories();
  alert("تم حفظ القصة ✅");
}

/* تحميل القصص المحفوظة */
function updateSavedStories() {
  savedStories.innerHTML =
    '<option value="">-- القصص المحفوظة --</option>';

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const option = document.createElement("option");
    option.value = key;
    option.textContent = key;
    savedStories.appendChild(option);
  }
}

savedStories.addEventListener("change", () => {
  const text = localStorage.getItem(savedStories.value);
  storyText.value = text || "";
});

/* حذف القصة */
function deleteStory() {
  if (!savedStories.value) {
    alert("اختر قصة للحذف");
    return;
  }

  localStorage.removeItem(savedStories.value);
  storyText.value = "";
  updateSavedStories();
  alert("تم حذف القصة 🗑️");
}

/* إخفاء النص */
function hideText() {
  storyText.style.display = "none";
}

/* إرجاع النص */
function restoreText() {
  storyText.style.display = "block";
}

/* الوضع الليلي */
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

/* تغيير الخط */
document.getElementById("fontSelect").addEventListener("input", (e) => {
  storyText.style.fontFamily = e.target.value;
});

/* تغيير حجم الخط */
document.getElementById("fontSizeSelect").addEventListener("change", (e) => {
  storyText.style.fontSize = e.target.value;
});

/* تغيير لون الخلفية */
document.getElementById("bgColor").addEventListener("change", (e) => {
  storyText.style.backgroundColor = e.target.value;
});

/* صورة الخلفية */
document.getElementById("bgImage").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    storyText.style.backgroundImage = `url(${reader.result})`;
    storyText.style.backgroundSize = "cover";
  };
  reader.readAsDataURL(file);
});

/* تحميل القصص عند فتح الصفحة */
updateSavedStories();
