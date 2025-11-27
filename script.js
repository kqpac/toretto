// Активация мобильного меню
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Закрытие меню при клике на ссылку
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Плавная прокрутка для навигационных ссылок
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Изменение навигации при прокрутке
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.backgroundColor = "rgba(13, 13, 13, 0.95)";
    navbar.style.padding = "10px 0";
  } else {
    navbar.style.backgroundColor = "rgba(13, 13, 13, 0.9)";
    navbar.style.padding = "15px 0";
  }
});

// Анимация появления элементов при прокрутке
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
    }
  });
}, observerOptions);

// Наблюдаем за элементами для анимации
document.addEventListener("DOMContentLoaded", () => {
  const elementsToAnimate = document.querySelectorAll(
    ".car-card, .member-card, .about-image, .contact-info, .contact-form"
  );

  elementsToAnimate.forEach((el) => {
    observer.observe(el);
  });

  // Добавляем CSS класс для анимации
  const style = document.createElement("style");
  style.textContent = `
        .car-card, .member-card, .about-image, .contact-info, .contact-form {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
  document.head.appendChild(style);
});

// Обработка формы обратной связи
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Получаем данные формы
    const formData = new FormData(contactForm);
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // В реальном приложении здесь был бы код для отправки данных на сервер
    // Для демонстрации просто показываем сообщение об успехе
    alert(
      `Спасибо, ${name}! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.`
    );

    // Очищаем форму
    contactForm.reset();
  });
}

// Дополнительные эффекты для карточек машин
document.querySelectorAll(".car-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

// Эффект параллакса для главного экрана
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero) {
    const rate = scrolled * 0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Добавляем звуковые эффекты (опционально)
document.querySelectorAll(".cta-button, .submit-btn").forEach((button) => {
  button.addEventListener("click", () => {
    // В реальном приложении здесь можно добавить звук двигателя
    console.log("Vroom vroom!"); // Заглушка для звукового эффекта
  });
});

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  console.log("Сайт семьи Торетто загружен!");
});
// Система обратной связи
const feedbackForm = document.getElementById("feedbackForm");
const feedbackList = document.querySelector(".feedback-list");

// Загрузка отзывов из localStorage
function loadFeedback() {
  const savedFeedback = localStorage.getItem("torettoFeedback");
  if (savedFeedback) {
    const feedbackArray = JSON.parse(savedFeedback);
    feedbackArray.forEach((feedback) => {
      addFeedbackToDOM(feedback);
    });
  }
}

// Сохранение отзыва в localStorage
function saveFeedback(feedback) {
  const savedFeedback = localStorage.getItem("torettoFeedback");
  let feedbackArray = savedFeedback ? JSON.parse(savedFeedback) : [];

  // Добавляем дату
  feedback.date = new Date().toLocaleDateString("ru-RU");
  feedbackArray.unshift(feedback); // Добавляем в начало

  // Сохраняем только последние 20 отзывов
  if (feedbackArray.length > 20) {
    feedbackArray = feedbackArray.slice(0, 20);
  }

  localStorage.setItem("torettoFeedback", JSON.stringify(feedbackArray));
}

// Добавление отзыва в DOM
function addFeedbackToDOM(feedback) {
  const feedbackItem = document.createElement("div");
  feedbackItem.className = "feedback-item";

  // Создаем звезды рейтинга
  const stars = "★".repeat(feedback.rating) + "☆".repeat(5 - feedback.rating);

  feedbackItem.innerHTML = `
    <div class="feedback-header">
      <span class="feedback-author">${feedback.name}</span>
      <span class="feedback-rating">${stars}</span>
    </div>
    <div class="feedback-type">
      <small>Тема: ${getTypeText(feedback.type)}</small>
    </div>
    <p class="feedback-text">"${feedback.message}"</p>
    <span class="feedback-date">${feedback.date}</span>
  `;

  feedbackList.insertBefore(feedbackItem, feedbackList.firstChild);
}

// Получение текста для типа отзыва
function getTypeText(type) {
  const types = {
    racing: "Гонки",
    family: "Семья",
    cars: "Машины",
    other: "Другое",
  };
  return types[type] || "Другое";
}

// Обработка отправки формы обратной связи
if (feedbackForm) {
  feedbackForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("feedbackName").value;
    const email = document.getElementById("feedbackEmail").value;
    const type = document.getElementById("feedbackType").value;
    const message = document.getElementById("feedbackMessage").value;
    const rating = document.querySelector('input[name="rating"]:checked');

    if (!rating) {
      alert("Пожалуйста, поставьте оценку!");
      return;
    }

    const feedback = {
      name,
      email,
      type,
      message,
      rating: parseInt(rating.value),
    };

    // Сохраняем отзыв
    saveFeedback(feedback);
    addFeedbackToDOM(feedback);

    // Показываем уведомление
    showNotification("Спасибо за ваш отзыв! Семья это ценит.", "success");

    // Очищаем форму
    feedbackForm.reset();

    // Сбрасываем звезды
    document.querySelectorAll('input[name="rating"]').forEach((radio) => {
      radio.checked = false;
    });
  });
}

// Функция показа уведомлений
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Стили для уведомления
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === "success" ? "#4CAF50" : "#ff2e2e"};
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Анимации для уведомлений
const notificationStyles = document.createElement("style");
notificationStyles.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(notificationStyles);

// Загрузка отзывов при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  loadFeedback();

  // Добавляем ссылку в навигацию
  const navMenu = document.querySelector(".nav-menu");
  const feedbackNavItem = document.createElement("li");
  feedbackNavItem.className = "nav-item";
  feedbackNavItem.innerHTML = '<a href="#feedback" class="nav-link">Отзывы</a>';
  navMenu.appendChild(feedbackNavItem);
});
// Имитация отправки на сервер
function sendFeedbackToServer(feedback) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Отзыв отправлен на сервер:", feedback);
      resolve(true);
    }, 1000);
  });
}

// Обновите обработчик формы:
if (feedbackForm) {
  feedbackForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = feedbackForm.querySelector(".submit-btn");
    const originalText = submitBtn.textContent;

    try {
      submitBtn.textContent = "Отправка...";
      submitBtn.disabled = true;

      // ... существующий код получения данных ...

      // Имитация отправки
      await sendFeedbackToServer(feedback);

      // ... существующий код сохранения и отображения ...
    } catch (error) {
      showNotification("Ошибка при отправке отзыва", "error");
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}
// Основная функция отправки email
async function sendEmail(formData) {
  // Пробуем EmailJS сначала
  try {
    const emailjsResult = await sendViaEmailJS(formData);
    if (emailjsResult) return true;
  } catch (error) {
    console.log("EmailJS failed, trying Google Script...");
  }

  // Если EmailJS не сработал, пробуем Google Apps Script
  try {
    const googleScriptResult = await sendViaGoogleScript(formData);
    if (googleScriptResult) return true;
  } catch (error) {
    console.log("Google Script failed, trying Formspree...");
  }

  // Последний резерв - Formspree
  try {
    const formspreeResult = await sendViaFormspree(formData);
    return formspreeResult;
  } catch (error) {
    throw new Error("All email methods failed");
  }
}

// EmailJS метод
async function sendViaEmailJS(formData) {
  const serviceID = "yservice_4qo3xwc";
  const templateID = "template_fem02vuid";

  const emailParams = {
    from_name: formData.name,
    from_email: formData.email,
    subject: formData.subject,
    message: formData.message,
    timestamp: new Date().toLocaleString("ru-RU"),
  };

  const response = await emailjs.send(serviceID, templateID, emailParams);
  return response.status === 200;
}

// Google Apps Script метод
async function sendViaGoogleScript(formData) {
  const scriptURL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

  const response = await fetch(scriptURL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    }),
  });

  return true; // no-cors mode всегда возвращает успех
}

// Formspree метод (резервный)
async function sendViaFormspree(formData) {
  const response = await fetch("https://formspree.io/f/xjvnzzwz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      _replyto: formData.email,
      _subject: `Семья Торетто: ${formData.subject}`,
    }),
  });

  return response.ok;
}
