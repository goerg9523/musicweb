export default function FundraisingList() {
  return (
    <>
      <div className="container display">
        <div className="triangle"></div>
        <ul>
          <li className="item">
            <a href="#">
            <div className="info">
              <p>Pop</p>
            </div>
            </a>
          </li>
          <li className="item">
            <a href="#">
            <div className="info">
              <p>Rock</p>
            </div>
            </a>
          </li>
          <li className="item">
            <a href="#">
            <div className="info">
              <p>Blue</p>
            </div>
            </a>
          </li>
          <li className="item">
            <a href="#">
            <div className="info">
              <p>Soul</p>
            </div>
            </a>
          </li>
        </ul>
      </div>
      <style jsx>
        {`
          li{
          background-color:#333;
          border-bottom: .5px solid #fff

        }
        li a{
          display:block;
          padding:5px;
          color:#fff;
          border-bottom:#fff
        }
        `}
      </style>
    </>
  );
}
