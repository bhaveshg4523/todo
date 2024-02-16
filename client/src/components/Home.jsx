import React, { useEffect, useState } from "react";
import Header from "../components/partials/Header.jsx"; // Import Header component
import Todo from "../components/partials/Todo.jsx"; // Import Todo component
import AddTodoModal from "./partials/AddTodoModal.jsx"; // Import AddTodoModal component
import { getTodoListApi, getToken ,deleteTodoApi } from "../services/api"; // Import API functions
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from react-router-dom
import { ToastContainer,toast } from 'react-toastify'; // Import ToastContainer and toast from react-toastify

// React component for the Home page
export default function Home() {
  const navigation = useNavigate(); // Get navigation function from react-router-dom
  const [refreshList, setRefreshList] = useState(); // State to trigger a refresh of the todo list
  useEffect(() => {
    // Check if user is logged in, if not, redirect to login page
    if (!getToken()) {
      navigation("/login");
    }
    fetchTodoList(); // Fetch the todo list from the server
  }, [navigation, refreshList]); // Trigger useEffect whenever navigation or refreshList changes

  const [list, setList] = useState([]); // State variable to store the todo list

  // Function to fetch the todo list from the server
  async function fetchTodoList() {
    const result = await getTodoListApi(); // Call getTodoListApi function to fetch todo list
    console.log("todolist", result);
    // If the request is successful and todos are received, update the list state
    if (result.status === 200 && result.data.status === 200) {
      setList(result.data.data.todos.reverse()); // Reverse the order of todos to display the latest first
    }
  }

  // Function to handle the deletion of a todo
  const handleDeleteTodo = async (deletedTodoId) => {
    // Delete the todo from the server
    const deleteResult = await deleteTodoApi({
        Todo_id: deletedTodoId // Pass the ID of the todo to be deleted
    });
    
    // If the deletion request is successful, update the UI by removing the deleted todo from the list
    if (deleteResult.data.status === 200) {
        setList(list.filter(todo => todo._id !== deletedTodoId)); // Filter out the deleted todo from the list
        toast.success(deleteResult.data.message); // Display a success toast message
    } else {
        toast.error(deleteResult.data.message); // Display an error toast message
    }
};

  // Render the Home page
  return (
    <>
      <div>
        <Header /> {/* Render the Header component */}
        <ToastContainer/> {/* Render the ToastContainer for displaying toast messages */}
        <div className="container">
          <div className="row justify-content-md-center mt-4">
            {/* Map through the todo list and render Todo component for each todo */}
            {list.map((todo) => (
              <Todo
                todo={todo}
                key={todo._id}
                setRefreshList={setRefreshList} // Pass setRefreshList function to Todo component
                onDelete={handleDeleteTodo} // Pass handleDeleteTodo function to Todo component
              />
            ))}
          </div>
        </div>
        {/* Button to open AddTodoModal */}
        <div
          className=""
          style={{ position: "fixed", right: 50, bottom: 50, zIndex: 1030 }}
        >
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="btn btn-outline-primary"
          >
            Add
          </button>
        </div>
        <AddTodoModal setRefreshList={setRefreshList} /> {/* Render the AddTodoModal component */}
      </div>
    </>
  );
}
