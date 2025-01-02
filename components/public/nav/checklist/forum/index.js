import React from 'react'

export default function Forum() {
  return (
    <>
      <div className='container display'>
        <div className='triangle'></div>
        <ul className='forum-list'>
          <li className='item'>

            <div className="info">
              <p>Pop</p>
            </div>
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
          .container{
            position:fixed;
            z-index:1110;
            left:210px;
            top:105px;

            
          }
          .forum-list {
            display: flex;
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .item{
            border:1px solid #111;
            display:inline-block;
            background-color:#fff;
            padding:0 5px;
            
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
