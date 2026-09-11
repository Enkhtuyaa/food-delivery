 "use client"
 import { useState, useEffect } from "react";
import {server} from "../_api/api"
const getFoodcategory = async () =>{
  const response = await server.get("/food-category/get")
  console.log(response)
}

 export default function AdminPage() {
  const [data, setData] = useState([])
  useEffect(() => {
getFoodcategory()
  }, [])
  return (
    <div className="w-full" >
     Admin
    </div>
  );
}
