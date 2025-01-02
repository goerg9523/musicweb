import React from 'react'
import Link from 'next/link'

export default function Fundraising() {
  return (
    <>
      <div className='container display'>
        <div className='triangle'></div>
        <ul >
          <li className='item'>
            <Link href="/Liam/Categories">
            <div className="info">
              <p>Pop</p>
            </div>
            </Link>
          </li>
          <li className='item'>

            <div className="info">
              <p>Rock</p>
            </div>
          </li>
          <li className='item'>

            <div className="info">
              <p>Blue</p>
            </div>
          </li>
          <li className='item'>

            <div className="info">
              <p>Soul</p>
            </div>
          </li>
        </ul>
      </div>
      <style jsx>
        {`
                {/* .display{
                    display:block
          } */}
          .container{
            position:absolute;
            z-index:10;
            left:0;
            top:100px;
            
          }
          ul{
            display:flex;
          }
          .item{
            border:1px solid #111;
            display:inline-block;
            position:relative;
            padding:10px 5px;
            background-color:#fff
            
          }
          .item:hover {
          background-color:#14ff00;
          cursor:pointer
          }
          
          .triangle {
           
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 10px 10px 10px;
            border-color: transparent transparent black transparent;
            position:absolute;
            top:-10px;
            left:10px
          

          }
        `}
      </style>

    </>

  )
}
