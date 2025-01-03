const output = document.getElementById('output');

// Add initial Loading row
const loadingRow = document.createElement('tr');
loadingRow.id = 'loading'; // Add ID for testing
const loadingCell = document.createElement('td');
loadingCell.colSpan = 2;
loadingCell.textContent = 'Loading...';
loadingRow.appendChild(loadingCell);
output.appendChild(loadingRow);

// Function to generate a promise that resolves after a random time (1-3 seconds)
function createPromise(index) {
  const time = Math.random() * 2 + 1; // Random time between 1 and 3 seconds
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name: `Promise ${index}`, time: time.toFixed(3) }), time * 1000);
  });
}

// Create 3 promises
const promises = [
  createPromise(1),
  createPromise(2),
  createPromise(3)
];

const startTime = performance.now();

// Use Promise.all to wait for all promises to resolve
Promise.all(promises).then((results) => {
  const endTime = performance.now();
  const totalTime = ((endTime - startTime) / 1000).toFixed(3);

  // Remove loading row
  output.removeChild(loadingRow);

  // Add rows for each resolved promise
  results.forEach((result) => {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = result.name;

    const timeCell = document.createElement('td');
    timeCell.textContent = result.time;

    row.appendChild(nameCell);
    row.appendChild(timeCell);

    output.appendChild(row);
  });

  // Add the total time row
  const totalRow = document.createElement('tr');

  const totalNameCell = document.createElement('td');
  totalNameCell.textContent = 'Total';

  const totalTimeCell = document.createElement('td');
  totalTimeCell.textContent = totalTime;

  totalRow.appendChild(totalNameCell);
  totalRow.appendChild(totalTimeCell);

  output.appendChild(totalRow);
});
