import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ExpenseModal.css'; // Import the CSS file for styles

const ExpenseModal = ({ isOpen, onClose, onSubmit }) => {
    const [newExpense, setNewExpense] = React.useState({
        dateTime: '',
        author: '',
        sum: '',
        category: '1',
        comment: ''
    });

    const handleInputChange = (e) => {
        setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(newExpense); // Call the onSubmit function passed from parent
        setNewExpense({
            dateTime: '',
            author: '',
            sum: '',
            category: '1',
            comment: ''
        });
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2 className="modal-title">Add Expense</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="dateTime">Date & Time:</label>
                        <input type="datetime-local" id="dateTime" name="dateTime" value={newExpense.dateTime} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author:</label>
                        <input type="text" id="author" name="author" placeholder="Author" value={newExpense.author} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sum">Sum:</label>
                        <input type="number" id="sum" name="sum" placeholder="Sum" value={newExpense.sum} onChange={handleInputChange} required step="0.01" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category:</label>
                        <select id="category" name="category" value={newExpense.category} onChange={handleInputChange}>
                            <option value="1">Personal</option>
                            <option value="2">Business</option>
                            <option value="3">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="comment">Comment:</label>
                        <input type="text" id="comment" name="comment" placeholder="Comment" value={newExpense.comment} onChange={handleInputChange} required />
                    </div>
                    <button type="submit" className="submit-button">Add Expense</button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default ExpenseModal;