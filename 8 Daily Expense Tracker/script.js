let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
const FIXED_BUDGET = 50000;
let currentCurrency = 'PKR';

const EXCHANGE_RATES = {
    PKR: 1,
    USD: 278,
    EUR: 321
};

const expenseForm = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseCategoryInput = document.getElementById('expense-category');
const tableBody = document.getElementById('expense-table-body');
const noDataMsg = document.getElementById('no-data-msg');
const totalBalanceEl = document.getElementById('total-balance');
const totalSpentEl = document.getElementById('total-spent');
const categoryFilter = document.getElementById('category-filter');
const progressBar = document.getElementById('budget-progress');

let toastContainer = document.getElementById('toast-container');
if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 1000; display: flex; flex-direction: column; gap: 10px;';
    document.body.appendChild(toastContainer);
}

function showToast(message, type = 'error') {
    const toast = document.createElement('div');
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '8px';
    toast.style.color = 'white';
    toast.style.fontWeight = '600';
    toast.style.fontSize = '14px';
    toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.minWidth = '250px';
    toast.style.animation = 'slideIn 0.3s ease forwards';
    
    if (type === 'error') {
        toast.style.backgroundColor = '#dc2626';
    } else if (type === 'success') {
        toast.style.backgroundColor = '#16a34a';
    } else if (type === 'info') {
        toast.style.backgroundColor = '#4f46e5'; 
    }

    toast.innerText = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

expenseForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);
    const category = expenseCategoryInput.value;

    const currentTotalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
    
    if (currentTotalSpent + amount > FIXED_BUDGET) {
        const remaining = FIXED_BUDGET - currentTotalSpent;
        showToast(`Insufficient Funds! Remaining budget is only PKR ${remaining.toLocaleString()}.`, 'error');
        return; 
    }

    const expense = {
        id: Date.now(),
        name: name,
        amount: amount,
        category: category
    };

    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    expenseForm.reset();
    showToast('Expense added successfully!', 'success');
    updateApp();
});

function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    showToast('Expense removed successfully.', 'success');
    updateApp();
}

function resetApp() {
    if (confirm("Are you sure you want to clear all your tracking records? This action cannot be undone.")) {
        expenses = [];
        localStorage.removeItem('expenses');
        showToast('All transaction metrics cleared successfully.', 'info');
        updateApp();
    }
}

function filterExpenses() {
    renderList();
}
function changeCurrency(currency) {
    currentCurrency = currency;
    
    const buttons = document.querySelectorAll('.currency-btn');
    buttons.forEach(btn => {
        if (btn.textContent === currency) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    updateApp();
}

function updateApp() {
    const totalSpentPKR = expenses.reduce((sum, item) => sum + item.amount, 0);
    const remainingBalancePKR = FIXED_BUDGET - totalSpentPKR;

    totalBalanceEl.textContent = `PKR ${remainingBalancePKR.toLocaleString()}`;

    if (currentCurrency === 'PKR') {
        totalSpentEl.textContent = `PKR ${totalSpentPKR.toLocaleString()}`;
    } else if (currentCurrency === 'USD') {
        const totalSpentUSD = totalSpentPKR / EXCHANGE_RATES.USD;
        totalSpentEl.textContent = `$${totalSpentUSD.toFixed(2)}`;
    } else if (currentCurrency === 'EUR') {
        const totalSpentEUR = totalSpentPKR / EXCHANGE_RATES.EUR;
        totalSpentEl.textContent = `€${totalSpentEUR.toFixed(2)}`;
    }

    if (progressBar) {
        const spentPercentage = Math.min((totalSpentPKR / FIXED_BUDGET) * 100, 100);
        progressBar.style.width = `${spentPercentage}%`;
        if (spentPercentage >= 85) {
            progressBar.style.backgroundColor = '#dc2626';
        } else if (spentPercentage >= 60) {
            progressBar.style.backgroundColor = '#eab308';
        } else {
            progressBar.style.backgroundColor = '#16a34a';
        }
    }

    renderList();
}
function renderList() {
    const selectedFilter = categoryFilter.value;
    
    const filteredExpenses = expenses.filter(expense => {
        if (selectedFilter === 'All') return true;
        return expense.category === selectedFilter;
    });

    tableBody.innerHTML = '';

    if (filteredExpenses.length === 0) {
        noDataMsg.style.display = 'block';
    } else {
        noDataMsg.style.display = 'none';
        
        filteredExpenses.forEach(expense => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${expense.name}</td>
                <td><span style="background: #e0e7ff; color: #4338ca; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${expense.category}</span></td>
                <td>PKR ${expense.amount.toLocaleString()}</td>
                <td><button class="btn-delete" onclick="deleteExpense(${expense.id})">Delete</button></td>
            `;

            tableBody.appendChild(row);
        });
    }
}
updateApp();
