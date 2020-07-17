import React from 'react'
import {Link} from 'react-router-dom'

export const  Landing = () => {
 return (
<section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">IdeaLab</h1>
          <p className="lead">
            Create a profile, share your unique insights with other entrepreneurs 
          </p>
          <div className="buttons">

            <Link to ="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>

          </div>
        </div>
      </div>
    </section>
 )
}

export default Landing