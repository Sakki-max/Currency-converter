const fromSelect = document.getElementById('from-currency');
const toSelect = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convert-btn');
const resultDiv = document.getElementById('result');
const swapBtn = document.getElementById('swap-btn');

const host = 'api.frankfurter.app';

// Load Currencies
fetch(`https://${host}/currencies`)
  .then(resp => resp.json())
  .then((data) => {
    Object.entries(data).forEach(([code, name]) => {
        const opt = `<option value="${code}">${code} - ${name}</option>`;
        fromSelect.innerHTML += opt;
        toSelect.innerHTML += opt;
    });
    fromSelect.value = "USD";
    toSelect.value = "EUR";
  });

// Swap Function
swapBtn.addEventListener('click', () => {
    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
});

// Conversion Logic
convertBtn.addEventListener('click', () => {
    const from = fromSelect.value;
    const to = toSelect.value;
    const amount = amountInput.value;

    if (!amount || amount <= 0) return;

    resultDiv.innerText = "Converting...";

    fetch(`https://${host}/latest?amount=${amount}&from=${from}&to=${to}`)
      .then(resp => resp.json())
      .then((data) => {
        resultDiv.innerText = `${data.rates[to]} ${to}`;
      })
      .catch(() => {
        resultDiv.innerText = "Error!";
      });
});