import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import Navbar_main from "../component/Navbar_main";
import add from "../assets/add.png"
import Modal from "../component/Modal";
import PacmanLoader from "react-spinners/PacmanLoader"
import '../loading.css'
import axios from "axios";
import defaultPic from "../assets/defpic.jpg"
import Swal from "sweetalert2";
import { isLoggedIn } from "../middleware/authMiddle";

const Dashboard = () => {
    isLoggedIn()
    const [openModal, setOpenModal] = useState(false)

    // get classroom data
    const [classrooms, setClassrooms] = useState([])
    
    const fetchData = async () => {
        axios.get(`http://localhost:5000/api/rooms`)
        .then(respone => setClassrooms(respone.data))
        .catch(err=>alert(err))
    }

    // function loading page
    const [loading,setLoading]=useState(false)

    useEffect(()=>{
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000);
        fetchData()
    },[])

    // function confirmDelete classroom
    const confirmDelete =(slug)=>{
        Swal.fire({
          title: 'แน่ใจนะว่าจะลบ?',
          text: "มันก็ดีนะ แต่! คิดอีกที",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ใช่ ลบเลย',
          cancelButtonText: 'ไม่ เดี๋ยวคิดอีกที'
        }).then((result) => {
          if (result.isConfirmed) {
            deleteRoom(slug)
          }
        })
    }

    const deleteRoom =(slug)=>{
        axios.delete(`http://localhost:5000/api/room/${slug}`)
        .then(respone=>{
            Swal.fire(
                'ลบสำเร็จ',
                respone.data.message,
                'success'
            )
            fetchData()
        }).catch(err=>console.log(err))
        
    }
    

  return (
    <div className="loading">
        {
            loading ?
            <h2><PacmanLoader color="hsla(204, 100%, 71%, 1)" loading={loading} size={50}/></h2>
            :
            <div className="bg-white">
                {openModal && <Modal closeModal={setOpenModal}/>}
                <Navbar_main />
                <div className="mx-20 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h1 className="text-3xl font-bold">My Classroom</h1>
                    <br />
                    <div className="grid grid-cols-1 gap-x-20 gap-y-10 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        <button onClick={() => setOpenModal(true)} className="justify-items-center group openModalBtn w-1/2">
                            <div className="  overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                            <img
                                src={add}
                                alt=""
                                className="object-cover object-center group-hover:opacity-75"
                            />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700"></h3>
                            <p className="mt-1 text-lg font-medium text-gray-900"></p>
                        </button>
                    {classrooms.map((classroom) => (
                        <div key={classroom.id} className="group">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                           <Link to={`/room/${classroom.slug}`}>
                            <img
                            src={defaultPic}
                            alt=''
                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                            />
                            </Link>
                        </div>
                        <h3 className="mt-4 text-sm text-gray-700">{classroom.classroom}</h3>
                        <p className="mt-1 text-lg font-medium text-gray-900">
                            {classroom.subject}
                        </p>
                        <button className="text-red-400" onClick={()=>confirmDelete(classroom.slug)}>ลบห้องเรียน</button>
                        </div>
                    ))}
                    </div>
                </div>
            </div>

        }

    </div>
    
  );
};
export default Dashboard;
