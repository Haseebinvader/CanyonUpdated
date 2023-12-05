import React from 'react'

 

const CartBtn = ({text, onClick}) => {

  return (

    <div style={{

        backgroundColor: '#F4976C',cursor:'pointer',width:"22px",height:"22px", textAlign:'center',

        borderRadius:"50px",margin:"8px"

    }}
    onClick={onClick}
    >

        {text}

    </div>

  )

}

 

export default CartBtn