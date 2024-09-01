import { Helmet } from "react-helmet-async"

import content from '../components/content.json'

const Admin = ({setData, data}) => {

   const updateSiteTitle = () => {
      setData({...data, 
         "name": "Test Update"
      });
      console.log("did call");
   }
   
   return(
      <>
         <Helmet>
            <title>{content['siteTitle'] + " Admin"}</title>
         </Helmet>
         <h1>This will be the Admin Page</h1>
         <button onClick={updateSiteTitle}>Update Site Title</button> 
      </>
   
   )
};

export default Admin;