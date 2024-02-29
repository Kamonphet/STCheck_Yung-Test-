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
            {/* {JSON.stringify(state)} */}
        <div className="flex items-center justify-center p-3">
        <div className="mx-auto w-full max-w-[550px] bg-white">
          <form className="py-6 px-9" onSubmit={submitForm}>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">ชื่อห้องเรียน</label>
                <input type="text" placeholder="Ex.ม.6/0" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none"value={classroom} onChange={inputValue('classroom')} />
            </div>

            <div className="mb-5">
              <label  className="mb-3 block text-base font-medium text-[#07074D]">ชื่อวิชา</label>
              <input type="text" placeholder="Ex.วิทยาการคำนวณ" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none"value={subject} onChange={inputValue('subject')} />
            </div>

            <div className="mb-6 pt-4 ">
              <label className="mb-5 block text-lg font-semibold text-[#07074D]">Upload File</label>
              <div className="mb-8">
                <input type="file" className="sr-only" onChange={handleFileChange} accept=".png, .jpg, .jpeg, .gif"/>
                <label  className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
                  <div>
                    <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                      Drop files here
                    </span>
                    <span className="mb-2 block text-base font-medium text-[#6B7280]">
                      Or
                    </span>
                    <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                      Browse
                    </span>
                  </div>
                </label>
              </div>
              <div class="flex items-center justify-between">
                <span class="truncate pr-3 text-base font-medium text-[#07074D]">
                  banner-design.png
                </span>
                <button class="text-[#07074D]">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z" fill="currentColor"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </div>
            <input type="submit" className="hover:bg-blue-400 w-full rounded-md bg-blue-500 py-3 px-8 text-center text-base font-semibold text-white outline-none" value="Send File"/>

          </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
