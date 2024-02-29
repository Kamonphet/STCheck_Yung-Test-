// เก็บ token
export const auth = async(response,next)=>{
    if(window !=="undefined"){
        sessionStorage.setItem('token', JSON.stringify(response.data.token));
        sessionStorage.setItem('username', JSON.stringify(response.data.payload.user.name));
        sessionStorage.setItem('id', JSON.stringify(response.data.payload.user.id));
        sessionStorage.setItem('e-mail', JSON.stringify(response.data.payload.user.email));
        sessionStorage.setItem('role', JSON.stringify(response.data.payload.user.role));
    }
    next()
}


// ดึงข้อมูล user
export const getUser = ()=> {
        if(sessionStorage.getItem("username")){
            return JSON.parse(sessionStorage.getItem("username"));
        }else if(sessionStorage.getItem("id")){
            return JSON.parse(sessionStorage.getItem("id"));
        }else if(sessionStorage.getItem("e-mail")){
            return JSON.parse(sessionStorage.getItem("e-mail"));
        }else if(sessionStorage.getItem("role")){
            return JSON.parse(sessionStorage.getItem("role"));
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