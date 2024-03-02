// เก็บ token
export const auth = async(response,next)=>{
    if(window !=="undefined"){
        sessionStorage.setItem('token', JSON.stringify(response.data.token));
        sessionStorage.setItem('username', JSON.stringify(response.data.payload.user.name));
        sessionStorage.setItem('id', JSON.stringify(response.data.payload.user.id));
        sessionStorage.setItem('email', JSON.stringify(response.data.payload.user.email));
        sessionStorage.setItem('role', JSON.stringify(response.data.payload.user.role));
    }
    next()
}


// ดึงข้อมูล user
export const getUser = ()=> {
        if(sessionStorage.getItem("username")){
            const username = JSON.parse(sessionStorage.getItem("username"));
            const id= JSON.parse(sessionStorage.getItem("id"));
            const email=JSON.parse(sessionStorage.getItem("email"));
            const role = JSON.parse(sessionStorage.getItem("role"));
            return {username:username,id:id,email:email,role:role};
        }else{
            return false;
        }
}

// check user
export const isLoggedIn=()=>{
    let user = getUser();
    if (user) {
        return true;
    } else {
        window.location.href = "/";
    }
}

// log out
export const Logout=() => {
    sessionStorage.clear();
    window.location.href = "/";
}