import React from 'react'

 const Alert = ({type,text}) => {
    return (
        //variable className
        <div className={`alert alert-${type}`}>
            {text}
        </div>
    )
}

export default Alert;