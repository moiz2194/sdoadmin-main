import React, { useEffect } from 'react'
import "./404.css"
const NotFound = () => {
  useEffect(() => {
  const navvar=document.getElementById("navbar")
  if(navvar){

      navvar.style.display="none"
  }
  const footvar=document.getElementById("footer")
  if(footvar){

      footvar.style.display="none"
  }
  }, [])
  
  return (
    <section className='page_404'>
     <div className="container404">
        <div className="row">
            <div className="col-sm-12">
                <div className="col-sm-10 col-sm-offset-1 text-center">
                  <div className="four_zero_four_bg">
                    <h1 className='text-center'>404</h1>
                  </div>
                  <div className="constan_box_404">
                    <h3 className='h2'>Look like you're lost</h3>
                    <p>the page you are looking for is not available</p>
                    <a href="/" className='link_404'>Go to Home</a>
                  </div>
                </div>
            </div>
        </div>
     </div>
    </section>
  )
}

export default NotFound