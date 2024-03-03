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
import wallpaper2 from "../assets/wallpaper2.jpg";
import { getUser } from "../middleware/authMiddle";
import { RiDeleteBin6Fill } from "react-icons/ri";

const Dashboard = () => {
    isLoggedIn()
    const user = getUser();
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
    <div className="loading font-Kanit">
        {
            loading ?
            <h2><PacmanLoader color="hsla(204, 100%, 71%, 1)" loading={loading} size={50}/></h2>
            :
            <div className="bg-white"style={{ backgroundImage: `url(${wallpaper2})`, backgroundSize: '100%' }}>
                {openModal && <Modal closeModal={setOpenModal}/>}
                <Navbar_main />
                <div className="mx-20 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h1 className="text-3xl font-bold">ห้องเรียนของครู {user.username}</h1>
                    <p>ระดับสมาชิก: {user.role}</p>
                    <br />
                    <div className="grid grid-cols-1 gap-x-20 gap-y-10 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        <button onClick={() => setOpenModal(true)} className="px-10 w-5/6 group openModalBtn ">
                            <div className=" overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                            <img
                                src={add}
                                alt=""
                                className="object-cover object-center group-hover:scale-105"
                            />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700"></h3>
                            <p className="mt-1 text-lg font-medium text-gray-900"></p>
                        </button>
                    {classrooms.map((classroom) => (
                        <div key={classroom.id} className="group">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 hover:scale-105">
                           <Link to={`/room/${classroom.slug}`}>
                            <img
                            src={defaultPic}
                            alt=''
                            className="h-full w-full object-cover object-center"
                            />
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 ">
                            <h3 className="mt-4 text-2xl text-gray-700"> ห้องเรียน {classroom.classroom}</h3>
                            <button className="text-red-400 -mx-20 mt-4" onClick={()=>confirmDelete(classroom.slug)}><svg className="" width="40" viewBox="1 1 24 15 "><RiDeleteBin6Fill /></svg></button>
                        </div>
                         
                        <p className="mt-1 text-lg font-medium text-gray-900">
                           วิชา {classroom.subject}
                        </p>
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
