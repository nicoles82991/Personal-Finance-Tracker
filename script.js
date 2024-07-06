document.addEventListener("DOMContentLoaded", () => {
  const transactionForm = document.getElementById("transaction-form");
  const transactionList = document.getElementById("transaction-list");
  const totalIncome = document.getElementById("total-income");
  const totalExpense = document.getElementById("total-expense");
  const balance = document.getElementById("balance");

  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  transactionForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const category = document.getElementById("category").value;

    const transaction = {
      id: Date.now(),
      description,
      amount,
      category,
    };

    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateUI();
    transactionForm.reset();
  });

  function updateUI() {
    transactionList.innerHTML = "";

    let income = 0;
    let expense = 0;

    transactions.forEach((transaction) => {
      const item = document.createElement("li");
      item.innerHTML = `${transaction.description} <span>${
        transaction.category === "income" ? "+" : "-"
      }${transaction.amount}</span>`;
      transactionList.appendChild(item);

      if (transaction.category === "income") {
        income += transaction.amount;
      } else {
        expense += transaction.amount;
      }
    });

    totalIncome.textContent = income;
    totalExpense.textContent = expense;
    balance.textContent = income - expense;
  }

  updateUI();
});
