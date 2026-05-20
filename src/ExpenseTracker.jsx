import React, { useState, useEffect } from "react";
import '../styles/ExpenseTracker.css'

function ExpenseTracker() {
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [amountInput, setAmountInput] = useState(0);
  const [category, setCategory] = useState("");
  const [expense, setExpense] = useState(() => {
    const savedExpense = localStorage.getItem("myExpense");
    return savedExpense ? JSON.parse(savedExpense) : [];
  });

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleAmount = (event) => {
    setAmountInput(event.target.value);
  };

  const handleAdd = () => {
    if (title === "") return;
    if (amountInput === "" || amountInput <= 0) return;
    if (category === "") return;

    const amount = Number(amountInput);

    setExpense([...expense, { title, amount, category }]);
    setTitle("");
    setAmountInput("");
    setCategory("");
  };

  const handleDelete = (index) => {
    if (confirm("Are you sure you want to delete") == true) {
      const filterExpense = expense.filter((_, i) => i !== index);
      setExpense(filterExpense);
    }
  };

  const handleSelect = (event) => {
    setCategory(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };
  const filterTitle = expense.filter((exp) =>
    exp.title.toLowerCase().includes(search.toLowerCase()),
  );
  const filterCategories = filterTitle.filter((exp) =>
    exp.category.includes(filter),
  );

  const total = filterCategories.reduce((acc, exp) => acc + exp.amount, 0);

  useEffect(() => {
    localStorage.setItem("myExpense", JSON.stringify(expense));
  }, [expense]);

  return (
    <>
      <div>
        <h1 className="header" onClick={() => window.location.reload()}>
          Expense Tracker
        </h1>
        <div className="filter-bars">
          <label>Search by Title: </label>
          <input
            type="text"
            placeholder="Search by title"
            onChange={handleSearch}
            value={search}
          />
          <label>Filter By Category:</label>

          <select
            name="filter"
            id="filter"
            onChange={handleFilter}
            value={filter}
          >
            <option value="">All Categories</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="shopping">Shopping</option>
            <option value="bills">Bills</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>
        <div className="input-fields">
          <label>Title: </label>
          <input
            type="text"
            placeholder="Enter the title"
            onChange={handleTitle}
            value={title}
          />
          <label> Amount $: </label>

          <input
            type="number"
            placeholder="Enter the amount"
            onChange={handleAmount}
            value={amountInput}
          />
          <label htmlFor="categories"> Choose a Category:</label>
          <select
            name="categories"
            id="categories"
            onChange={handleSelect}
            value={category}
          >
            <option>Select category</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="shopping">Shopping</option>
            <option value="bills">Bills</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>
        <div className="add-btn">
          <button onClick={handleAdd}>Add Expense</button>
        </div>
      </div>
      <div className="expense-box">
        <div className="card">
          {filterCategories.length === 0 && <p>No expenses found</p>}
          {filterCategories.map((exp, index) => (
            <div className="expenses" key={index}>
              {exp.title} - ${exp.amount} - {exp.category.toUpperCase()}{" "}
              <span>
                <button onClick={() => handleDelete(index)}>
                  Delete Expense
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="total-box">
        <p>Total: ${total}</p>
      </div>
    </>
  );
}

export default ExpenseTracker;
