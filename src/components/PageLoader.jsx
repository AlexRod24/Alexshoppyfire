import React from 'react';
import Loader from 'react-loader-spinner'

const PageLoader = () => {
  
     return(
      <div style={{width: '100%', margin:'20% auto'}}>
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      </div>
     )
 }

 export default PageLoader;

