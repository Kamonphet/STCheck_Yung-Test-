import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Navbar_main from "../component/Navbar_main";
import ModalEdit from "../component/Modal-edit";

const Singleroom = () => {
    let { slug } = useParams();
    const [singleroom, setSingleroom] = useState('');

    const [openEditModal, setOpenEditModal] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:5000/api/room/${slug}`)
        .then(response=>{
            setSingleroom(response.data);
        })
        .catch(err=>alert(err))
    },[])
    
    
    return(
        <div>
            <Navbar_main/>
            {openEditModal && <ModalEdit closeModal={setOpenEditModal}/>}
            <div className="container p-5">
                <h1>{singleroom.classroom}</h1>
                <p><span>วิชา : </span> {singleroom.subject}</p>
                <button className="text-yellow" onClick={() => setOpenEditModal(true)}>แก้ไขห้องเรียน</button> &nbsp;

                {/* create form add student name */}
                <form action="#" method="post" className="container mt-3 border rounded p-4"> 
                    <legend class="text-center fs-2 fw-bold">Add Student</legend>
                    <div class="mb-3">
                        <label for="studentname" class="form-label">Student Name</label>
                        <input type="text" class="form-control" id="studentname" placeholder="Enter Student Name"/><br />
                    </div>
                    {/* submit form */}
                    <button type="submit" onClick={()=>addStudents()} class="btn btn-success w-100">Submit</button>
                </form>
                {/* show all students in this room */}
                <div class="container text-start mt-3">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">
                                    <a href="#" class="btn btn-primary">Remove All</a>
                                </th>
                            </tr>
                        </thead>
                        <tbody id='showall'></tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default Singleroom;
