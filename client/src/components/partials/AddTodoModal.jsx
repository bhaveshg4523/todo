import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { createTodoApi } from '../../services/api.js';
import 'react-toastify/dist/ReactToastify.css';

function AddTodoModal({ setRefreshList }) {
    // State to store the description of the new todo
    const [todoDesc, setTodoDesc] = useState('');

    // Function to handle todo submission
    const handleTodoSubmit = async () => {
        // Check if todo description is empty
        if (todoDesc === '') {
            toast('Todo is Required');
            return;
        }

        // Call API to create a new todo
        const result = await createTodoApi({ desc: todoDesc });

        // Check the result of the API call
        if (result.status === 200 && result.data.status === 200) {
            // If successful, show success message and refresh the todo list
            toast('Todo Added');
            setRefreshList(new Date());
            setTodoDesc('');
        } else {
            // If failed, show error message
            toast(result.data.message);
        }
    }

    return (
        <div className='modal mt-5' id="exampleModal">
            <ToastContainer/>
            <div className='modal-dialog' role="document"> 
                <div className='modal-content'> 
                    <div className='modal-header'> 
                        <div className='modal-title'>
                            Add New Todo
                        </div>
                        <button type="button" className='btn-close' data-bs-dismiss="modal" aria-label="close">
                            <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div className='modal-body'>
                        <div className='form-group'>
                            {/* Textarea to input the todo description */}
                            <textarea 
                                name="" 
                                className='form-control' 
                                rows={3} 
                                onChange={(e)=>{setTodoDesc(e.target.value)}} 
                                placeholder='Write Todo...'
                            ></textarea>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        {/* Close button */}
                        <button 
                            className='btn btn-secondary' 
                            onClick={()=>{setTodoDesc(' ')}} 
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        {/* Save button to submit the todo */}
                        <button 
                            className='btn btn-secondary' 
                            onClick={handleTodoSubmit} 
                            data-bs-dismiss="modal"
                        >
                            Save Todo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTodoModal
