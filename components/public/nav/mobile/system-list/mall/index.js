import Link from "next/link";


export default function MallList() {
  return (
    <>
      <div className="container display">
        <div className="triangle"></div>
        <ul>
        <li className="item">
            <Link href="/George/product">
            <div className="info">
              <p>Mall</p>
            </div>
            </Link>
          </li>
          <li className="item">
            <Link href="/George/category">
            <div className="info">
              <p>Pop</p>
            </div>
            </Link>
          </li>
          <li className="item">
            <Link href="#">
            <div className="info">
              <p>Rock</p>
            </div>
            </Link>
          </li>
          <li className="item">
            <Link href="#">
            <div className="info">
              <p>Blue</p>
            </div>
            </Link>
          </li>
          <li className="item">
            <Link href="#">
            <div className="info">
              <p>Soul</p>
            </div>
            </Link>
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
