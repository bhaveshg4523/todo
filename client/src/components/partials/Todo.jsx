import React from 'react';
import moment from 'moment/moment'; // Import moment library for date formatting
import { toast } from 'react-toastify'; // Import toast notification library
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import { deleteTodoApi, markTodoApi } from '../../services/api.js'; // Import API functions for deleting and marking todos

// Todo component receives a todo object and a function to refresh the todo list
function Todo({ todo, setRefreshList }) {
      
    // Function to handle deletion of a todo
    const handleDelete = async () => {
        try {
            const result = await deleteTodoApi({
                Todo_id: todo._id
            });
            console.log(result);
            // If deletion is successful, display success toast and refresh the todo list
            if (result.data.status === 200) {
                toast('Deleted');
                setRefreshList(new Date());
            } else {
                // If deletion fails, display error toast
                toast('Failed To delete');
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
            // If an error occurs, display error toast
            toast('An error occurred while deleting todo');
        }
    };
    
    // Function to handle marking a todo as completed or uncompleted
    const handleMarkTodo = async() => {
        const result = await markTodoApi({
            todo_id: todo._id
        });
        // If marking todo is successful, display success toast and refresh the todo list
        if(result.data.status===200){
            setRefreshList(new Date());
            toast(result.data.message);
        } else {
            // If marking todo fails, display error toast
            toast('Failed To Mark');
        }
    };

    // Render the todo card
    return (
        <div className='col-sm-3 mx-4 my-2 alert bg-secondary'>
            
            <div className='card-header'>
                {todo.iSCompleted ? 'Completed' : 'Not Completed'} {/* Display whether todo is completed or not */}
            </div>  
            <div className='card-body'>
                <h4 className='card-title'>
                {todo.desc} {/* Display todo description */}
                </h4>
                <p className='card-text'>{moment(todo.date).fromNow()}</p> {/* Display time ago from creation date */}
                
            </div>          
            <div className='actionButtons' style={{display:'flex',
            justifyContent:'space-between',
            alignItems:'center'}}>
                    {/* Delete button */}
                    <div className='deleteButton'>
                        <button style={{ background:'red' }} onClick={ handleDelete }>Delete</button>
                    </div>
                    {/* Mark completed/uncompleted button */}
                    <div className='markTodo'>
                        <button onClick={ handleMarkTodo } style={{background:'lightgreen'}}>
                            {todo.iSCompleted ? 'Mark Uncompleted' : 'Mark Completed'}
                        </button>
                    </div>
                </div>
        </div>
    )
}

export default Todo;
