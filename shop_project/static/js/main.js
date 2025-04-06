document.addEventListener("DOMContentLoaded", () => {
    initCarousel()
    initProductQuantity()
    initAddToCart()
    initBackToTop()
    initDarkMode()
    initAnimations()
    initAPI()
  })
  
  function initCarousel() {
    const carousel = document.querySelector("#carouselExampleIndicators")
    if (carousel) {
      if (typeof bootstrap !== "undefined") {
        const carouselInstance = new bootstrap.Carousel(carousel, {
          interval: 5000,
          wrap: true,
        })
      } else {
        console.warn("Bootstrap is not defined. Make sure it is included in your project.")
      }
    }
  }
  
  function initProductQuantity() {
    const quantityInput = document.getElementById("quantity")
    const increaseBtn = document.getElementById("increase-qty")
    const decreaseBtn = document.getElementById("decrease-qty")
  
    if (increaseBtn && decreaseBtn && quantityInput) {
      increaseBtn.addEventListener("click", () => {
        const currentValue = Number.parseInt(quantityInput.value)
        const maxValue = Number.parseInt(quantityInput.getAttribute("max") || 99)
        if (currentValue < maxValue) {
          quantityInput.value = currentValue + 1
        }
      })
  
      decreaseBtn.addEventListener("click", () => {
        const currentValue = Number.parseInt(quantityInput.value)
        if (currentValue > 1) {
          quantityInput.value = currentValue - 1
        }
      })
    }
  }
  
  function initAddToCart() {
    const addToCartBtn = document.getElementById("add-to-cart")
    const addToWishlistBtn = document.getElementById("add-to-wishlist")
    const shareProductBtn = document.getElementById("share-product")
    const quantityInput = document.getElementById("quantity")
  
    if (addToCartBtn && quantityInput) {
      addToCartBtn.addEventListener("click", () => {
        const quantity = Number.parseInt(quantityInput.value)
        const productName = document.querySelector("h1").textContent
        showNotification(`محصول "${productName}" به تعداد ${quantity} عدد به سبد خرید اضافه شد.`, "success")
      })
    }
  
    if (addToWishlistBtn) {
      addToWishlistBtn.addEventListener("click", () => {
        const productName = document.querySelector("h1").textContent
        showNotification(`محصول "${productName}" به لیست علاقه‌مندی‌ها اضافه شد.`, "info")
      })
    }
  
    if (shareProductBtn) {
      shareProductBtn.addEventListener("click", () => {
        if (navigator.share) {
          navigator
            .share({
              title: document.querySelector("h1").textContent,
              url: window.location.href,
            })
            .catch((error) => console.log("خطا در اشتراک‌گذاری:", error))
        } else {
          const dummy = document.createElement("input")
          document.body.appendChild(dummy)
          dummy.value = window.location.href
          dummy.select()
          document.execCommand("copy")
          document.body.removeChild(dummy)
  
          showNotification("لینک محصول در کلیپ‌بورد کپی شد.", "info")
        }
      })
    }
  }
  
  /**
   * @param {string} message 
   * @param {string} type 
   */
  function showNotification(message, type = "info") {
    const existingNotifications = document.querySelectorAll(".notification")
    existingNotifications.forEach((notification) => {
      notification.remove()
    })
  
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.textContent = message
  
    document.body.appendChild(notification)
  
    setTimeout(() => {
      notification.classList.add("show")
    }, 10)
  
    setTimeout(() => {
      notification.classList.remove("show")
      setTimeout(() => {
        notification.remove()
      }, 300)
    }, 3000)
  }
  
  function initBackToTop() {
    const backToTopBtn = document.createElement("div")
    backToTopBtn.className = "back-to-top"
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
    document.body.appendChild(backToTopBtn)
  
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("show")
      } else {
        backToTopBtn.classList.remove("show")
      }
    })
  }
  
  function initDarkMode() {
    const isDarkMode = localStorage.getItem("darkMode") === "true"
  
    const navbarNav = document.querySelector(".navbar-nav")
    if (navbarNav) {
      const darkModeToggle = document.createElement("li")
      darkModeToggle.className = "nav-item ms-2"
      darkModeToggle.innerHTML = `
              <button class="btn btn-sm btn-outline-light dark-mode-toggle">
                  <i class="fas ${isDarkMode ? "fa-sun" : "fa-moon"}"></i>
                  <span class="ms-1">${isDarkMode ? "حالت روشن" : "حالت تاریک"}</span>
              </button>
          `
      navbarNav.appendChild(darkModeToggle)
  
      if (isDarkMode) {
        document.body.classList.add("dark-mode")
      }
  
      const darkModeBtn = document.querySelector(".dark-mode-toggle")
      if (darkModeBtn) {
        darkModeBtn.addEventListener("click", function () {
          document.body.classList.toggle("dark-mode")
          const isDark = document.body.classList.contains("dark-mode")
          localStorage.setItem("darkMode", isDark)
 
          this.innerHTML = `
                      <i class="fas ${isDark ? "fa-sun" : "fa-moon"}"></i>
                      <span class="ms-1">${isDark ? "حالت روشن" : "حالت تاریک"}</span>
                  `
        })
      }
    }
  }
  
  function initAnimations() {
    const animateElements = document.querySelectorAll(".product-card, .category-card, .product-details")
  
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("fade-in")
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1 },
      )
  
      animateElements.forEach((element) => {
        observer.observe(element)
      })
    } else {
      animateElements.forEach((element) => {
        element.classList.add("fade-in")
      })
    }
  }

  function initAPI() {
    window.shopAPI = {
      /**
       * @param {Object} params 
       * @returns {Promise} 
       */
      getProducts: (params = {}) => {
        const queryParams = new URLSearchParams(params).toString()
        const url = `/api/products/${queryParams ? "?" + queryParams : ""}`
  
        return fetch(url).then((response) => {
          if (!response.ok) {
            throw new Error("خطا در دریافت اطلاعات")
          }
          return response.json()
        })
      },
  
      /**
       * @returns {Promise} 
       */
      getCategories: () =>
        fetch("/api/categories/").then((response) => {
          if (!response.ok) {
            throw new Error("خطا در دریافت اطلاعات")
          }
          return response.json()
        }),
  
      /**
       * @param {string} slug 
       * @returns {Promise} 
       */
      getProductDetails: (slug) =>
        fetch(`/api/products/${slug}/`).then((response) => {
          if (!response.ok) {
            throw new Error("خطا در دریافت اطلاعات")
          }
          return response.json()
        }),
  
      /**
       * @param {number} productId
       * @param {number} quantity 
       * @returns {Promise} 
       */
      addToCart: (productId, quantity = 1) =>
        fetch("/api/cart/add/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
          },
          body: JSON.stringify({
            product_id: productId,
            quantity: quantity,
          }),
        }).then((response) => {
          if (!response.ok) {
            throw new Error("خطا در افزودن به سبد خرید")
          }
          return response.json()
        }),
  
      /**
       * @param {number} productId 
       * @returns {Promise} 
       */
      addToWishlist: (productId) =>
        fetch("/api/wishlist/add/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
          },
          body: JSON.stringify({
            product_id: productId,
          }),
        }).then((response) => {
          if (!response.ok) {
            throw new Error("خطا در افزودن به لیست علاقه‌مندی‌ها")
          }
          return response.json()
        }),
    }
  
    /**
     * cookies:
     * @param {string} name 
     * @returns {string} 
     */
    function getCookie(name) {
      let cookieValue = null
      if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";")
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim()
          if (cookie.substring(0, name.length + 1) === name + "=") {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
            break
          }
        }
      }
      return cookieValue
    }
  
    console.log("در حال بارگذاری اطلاعات از API...")
  
    window.shopAPI
      .getProducts()
      .then((data) => {
        console.log("محصولات دریافت شده از API:", data)
      })
      .catch((error) => {
        console.error("خطا در دریافت محصولات:", error)
      })
  
    window.shopAPI
      .getCategories()
      .then((data) => {
        console.log("دسته‌بندی‌های دریافت شده از API:", data)
      })
      .catch((error) => {
        console.error("خطا در دریافت دسته‌بندی‌ها:", error)
      })
  }
  
  