import React from 'react'
import wallpaper5 from "../assets/wallpaper5.jpg";
import reportPic2 from "../assets/reportPic2.jpg";
import Navbar_main from "../component/Navbar_main";
import { useNavigate } from 'react-router';
import { isLoggedIn } from "../middleware/authMiddle";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Report = () => {
    isLoggedIn()
    const navigate = useNavigate()

    // add data report
    const [state,setState] = useState({
        r_username: "",
        r_type: "",
        r_dtail: "",
        r_file: ""
    })

    const {r_username,r_type,r_dtail,r_file} = state;
    const inputValue =name=>event=>{
        setState({...state,[name]: event.target.value})
    }

    const submitForm=(e)=>{
        e.preventDefault();
        // console.log('API = http://localhost:5000/api')
        axios.post(`http://localhost:5000/api/createReport`,{r_username,r_type,r_dtail,r_file}).then(response=>{
            Swal.fire("เรียบร้อย!","แจ้งรายงานปัญหาสำเร็จ","success");
            setState({...state,r_username:"",r_type:"",r_dtail:"",r_file:""})
        }).catch(err=>{
            Swal.fire('แจ้งเตือน',err.response.data.error,'error')
        })
    }

  return (
    <div className="min-h-screen " style={{ backgroundImage: `url(${wallpaper5})`, backgroundSize: '100%'}}>
        <Navbar_main/>  
        <div className='text-gray-100 px-8 py-12 font-Kanit items-center'>
            <div className="text-center w-full mt-20">
                <h1 className="text-4xl font-bold">แจ้งปัญหาการใช้งาน</h1>
            </div>
            <div className="bg-white max-w-screen-md mt-10 grid gap-8 grid-cols-2 mx-auto text-gray-900 rounded-2xl shadow-lg">
                <div className="p-3 mt-10">
                    <img src={reportPic2} className="rounded-2xl"/>
                </div>
                <form className="p-10" >
                    {/* {JSON.stringify(state)} */}
                    <h1 className="text-3xl mb-5">รายละเอียดของการแจ้งปัญหา</h1>
                    <div>
                        <span className="text-sm text-gray-600 font-bold">ชื่อผู้ใช้งาน</span>
                        <input className="w-full bg-blue-100 text-gray-900 mt-2 p-3 rounded-lg focus:border-blue-400"type="text" name="fullname" placeholder="ใส่ชื่อ-นามสกุล" value={r_username} onChange={inputValue('r_username')} required/>
                    </div>
                    <div className="mt-5">
                        <span className="text-sm text-gray-600 font-bold">ประเภทปัญหาที่พบเจอ</span>
                        <select className="w-full bg-blue-100 text-gray-900 mt-2 p-3 rounded-lg focus:border-blue-400"type="text" onChange={inputValue('r_type')} required>
                            <option value="0">---</option>
                            <option value="1">ความผิดปกติในหน้าจอ</option>
                            <option value="2">ระบบขัดข้อง</option>
                            <option value="3">อื่น ๆ</option>
                        </select>
                    </div>
                    <div className="mt-5">
                        <span className="text-sm text-gray-600 font-bold">รายละเอียดของปัญหา</span>
                        <textarea className="w-full bg-blue-100 text-gray-900 mt-2 p-3 rounded-lg focus:border-blue-400" placeholder='ใส่รายละเอียดของปัญหา' value={r_dtail} onChange={inputValue('r_dtail')} required></textarea>
                    </div>
                    <div className="mt-5">
                        <span className="text-sm text-gray-600 font-bold">อัพโหลดภาพปัญหาที่พบเจอ (ถ้ามี)</span>
                        <input className="w-full bg-blue-100 text-gray-900 mt-2 p-3 rounded-lg focus:border-blue-400"type="file" value={r_file} onChange={inputValue('r_file')} required/>
                    </div>
                    <div className="mt-8 text-end">
                        <button onClick={submitForm}
                            className="text-white tracking-wide bg-blue-500 text-gray-100 p-3 rounded-lg w-30 focus:outline-none focus:shadow-outline hover:bg-blue-600">
                            แจ้งปัญหา
                        </button>
                        <button onClick={() => navigate('/dashboard')} className="ml-3 text-white tracking-wide bg-red-500 text-gray-100 p-3 rounded-lg w-30 focus:outline-none focus:shadow-outline hover:bg-red-600">
                            ยกเลิก
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Report