import { Helmet } from "react-helmet-async"
import { useState } from "react";
import axios from "axios";

const Admin = () => {

   const [inputs, setInputs] = useState({});

   const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
   }
   const handleSubmit = (event) => {
      event.preventDefault();

      axios.post('http://localhost:8888/api/header/save', inputs);
      console.log(inputs);
   }

   return(
      <>
         <Helmet>
            <title>{/*content['siteTitle'] +*/ " Admin"}</title>
         </Helmet>
         <div>
            <h1>Admin Page</h1>
            <hr/ >
            <h2>Header Content</h2>
            <form onSubmit={handleSubmit}>
               <table cellSpacing="8">
                  <tbody>
                     <tr>
                        <th>
                           <label>Site Title</label>
                        </th>
                        <td>
                           <input type="text" name="site_title" onChange={handleChange} />
                        </td>
                     </tr>
                     <tr>
                        <th>
                           <label>Tagline</label>
                        </th>
                        <td>
                           <input type="text" name="tagline" onChange={handleChange} /> 
                        </td>
                     </tr>
                     <tr>
                        <td colSpan="2" align="right">
                           <button>Update</button>
                        </td>
                     </tr>
                  </tbody>
               </table>
               
            </form>
         </div>
         

      </>
   
   )
};

export default Admin;