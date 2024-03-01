import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import Navbar_main from "../component/Navbar_main";
import ModalEdit from "../component/Modal-edit";
import { isLoggedIn } from "../middleware/authMiddle";
import Swal from "sweetalert2";


const Singleroom = () => {
    isLoggedIn()
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
    const [openTable, setOpenTable] = useState(false)
    
    useEffect(() => {
        axios.get(`http://localhost:5000/api/room/${slug}`)
        .then(response=>{
            setSingleroom(response.data);
        })
        .catch(err=>alert(err));
        fetchData()
    },[])

    // add data
    const [state,setState] = useState({
        lekti: "",
        fname: "",
        lname: "",
        classroom: "",
        slug
    })
    
    const {lekti, fname, lname, classroom} = state;

    const inputValue =name=>event=>{
        setState({...state,[name]: event.target.value})
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
            return true
        }).catch(err=>{
            return false
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
        <div>
            {openEditModal && <ModalEdit closeModal={setOpenEditModal}/>}
            
            <Navbar_main/>  
            <div className="container p-10 font-Poppins">
                <h1>{singleroom.classroom}</h1>
                <p><span>วิชา : </span> {singleroom.subject}</p>
                <button className="text-yellow" onClick={() => setOpenEditModal(true)}>แก้ไขห้องเรียน</button>

                {/* create form add student name */}
                <form className="container mt-3 border rounded p-4"> 
                    <legend className="text-center fs-2 fw-bold">เพิ่มข้อมูลนักเรียน</legend>
                    {/* {JSON.stringify(state)} */}
                    <div className="mb-3">
                        <label className="form-label">เลขที่นักเรียน </label>
                        <input type="number" className="form-control" placeholder="เลขที่นักเรียน" value={lekti} onChange={inputValue('lekti')} required/><br />
                        <label className="form-label">ชื่อจริง </label>
                        <input type="text" className="form-control" placeholder="ใส่ชื่อ" value={fname} onChange={inputValue('fname')} required/><br />
                        <label className="form-label">นามสกุล </label>
                        <input type="text" className="form-control"placeholder="ใส่นามสกุล" value={lname} onChange={inputValue('lname')} required/><br />
                        <label className="form-label">ชั้นเรียน </label>
                        <input type="text" className="form-control"value={classroom} onChange={inputValue('classroom')} required/><br />
                        {/* <input type="text" className="form-control"value={singleroom.slug} onChange={inputValue('slug')} disabled/><br /> */}
                    </div>
                    {/* submit form */}
                    <button type="submit" onClick={submitForm} className="hover:bg-blue-400 w-full rounded-md bg-blue-500 py-3 px-8 text-center text-base font-semibold text-white outline-none">เพิ่มข้อมูล</button>
                </form>
                {/* show all students in this room */}
                <div className="container text-start mt-3">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">เลขที่</th>
                                <th scope="col">ชื่อ-นามสกุล</th>
                                <th scope="col">
                                    <th href="#" className="hover:bg-blue-400 w-full rounded-md bg-blue-500 text-center text-base font-semibold text-white outline-none">จัดการ</th>
                                </th>
                            </tr>
                        </thead>
                        {students.map((student)=>(
                            <tbody>
                                <th scope="col">{student.lekti}</th>
                                <th scope="col">{student.fname} {student.lname}</th>
                                <th scope="col"><button className="text-yellow" onClick={() => editstudent(student._id)}>โคลนชื่อนักเรียน </button></th>
                                <th scope="col"><button className="text-red-400" onClick={()=>confirmDelete(student._id)}> ลบชื่อนักเรียน</button></th>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
            <div>
                <div className="px-8">
                    <div className=" py-32">
                    <h2 className="text-2xl font-bold text-gray-900">Collections</h2>
                    <div className=" mt-6 grid grid-cols-3 gap-x-6 space-y-0 ">
                        <div className="group relative">
                            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                                <img src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg" alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug." className="h-full w-full object-cover object-center"/>
                            </div>
                            <h3 className="mt-6 text-sm text-gray-500">
                                <Link to={`/checkname/${slug}`}> <button>
                                    <span className="absolute inset-0"></span>
                                    Desk and Office
                                </button> 
                                </Link> 
                            </h3>
                            <p className="text-base font-semibold text-gray-900">Check name</p>
                        </div>
                        <div className="group relative">
                            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                                <img src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg" alt="Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant." className="h-full w-full object-cover object-center"/>
                            </div>
                            <h3 className="mt-6 text-sm text-gray-500">
                                <Link to={`/game/${slug}`}> <button>
                                    <span className="absolute inset-0"></span>
                                    Desk and Office
                                </button> 
                                </Link> 
                            </h3>
                            <p className="text-base font-semibold text-gray-900">Game</p>
                        </div>
                        <div className="group relative">
                        <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                            <img src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg" alt="Collection of four insulated travel bottles on wooden shelf." className="h-full w-full object-cover object-center"/>
                        </div>
                        <h3 className="mt-6 text-sm text-gray-500">
                            <a href="#">
                            <span className="absolute inset-0"></span>
                            Travel
                            </a>
                        </h3>
                        <p className="text-base font-semibold text-gray-900">Report</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Singleroom;
