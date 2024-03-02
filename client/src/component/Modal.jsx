import {useState} from "react";
import "../Modal.css";
import axios from 'axios';
import Swal from 'sweetalert2'

const Modal =({closeModal})=> {

  const [state,setState] = useState({
    classroom: "",
    subject: "",
    profile: null
  })

  // destrucering
  const {classroom, subject, profile} = state

  // assign value state
  const inputValue =name=>event=>{
      setState({...state,[name]: event.target.value})
  }

  // Handle file change
  const handleFileChange = (event) => {
    setState({ ...state, profile: event.target.files[0] });
  };

  // submit form in db
  const submitForm=(e)=>{
    e.preventDefault();
    // console.log('API = http://localhost:5000/api')
    axios.post(`http://localhost:5000/api/createRoom`,{classroom, subject, profile}).then(response=>{
        closeModal()
      Swal.fire({
            title: "Great!",
            text: "Your classroom has been created successfully",
            icon: "success"
        });
        setState({...state,classroom:"",subject:"",profile:""})
        // back to /Dashboard
        setTimeout(() => {
          window.location.reload();
        }, 1000); 
    }).catch(err=>{
        Swal.fire('แจ้งเตือน',err.response.data.error,'error')
    })
  }
  
  return (
    <div className="modalBackground font-Poppins">
        <div className="modalContainer">
            <div className="titleCloseBtn">
                <h1 className="text-3xl mt-5 text-blue-500 font-bold">Create classroom</h1>
                <button onClick={() => {closeModal(false);}}> x </button>
            </div>
            {JSON.stringify(state)}
        <div className="flex items-center justify-center p-3">
        <div className="mx-auto w-full max-w-[550px] bg-white">
          <form className="py-6 px-9" onSubmit={submitForm}>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">ชื่อห้องเรียน</label>
                <input type="text" placeholder="Ex.ม.6/0" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] focus:outline-none focus:border-blue-400"value={classroom} onChange={inputValue('classroom')} />
            </div>

            <div className="mb-5">
              <label  className="mb-3 block text-base font-medium text-[#07074D]">ชื่อวิชา</label>
              <select class="border border-[#e0e0e0] p-2 w-full rounded-lg focus:outline-none focus:border-blue-400" onChange={inputValue('subject')} required>
                <option value="0">---</option>
                <option value="Thai Language">ภาษาไทย</option>
                <option value="Mathematics">คณิตศาสตร์</option>
                <option value="Science">วิทยาศาสตร์</option>
                <option value="Social Studies">สังคมศึกษา ศาสนา และวัฒนธรรม</option>
                <option value="Health and Physical Education">สุขศึกษาและพลศึกษา</option>
                <option value="Arts">ศิลปะ</option>
                <option value="Vocational Education">การงานพื้นฐานอาชีพ</option>
                <option value="English">ภาษาอังกฤษ</option>
                <option value="Foreign Language">ภาษาต่างประเทศ</option>
                <option value="Computer Science">วิทยาการคำนวณ</option>
                <option value="Design and Technology">การออกแบบและเทคโนโลยี</option>
              </select>
            </div>
            <input type="submit" className="hover:bg-blue-400 w-full rounded-md bg-blue-500 py-3 px-8 text-center text-base font-semibold text-white outline-none" value="เพิ่มห้องเรียน"/>

          </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
