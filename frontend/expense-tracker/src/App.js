import React, { useState, useEffect } from 'react';
import './App.css'; // Main CSS file for your application
import ExpenseModal from './ExpenseModal';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [expenses, setExpenses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state
    const backendAddress = 'http://localhost:3000';

    // Fetch expenses when the component mounts
    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        setLoading(true); // Set loading to true
        try {
            const response = await fetch(`${backendAddress}/expenses`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setExpenses(data);
            if (data.length === 0) {
              if (!toast.isActive("IN")) {
                toast.info("No Expenses found", {
                    toastId: "IN", // Use the custom ID
                });
            }
            }
        } catch (error) {
            toast.error('Error fetching expenses: ' + error.message);
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    const handleAddExpense = async (expense) => {
        try {
            const response = await fetch(`${backendAddress}/expenses`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(expense)
            });

            if (response.ok){
              await new Promise(resolve => setTimeout(resolve, 50));
              toast.success('Expense added successfully!'); // Show success notification
              console.log("from the mai");
              await new Promise(resolve => setTimeout(resolve, 50));
            } else {throw new Error('Network response was not ok');
            }
            await fetchExpenses(); // Fetch expenses again after adding
            setIsModalOpen(false); // Close modal after successful addition
        } catch (error) {
            toast.error('Error adding expense: ' + error.message);
        }
    };

    return (
        <div className="container">
            <section>
                <h1>Simple Expense Tracker</h1>
                {loading ? (
                    <div className="loading">Loading...</div> // Loading indicator
                ) : (
                    <>
                        <div className="tbl-header">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date & Time</th>
                                        <th>Author</th>
                                        <th>Sum</th>
                                        <th>Category</th>
                                        <th>Comment</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div className="tbl-content">
                            <table>
                                <tbody id="expense-table-body">
                                    {expenses.map((expense) => (
                                        <tr key={expense.id}>
                                            <td>{new Date(expense.dateTime).toLocaleString()}</td>
                                            <td>{expense.author}</td>
                                            <td>{expense.sum.toFixed(2)}</td>
                                            <td>{expense.category === 1 ? "Personal" : expense.category === 2 ? "Business" : "Other"}</td>
                                            <td>{expense.comment}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </section>

            {/* Add Expense Button */}
            <button className="add-expense-button" onClick={() => setIsModalOpen(true)}>Add Expense</button>

            {/* Expense Modal */}
            {isModalOpen && (
                <ExpenseModal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddExpense}
                />
            )}

            {/* Toast Container for notifications */}
            <ToastContainer position='bottom-right' autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme='light' />
        </div>
    );
}

export default App;