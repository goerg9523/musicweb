import styles from "./SectionOrder.module.css";
import Nav from "@/components/public/nav";
import InfoNav from "../info-nav-liam";

const MemberOrder = () => {
  return (
    <>
    <Nav />
 <div className={styles.sectionOrder}>
<InfoNav />
<div className={styles.right}>
  <div className={styles.orderTitleWrapper}>
    <div className={styles.orderTitle}>
      <div className={styles.container}>
        <b className={styles.b2}>可使用</b>
      </div>
      <div className={styles.frame}>
        <div className={styles.b2}>已失效</div>
      </div>
    </div>
  </div>
  <div className={styles.discount}>
    <div className={styles.discountStatusParent}>
      <div className={styles.discountStatus}>
        <div className={styles.div8}>滿千折百</div>
      </div>
      <div className={styles.discountStatus1}>
        <div className={styles.div8}>可使用</div>
      </div>
    </div>
    <div className={styles.frameParent}>
      <div className={styles.parent}>
        <div className={styles.b1}>結帳輸入：</div>
        <div className={styles.b1}>happy1111</div>
      </div>
      <div className={styles.frameGroup}>
        <div className={styles.frameDiv}>
          <div className={styles.b1}>使用期限：</div>
        </div>
        <div className={styles.discountStatusWrapper}>
          <div className={styles.discountStatus1}>
            <div className={styles.div12}>領取後7天</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className={styles.discount}>
    <div className={styles.discountStatusParent}>
      <div className={styles.discountStatus}>
        <div className={styles.div8}>滿千折百</div>
      </div>
      <div className={styles.discountStatus1}>
        <div className={styles.div8}>已使用</div>
      </div>
    </div>
    <div className={styles.frameParent}>
      <div className={styles.parent}>
        <div className={styles.b1}>結帳輸入：</div>
        <div className={styles.b1}>happy1111</div>
      </div>
      <div className={styles.frameGroup}>
        <div className={styles.frameDiv}>
          <div className={styles.b1}>使用期限：</div>
        </div>
        <div className={styles.discountStatusWrapper}>
          <div className={styles.discountStatus1}>
            <div className={styles.div12}>領取後7天</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className={styles.discount}>
    <div className={styles.discountStatusParent}>
      <div className={styles.discountStatus}>
        <div className={styles.div8}>兩件免運</div>
      </div>
      <div className={styles.discountStatus1}>
        <div className={styles.div8}>已過期</div>
      </div>
    </div>
    <div className={styles.frameParent}>
      <div className={styles.parent}>
        <div className={styles.b1}>結帳輸入：</div>
        <div className={styles.b1}>happy1111</div>
      </div>
      <div className={styles.frameGroup}>
        <div className={styles.frameDiv}>
          <div className={styles.b1}>使用期限：</div>
        </div>
        <div className={styles.discountStatusWrapper}>
          <div className={styles.discountStatus1}>
            <div className={styles.div8}>當月份</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
    </>
   
  );
};

export default MemberOrder;
