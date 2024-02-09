import React, { useEffect, useState } from "react";
import Header from "../components/partials/Header.jsx";
import Todo from "../components/partials/Todo.jsx";
import AddTodoModal from "./partials/AddTodoModal.jsx";
import { getTodoListApi, getToken ,deleteTodoApi } from "../services/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from 'react-toastify';
export default function Home() {
  const navigation = useNavigate();
  const [refreshList, setRefreshList] = useState();
  useEffect(() => {
    if (!getToken()) {
      navigation("/login");
    }
    fetchTodoList();
  }, [navigation, refreshList]);

  const [list, setList] = useState([]);
  async function fetchTodoList() {
    const result = await getTodoListApi();
    console.log("todolist", result);
    if (result.status === 200 && result.data.status === 200) {
      setList(result.data.data.todos.reverse());
    }
  }

  const handleDeleteTodo = async (deletedTodoId) => {
    // Delete the todo from the server
    const deleteResult = await deleteTodoApi({
        Todo_id: deletedTodoId
    });
    
    if (deleteResult.data.status === 200) {
        // Update the UI by removing the deleted todo from the list
        setList(list.filter(todo => todo._id !== deletedTodoId));
        toast.success(deleteResult.data.message);
    } else {
        toast.error(deleteResult.data.message);
    }
};
  return (
    <>
      <div>
        <Header />
        <ToastContainer/>
        <div className="container">
          <div className="row justify-content-md-center mt-4">
            {list.map((todo) => (
              <Todo
                todo={todo}
                key={todo._id}
                setRefreshList={setRefreshList} // Pass setRefreshList to Todo component
                onDelete={handleDeleteTodo} // Pass the delete handler to Todo component
              />
            ))}
          </div>
        </div>
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
        <AddTodoModal setRefreshList={setRefreshList} />
      </div>
    </>
  );
}
