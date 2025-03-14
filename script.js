// // function convertNumber(number, base) {
// //   if (!number.trim()) return 'Enter a valid number';

// //   let num = parseInt(number, 10);
// //   if (isNaN(num) || base < 2 || base > 16) {
// //       return 'Invalid input. Enter a valid number and select a base';
// //   }
// //   return num.toString(base).toUpperCase();
// // }

// // const numberInput = document.getElementById('NumVal');
// // const baseSelect = document.getElementById('convert1');
// // const outputElement = document.getElementById('answerOut');
// // const convertButton = document.getElementById('convert');

// // convertButton.addEventListener('click', () => {
// //   const number = numberInput.value;
// //   const base = parseInt(baseSelect.value);
// //   outputElement.textContent = convertNumber(number, base);
// // });




// // new js code 
// function convertNumber(number, fromBase, toBase) {
//   if (!number.trim()) return 'Enter a valid number';
//   let num = parseInt(number, fromBase);
//   if (isNaN(num)) {
//       return 'Invalid input. Ensure the number matches the selected base';
//   }
//   return num.toString(toBase).toUpperCase();
// }

// const numberInput = document.getElementById('NumVal');
// const fromBaseSelect = document.getElementById('fromBase');
// const toBaseSelect = document.getElementById('toBase');
// const outputElement = document.getElementById('answerOut');
// const convertButton = document.getElementById('convert');
// const historyList = document.getElementById('history');
// const darkModeToggle = document.getElementById('darkModeToggle');

// convertButton.addEventListener('click', () => {
//   const number = numberInput.value;
//   const fromBase = parseInt(fromBaseSelect.value);
//   const toBase = parseInt(toBaseSelect.value);
//   const result = convertNumber(number, fromBase, toBase);
//   outputElement.textContent = result;
  
//   // Add to history
//   if (result !== 'Invalid input. Ensure the number matches the selected base') {
//       const historyItem = document.createElement('li');
//       historyItem.textContent = `${number} (Base ${fromBase}) → ${result} (Base ${toBase})`;
//       historyList.prepend(historyItem);
//   }
// });

// // Dark mode toggle
// darkModeToggle.addEventListener('click', () => {
//   document.body.classList.toggle('dark-mode');
// });



function convertNumber(number, fromBase, toBase) {
  if (!number.trim()) return 'Enter a valid number';
  let num = parseInt(number, fromBase);
  if (isNaN(num)) {
      return 'Invalid input. Ensure the number matches the selected base';
  }
  return num.toString(toBase).toUpperCase();
}

// Get elements
const numberInput = document.getElementById('NumVal');
const fromBaseSelect = document.getElementById('fromBase');
const toBaseSelect = document.getElementById('toBase');
const outputElement = document.getElementById('answerOut');
const convertButton = document.getElementById('convert');
const historyList = document.getElementById('history');
const darkModeToggle = document.getElementById('darkModeToggle');

// Load saved theme from LocalStorage
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
}

// Load saved history from LocalStorage
const savedHistory = JSON.parse(localStorage.getItem('conversionHistory')) || [];
savedHistory.forEach(entry => {
  const historyItem = document.createElement('li');
  historyItem.textContent = entry;
  historyList.prepend(historyItem);
});

// Convert and save history
convertButton.addEventListener('click', () => {
  const number = numberInput.value;
  const fromBase = parseInt(fromBaseSelect.value);
  const toBase = parseInt(toBaseSelect.value);
  const result = convertNumber(number, fromBase, toBase);
  outputElement.textContent = result;

  if (result !== 'Invalid input. Ensure the number matches the selected base') {
      const historyEntry = `${number} (Base ${fromBase}) → ${result} (Base ${toBase})`;

      // Add to UI
      const historyItem = document.createElement('li');
      historyItem.textContent = historyEntry;
      historyList.prepend(historyItem);

      // Save to LocalStorage
      savedHistory.unshift(historyEntry);
      if (savedHistory.length > 10) savedHistory.pop(); // Keep last 10 entries
      localStorage.setItem('conversionHistory', JSON.stringify(savedHistory));
  }
});

// Dark mode toggle with LocalStorage
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const darkModeStatus = document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled';
  localStorage.setItem('darkMode', darkModeStatus);
});
