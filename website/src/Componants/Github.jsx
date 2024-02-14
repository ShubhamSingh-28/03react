import { useEffect, useState } from "react";

function GitHub() {
    const[data, setdata] = useState([])
    useEffect(()=>{
        fetch('http://api.github.com/users/Noobdev28')
        .then(response=> response.json())
        .then(data => {
            console.log(data);
            setdata(data)
        })
    }, [])
    return(
        <div className=" bg-gray-600 text-center text-white m-4">
            <div className=" text-2xl ">Github name: {data.name}</div>
            
             <img src={data.avatar_url} alt="Git Profile" width={200} />
        </div>
    )
    
}
export default GitHub