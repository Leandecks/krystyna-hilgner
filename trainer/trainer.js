"use strict";

let cards = [];

function card(front, back) {
  return { front, back };
}

function pushCards(...args) {
  args.forEach(arg => cards.push(arg));
}

// example cards
const card1 = card("Dog","Hund");
const card2 = card("Cat","Katze");
const card3 = card("Table","Tisch");
pushCards(card1, card2, card3);

document.addEventListener("DOMContentLoaded", () => {
  console.log("JS Started");
  
  if (JSON.parse(localStorage.getItem("cards")) !== null) {
    cards = JSON.parse(localStorage.getItem("cards"));
  }
  
  main();
});

function main() {
  const listWords = document.querySelector("#list-words");
  const addWords = document.querySelector("#add-words");
  const trainWords = document.querySelector("#train-words");

  listWords.addEventListener("click", () => {
    openListWordsDialog(listWords);
  });

  addWords.addEventListener("click", () => {
    openAddWordsDialog(addWords);
  });

  trainWords.addEventListener("click", () => {
    openTrainWordsDialog(trainWords);
  });
}

function openListWordsDialog(listWords) {
  openDialog(listWords);

  const dialog = listWords.nextElementSibling;
  const content = document.createElement("p");

  cards.forEach(card => {
    const element = document.createElement("p");
    element.textContent = card.front + " / " + card.back;
    content.appendChild(element);
  });

  content.classList.add("content");
  dialog.appendChild(content);
}

function openAddWordsDialog(addWords) {
  openDialog(addWords);

  const frontInput = document.querySelector("#front");
  const backInput = document.querySelector("#back");
  const newEntryButton = document.querySelector(".add-words-button");

  newEntryButton.addEventListener("click", () => {
    const newCard = card(frontInput.value, backInput.value);
    pushCards(newCard);
    frontInput.value = "";
    backInput.value = "";

    localStorage.setItem("cards", JSON.stringify(cards));
  });
}

function openTrainWordsDialog(trainWords) {
  openDialog(trainWords);

  const spanWithNumbersOfCards = document.querySelector(".card-length");
  const continueButton = document.querySelector(".train-button");
  const trainInfo = document.querySelector(".train-info");
  const frontDisplay = document.createElement("p");
  const backDisplay = document.createElement("p");
  const display = document.querySelector(".train-display");

  display.appendChild(backDisplay);
  display.appendChild(frontDisplay);
  frontDisplay.style.display = "none";
  backDisplay.style.display = "none";

  spanWithNumbersOfCards.textContent = cards.length;

  let i = 0;

  continueButton.addEventListener("click", () => {
    trainInfo.style.display = "none";

    if (i >= cards.length) {
      i = 0;
      trainInfo.style.display = "block";
      frontDisplay.style.display = "none";
      backDisplay.style.display = "none";
    } else if (frontDisplay.style.display === "none") {
      backDisplay.style.display = "none";
      frontDisplay.textContent = cards[i].front;
      frontDisplay.style.display = "block";
    } else {
      frontDisplay.style.display = "none";
      backDisplay.textContent = cards[i].back;
      backDisplay.style.display = "block";
      i++;
    }
  });
}

function openDialog(element) {
  const dialog = element.nextElementSibling;
  const closeButton = dialog.firstElementChild.firstElementChild.nextElementSibling;
  
  dialog.showModal();
  closeButton.addEventListener("click", () => {
    closeDialog(element);
  });
}

function closeDialog(element) {
  element.nextElementSibling.close();
  document.querySelectorAll(".content").forEach(el => el.remove());
}