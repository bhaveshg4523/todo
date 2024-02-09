import React from 'react';
import moment from 'moment/moment'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteTodoApi, markTodoApi } from '../../services/api.js';

function Todo({ todo,setRefreshList }){
      
    const handleDelete = async () => {
        try {
            const result = await deleteTodoApi({
                Todo_id: todo._id
            });
            console.log(result);
            if (result.data.status === 200) {
                toast('Deleted');
                setRefreshList(new Date());
            } else {
                toast('Failed To delete');
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
            toast('An error occurred while deleting todo');
        }
    };
    
    const handleMarkTodo = async() => {
        const result = await markTodoApi({
            todo_id: todo._id
        })
        if(result.data.status===200){
            setRefreshList(new Date());
            toast(result.data.message);

        }else{
            toast('Failed To Mark');
        }
    };

    return (
        <div className='col-sm-3 mx-4 my-2 alert bg-secondary'>
            
            <div className='card-header'>
                {todo.iSCompleted ? 'Completed' : 'Not Completed'}
            </div>  
            <div className='card-body'>
                <h4 className='card-title'>
                {todo.desc}
                </h4>
                <p className='card-text'>{moment(todo.date).fromNow()}</p>
                
            </div>          
            <div className='actionButtons' style={{display:'flex',
            justifyContent:'space-between',
            alignItems:'center'}}>
                    <div className='deleteButton'>
                        <button style={{ background:'red' }} onClick={ handleDelete }>Delete</button>
                    </div>
                    <div className='markTodo'>
                        <button onClick={ handleMarkTodo } style={{background:'lightgreen'}}>{todo.iSCompleted ? 'Mark Uncompleted' : 'Mark Completed'}</button>
                    </div>
                </div>
        </div>
    )
}

export default Todo;
