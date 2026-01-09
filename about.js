  
  
  const careersModal = document.getElementById("careersModal");
  const openCareersBtn = document.getElementById("openCareersModal");
  const closeCareersBtn = careersModal.querySelector(".careers-modal-close");

  openCareersBtn.addEventListener("click", () => {
    careersModal.classList.add("active");
  });

  closeCareersBtn.addEventListener("click", () => {
    careersModal.classList.remove("active");
  });

  careersModal.addEventListener("click", (e) => {
    if (e.target === careersModal) {
      careersModal.classList.remove("active");
    }
  });