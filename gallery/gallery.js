"use strict";

document.addEventListener("DOMContentLoaded", () => {
  console.log("JS Started");
  makeDialogsOpenable();
});

function makeDialogsOpenable () {
  const works = document.querySelectorAll(".work");

  works.forEach(work => {
    work.addEventListener("click", () => {
      openDialog(work.nextElementSibling);
    });
  });
}

function openDialog (dialog) {
  const closeButton = dialog.firstElementChild;
  const moveLeftButton = dialog.firstElementChild.nextElementSibling;
  const moveRightButton = dialog.firstElementChild.nextElementSibling.nextElementSibling;
  dialog.showModal();
  closeButton.addEventListener("click", () => {
    dialog.close();
  });

  moveLeftButton.addEventListener("click", () => {
    dialog.close()
    openDialog(dialog.previousElementSibling.previousElementSibling);
  });

  moveRightButton.addEventListener("click", () => {
    dialog.close();
    openDialog(dialog.nextElementSibling.nextElementSibling);
  });
}