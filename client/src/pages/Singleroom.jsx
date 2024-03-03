import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import Navbar_main from "../component/Navbar_main";
import ModalEdit from "../component/Modal-edit";
import { isLoggedIn } from "../middleware/authMiddle";
import Swal from "sweetalert2";
import wallpaper4 from "../assets/wallpaper4.jpg";
import randomPic from "../assets/randomPic.jpg";
import checkPic from "../assets/checkPic.jpg";
import reportPic from "../assets/reportPic.jpg";
import { GoNumber } from "react-icons/go";
import { PiStudentFill, PiStudentDuotone } from "react-icons/pi";
import { MdClass } from "react-icons/md";
import { FaClone, FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

const Singleroom = () => {
    isLoggedIn()
    window.scrollTo(0, 0);
    let { slug } = useParams();
    
    // get room data
    const [singleroom, setSingleroom] = useState('');

    // get student data
    const [students, setStudents] = useState([])
    const fetchData = async () => {
        axios.get(`http://localhost:5000/api/students/${slug}`)
        .then(respone => setStudents(respone.data))
        .catch(err=>alert(err))
    }

    const [openEditModal, setOpenEditModal] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:5000/api/room/${slug}`)
        .then(response=>{
            setSingleroom(response.data);
        })
        .catch(err=>alert(err));
        fetchData()
    },[])

    // add data student
    const [state,setState] = useState({
        lekti: "",
        fname: "",
        lname: "",
        classroom: "",
        slug
    })
    
    const {lekti, fname, lname, classroom} = state;
    const [color, setColor] = useState('black');

    const inputValue =name=>event=>{
        setState({...state,[name]: event.target.value})
    }

    const inputValueforcr =name=>event=>{
        setState({...state,[name]: event.target.value})
        setColor('green')
    }

    const submitForm=(e)=>{
        e.preventDefault();
        // console.log('API = http://localhost:5000/api')
        axios.post(`http://localhost:5000/api/createStudent`,{lekti, fname, lname, classroom,slug}).then(response=>{
            Swal.fire("เรียบร้อย!","เพิ่มชื่อนักเรียนสำเร็จ","success");
            setState({...state,lekti:"",fname:"",lname:"", classroom, slug})
            fetchData()
        }).catch(err=>{
            Swal.fire('แจ้งเตือน',err.response.data.error,'error')
        })
    }

    const editstudent=(_id)=>{
        axios.get(`http://localhost:5000/api/student/${_id}`)
        .then(respone=>{
            const {lekti, fname, lname, classroom} = respone.data
            setState({...state,lekti, fname, lname, classroom})
        }).catch(err=>{
            console.log(err)
        })
    }

    // function confirmDelete classroom
    const confirmDelete =(_id)=>{
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
            deleteStudent(_id)
          }
        })
    }

    const deleteStudent =(_id)=>{
        axios.delete(`http://localhost:5000/api/student/${_id}`)
        .then(respone=>{
            Swal.fire(
                'ลบสำเร็จ',
                respone.data.message,
                'success'
            )
            fetchData()
        }).catch(err=>console.log(err))
        
    }
    
    
    return(
        <div style={{ backgroundImage: `url(${wallpaper4})`, backgroundSize: '100%'}}>
            {openEditModal && <ModalEdit closeModal={setOpenEditModal}/>}
            
            <Navbar_main/>  
            <div className="container- p-12 font-Kanit" >
                <div className="bg-amber-300 rounded-2xl mt-10 px-6 py-5 mx-10 my-5 max-w-lg">
                    <div className="grid grid-cols-2 ">
                        <Link to={'/dashboard'}><button className='text-3xl font-bold'>ห้อง {singleroom.classroom}</button></Link>
                        <button className="text-red-400 -mx-16" onClick={() => setOpenEditModal(true)}><svg className="" width="40" viewBox="0 1 24 15 "><FaEdit /></svg></button>
                    </div>
                    <h1 className="text-2xl mb-1"><span>วิชา : </span> {singleroom.subject}</h1>
                </div>
                

                {/* create form add student name */}
                <div className="grid grid-cols-2 ">
                    <div className="bg-blue-100 mx-auto h-1/2 w-8/12 shadow-3xl rounded-3xl shadow-2xl mt-5">
                        <form className="p-12">
                            <h2 class="text-3xl font-bold mb-4">เช็คชื่อนักเรียน</h2>
                            <h2 class="text-xs font-bold text-red-500 mb-4">***ให้ทำการกดข้อความบริเวณ icon ห้องเรียน เพื่อทำให้ข้อมูลห้องเรียนขึ้นเป็นสีเขียว</h2>
                            {/* {JSON.stringify(state)} */}
                            <div className="flex items-center text-lg mb-6 md:mb-8">
                                <svg className="absolute ml-3" width="40" viewBox="0 0 24 18"><GoNumber/></svg>
                                <input type="number" className="shadow-md bg-gray-200 rounded-2xl pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="เลขที่นักเรียน" value={lekti} onChange={inputValue('lekti')} required/>
                            </div>
                            <div className="flex items-center text-lg mb-6 md:mb-8">
                                <svg className="absolute ml-3" width="40" viewBox="0 0 24 22"><PiStudentFill /></svg>
                                <input type="text"  className="shadow-md bg-gray-200 rounded-2xl pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="ใส่ชื่อ" value={fname} onChange={inputValue('fname')} required/>
                            </div>
                            <div className="flex items-center text-lg mb-6 md:mb-8">
                                <svg className="absolute ml-3" width="40" viewBox="0 0 24 22"><PiStudentDuotone /></svg>
                                <input type="text"  className="shadow-md bg-gray-200 rounded-2xl pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="ใส่นามสกุล" value={lname} onChange={inputValue('lname')} required/>
                            </div>
                            <div className="flex items-center text-lg mb-6 md:mb-8">
                                <svg className="absolute ml-3" width="40" viewBox="0 0 24 19"><MdClass /></svg>
                                <input type="text"  className="shadow-md bg-gray-200 rounded-2xl pl-12 py-2 md:py-4 focus:outline-none w-full" value={singleroom.classroom} onClick={inputValueforcr('classroom')} style={{ color }} readOnly />
                            </div>
                            <button onClick={submitForm} className="bg-blue-600 from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded-2xl">เพิ่มชื่อนักเรียน</button>
                        </form>
                    </div>

                    {/* show all students in this room */}
                    <div>
                        <div class="bg-white  rounded-2xl px-6 py-6 max-w-60 mt-5">
                            <h2 class="text-3xl font-medium ">รายชื่อนักเรียน</h2>
                        </div>
                        <table className="block rounded-md px-9 py-4 my-4 max-w-4xl divide-y divide-gray-200 bg-white">
                            <thead className=" bg-gray-50 text-lg font-bold">
                                <tr>
                                    <th className=" py-2 text-gray-500  tracking-wider">
                                        เลขที่
                                    </th>
                                    <th  className="px-2 py-2 text-gray-500  tracking-wider">
                                        ชื่อ-นามสกุล
                                    </th>
                                    <th  className="pr-3 py-2 text-gray-500 tracking-wider">
                                        คัดลอก
                                    </th>
                                    <th  className="pr-5 py-2 text-gray-500 tracking-wider">
                                        ลบ
                                    </th>
                                </tr>
                            </thead>
                            <tbody className=" bg-white rounded-xl divide-y divide-gray-200 overflow-y-auto">
                                {students.map((student)=>( 
                                <tr>
                                    <td class="px-2 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="ml-4">
                                        {student.lekti}
                                        </div>
                                    </div>
                                    </td>
                                    <td class="px-6 py-4 w-full whitespace-wrap">
                                        <div class="text-lg text-center font-medium text-gray-900">
                                            {student.fname} {student.lname}
                                        </div>
                                    </td>
                                    
                                    <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <button className="text-amber-400" onClick={() => editstudent(student._id)}><svg className="hover:scale-125" width="40" viewBox="1 1 24 15 "><FaClone/></svg></button>
                                    </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <button className="text-red-400" onClick={()=>confirmDelete(student._id)}><svg className="hover:scale-125" width="40" viewBox="1 1 24 15 "><RiDeleteBin6Fill /></svg></button>
                                    </div>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div>
                <div className="px-8 ">
                    <div className=" py-10">
                    <h2 className="bg-amber-300 rounded-2xl p-5 text-center text-2xl font-bold text-gray-900">ตัวเลือกอื่น ๆ </h2>
                    <div className=" mt-6 grid grid-cols-3 gap-x-6 space-y-0 ">
                        <Link to={`/checkname/${slug}`}> 
                            <div className="group relative">
                                <div className="relative h-80 w-full overflow-hidden rounded-lg hover:bg-black bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:scale-105 sm:h-64 ">
                                    <img src={checkPic}  className="h-full w-full object-cover object-center hover:opacity-60"/>
                                </div>
                                <h3 className="mt-6 text-sm text-gray-500">
                                    <button >
                                        <span className="absolute inset-28">
                                            <p className="text-2xl font-bold text-white shadow-2xl">เช็คชื่อนักเรียน</p>
                                        </span>
                                    </button> 
                                </h3>
                            </div>
                        </Link> 
                        <Link to={`/randomName/${slug}`}> 
                            <div className="group relative">
                                <div className="relative h-80 w-full overflow-hidden rounded-lg hover:bg-black bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:scale-105 sm:h-64 ">
                                    <img src={randomPic} className="h-full w-full object-cover object-center hover:opacity-60"/>
                                </div>
                                <h3 className="mt-6 text-sm text-gray-500">
                                    <button >
                                        <span className="absolute inset-28">
                                            <p className="text-2xl font-bold text-white shadow-2xl">สุ่มชื่อนักเรียน</p>
                                        </span>
                                    </button> 
                                </h3>
                            </div>
                        </Link> 
                        <Link to={`/report`}> 
                            <div className="group relative">
                                <div className="relative h-80 w-full overflow-hidden rounded-lg hover:bg-black bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:scale-105 sm:h-64 ">
                                    <img src={reportPic} className="h-full w-full object-cover object-center hover:opacity-60"/>
                                </div>
                                <h3 className="mt-6 text-sm text-gray-500">
                                    <button >
                                        <span className="absolute inset-28">
                                            <p className="text-2xl font-bold text-white shadow-2xl">แจ้งปัญหาการทำงาน</p>
                                        </span>
                                    </button> 
                                </h3>
                            </div>
                        </Link> 
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Singleroom;
