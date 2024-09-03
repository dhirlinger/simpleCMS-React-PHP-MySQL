import { Helmet } from "react-helmet-async"

import content from '../components/content.json'

const Admin = () => {
/*
   const updateSiteTitle = () => {
      setData({...data, 
         "name": "Test Update"
      });
      console.log("did call");
   }
   */
   return(
      <>
         <Helmet>
            <title>{/*content['siteTitle'] +*/ " Admin"}</title>
         </Helmet>
         <div>
            <h1>Admin Page</h1>
            <hr/ >
            <h2>Header Content</h2>
            <form>
               <table cellSpacing="8">
                  <tbody>
                     <tr>
                        <th>
                           <label>Site Title</label>
                        </th>
                        <td>
                           <input type="text" name="site_title" />
                        </td>
                     </tr>
                     <tr>
                        <th>
                           <label>Tagline</label>
                        </th>
                        <td>
                           <input type="text" name="tagline" /> 
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