import { useState, useEffect } from "react";
import Navbar_main from "../component/Navbar_main";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { isLoggedIn } from "../middleware/authMiddle";
import Swal from "sweetalert2";
import axios from "axios";
import wallpaper3 from "../assets/wallpaper3.jpg";

const ChknTable = () => {
    isLoggedIn();
    let { slug } = useParams();
    const navigate = useNavigate();

    // get room data
    const [singleroom, setSingleroom] = useState("");

    // get student data
    const [students, setStudents] = useState([]);
    const fetchData = async () => {
        axios
        .get(`http://localhost:5000/api/students/${slug}`)
        .then((respone) => setStudents(respone.data))
        .catch((err) => alert(err));
    };

    // get data checkname 
    const [chks, setChk] = useState({});
    const fetchdatacheckname = async () =>{
        axios
        .get(`http://localhost:5000/api/checknames/${slug}`)
        .then((responee) => setChk(responee.data))
        .catch((err) => alert(err));
    }

    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/room/${slug}`)
        .then((response) => {
            setSingleroom(response.data);
        })
        .catch((err) => alert(err));
        window.scrollTo(0, 0);
        fetchData();
        fetchdatacheckname();
    }, []);

    // add data checkname
    const [state,setState] = useState({
        lekti_id: "",
        mission: "",
        check_name: "",
        reason: "",
        slug
    })

    const {lekti_id, mission, check_name,reason} = state;

    const inputValue =name=>event=>{
        setState({...state,[name]: event.target.value})
    }

    const submitForm=(e)=>{
        e.preventDefault();
        // console.log('API = http://localhost:5000/api')
        axios.post(`http://localhost:5000/api/createCheckname`,{lekti_id, mission, check_name,reason, slug}).then(response=>{
            Swal.fire("เรียบร้อย!","เช็คชื่อนักเรียนสำเร็จ","success");
            setState({...state,lekti_id:"", mission, check_name:"",reason:"", slug})
            fetchdatacheckname();
        }).catch(err=>{
            Swal.fire('แจ้งเตือน',err.response.data.error,'error')
        })
    }

    return (
        <div className="min-h-screen " style={{ backgroundImage: `url(${wallpaper3})`, backgroundSize: '100%'}}>
            <Navbar_main />
            <div className="container- p-10 font-Poppins">
                <div className="bg-white opacity-80 rounded-lg mt-10 px-6 py-4 mx-10 my-5 max-w-lg">
                    <button className=" text-3xl font-bold mt-5" onClick={() => navigate(-1)}>
                    เช็คชื่อนักเรียน ห้อง {singleroom.classroom}
                    </button>
                    <h1 className="text-2xl">
                        <span>วิชา : {singleroom.subject}</span>
                    </h1>
                </div>

                <div className="grid grid-cols-2">
                    <div class="bg-white  rounded-lg px-6 py-7 mx-10 my-8 max-w-2xl">
                        <h2 class="text-3xl font-medium mb-4">เช็คชื่อนักเรียน</h2>
                        <form>
                            {/* {JSON.stringify(state)} */}
                            <div class="mb-4">
                                <label class="block text-gray-700 font-bold mb-2">หัวข้อตรวจสอบวันนี้</label>
                                <input type="text" class="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400" value={mission} onChange={inputValue('mission')} required/>
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 font-bold mb-2">ชื่อนักเรียน</label>
                                <select class="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400" onChange={inputValue('lekti_id')} required>
                                    <option value="0">---</option>
                                    {students.map((student) => (
                                        <option value={student._id}>เลขที่ {student.lekti} นาย {student.fname} {student.lname}</option>
                                    ))}
                                </select>
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 font-bold mb-2">เช็คชื่อ</label>
                                <div class="flex flex-wrap -mx-2">
                                    <div class="px-9 w-1/3">
                                        <input type="radio" value="Success" className="h-5 w-5 mr-2 rounded-full shadow" onChange={inputValue('check_name')}/>
                                        <label for="Success">สำเร็จ</label>
                                    </div>
                                    <div class="px-6 w-1/3">
                                        <input type="radio"  value="noSuccess" className="h-5 w-5 mr-2 rounded-full shadow" onChange={inputValue('check_name')}/>
                                        <label for="noSuccess">ไม่สำเร็จ</label>
                                    </div>
                                    <div class="px-6 w-1/3">
                                        <input type="radio"  value="noCheck" className="h-5 w-5 mr-2 rounded-full shadow" onChange={inputValue('check_name')}/>
                                        <label for="noCheck">ไม่ได้ตรวจสอบ</label>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-4">
                                <label for="message" class="block text-gray-700 font-bold mb-2">บันทึก</label>
                                <p className="text-red-600 text-xs">*ถ้าไม่มีใส่ " - "</p>
                                <textarea class="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400" value={reason} onChange={inputValue('reason')} rows="5" required></textarea>
                            </div>
                            <div className="text-end">
                                <button type="submit" onClick={submitForm} class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-2">เช็คชื่อ</button>
                                <button onClick={() => navigate(-1)}  class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">ย้อนกล้บ</button>
                            </div>
                        </form>
                    </div>
                    
                    <div>
                        <div class="bg-white  rounded-2xl -mt-14 px-6 py-4 max-w-60">
                            <h2 class="text-3xl font-medium ">เช็คชื่อนักเรียน</h2>
                        </div>
                        <table className="block rounded-xl -mx-20 px-9 py-4 my-4 max-w-4xl divide-y divide-gray-200 overflow-x-auto bg-white">
                            <thead className=" bg-gray-50 text-sm font-bold">
                                <tr>
                                    <th className="px-2 py-2  text-gray-500  tracking-wider">
                                        ลำดับ
                                    </th>
                                    <th  className="px-2 py-2 text-gray-500  tracking-wider">
                                        ชื่อนักเรียน
                                    </th>
                                    <th  className="px-2 py-2  text-gray-500 tracking-wider">
                                        รายการตรวจสอบ
                                    </th>
                                    <th  className="px-2 py-2  text-gray-500 tracking-wider">
                                        ผลการตรวจสอบ
                                    </th>
                                    <th  className="px-2 py-2  text-gray-500 tracking-wider">
                                        วันที่ตรวจสอบ
                                    </th>
                                </tr>
                            </thead>
                            <tbody className=" bg-white rounded-xl divide-y divide-gray-200">
                                {chks.length > 0 && chks.map((chk, index) => (
                                    
                                <tr>
                                    <td class="px-2 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="ml-4">
                                        {index + 1} 
                                        </div>
                                    </div>
                                    </td>
                                    <td class="px-6 py-4  whitespace-wrap">
                                    <div class="flex items-center">
                                        <div class="">
                                        <div class="text-sm font-medium text-gray-900">
                                            {chk.lekti_id}
                                        </div>
                                        </div>
                                    </div>
                                    </td>
                                    
                                    <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="ml-4">
                                            {chk.mission}
                                        </div>
                                    </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="ml-4">
                                            {chk.check_name}
                                        </div>
                                    </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="ml-4">
                                            {new Date(chk.createdAt).toLocaleDateString('th-TH', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })}
                                        </div>
                                    </div>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
    };

export default ChknTable;
