import { Helmet } from "react-helmet-async";
import axios from "axios";
import { NavBar } from '../components/NavBar';

const Admin = ({ headerData, setHeaderData, headerImage, setHeaderImage, header, getCount, setGetCount }) => {

   const handleImageChange = (event) => {
      setHeaderImage(event.target.files[0]);
   }

   const handleChange = (event) => {

      const {name, value} = event.target;
      // const name = event.target.name;
      // const value = event.target.value;   
      setHeaderData(values => ({...values, [name]: value}));
      
   }    
   
   const handleSubmit = async (event) => {
      event.preventDefault();
      
      const formData = new FormData();
      if(image){formData.append('image', headerImage);}
      
      if(isEmpty(headerData)){
         console.log("No form data to post");
      } else {
         if(headerData.site_title){formData.append('site_title', headerData.site_title);}
         if(headerData.tagline){ formData.append('tagline', headerData.tagline);}
      }
      
     
      
         try{
            const response = await axios.post("http://localhost:8888/api/header/save", formData, {
               headers: {'Content-Type': 'multipart/form-data'
            } 
            });
            console.log('Upload successful:', response.data);
            setGetCount(getCount + 1);
         } catch(error){
            console.error('Upload Error:', error);
            }
      

      
   };

   function isEmpty(obj) {
      for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
          return false;
        }
      }
    
      return true;
    }
   
   return(
      <>
         <Helmet>
            <title>{header.site_title + " Admin"}</title>
         </Helmet>
         <NavBar />
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
                        <th>Image</th>
                        <td>
                        <input type="file" id="image" name="image" onChange={handleImageChange}/>
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
            <p>{header.tagline}</p>
            <img src={header.image} width={200} />
         </div>
         

      </>
   
   )
};

export default Admin;