import styles from "./mem-account.module.css";
import InfoNav from "../info-nav-liam";
import Nav from "@/components/public/nav";
import FooterDeskTop from "@/components/public/footer/desktop";
import PasswordInput from "@/components/public/PasswordInput";

const MemberAccount = () => {
  return (
    <>
      <Nav />
      <div className={styles.container}>
        <InfoNav />
        
        <div className={styles.right}>
          <div className={styles.line01}>
            <div className={styles.container2}>
              <h6 className={styles["main-title"]}>帳號設定</h6>
            </div>
            <div className={styles.s01}>
              <div className={styles.frameParent}>
                <div className={styles.frame}>
                  <div className={styles.guavavibe}>帳號(不會顯示於頁面)</div>
                </div>
                <PasswordInput />
                {/* <div className={styles.frameGroup}>
                  <div className={styles.iconsEssentialsParent}>
                    <img
                      className={styles.iconsEssentials}
                      alt=""
                      src="icons-Essentials.svg"
                    />
                    <div className={styles.guavavibe}>GuavaVibe</div>
                  </div>
                  <div className={styles.check}>
                    <div className={styles.check1}>
                      <div className={styles.guavavibe}>已驗證</div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className={styles.s01}>
              <div className={styles.frameParent}>
                <div className={styles.div9}>手機</div>
                <PasswordInput />
                
              </div>
            </div>
            <div className={styles.s01}>
              <div className={styles.frameParent}>
                <div className={styles.frame}>
                  <div className={styles.guavavibe}>信箱</div>
                </div>
                <PasswordInput />

                {/* <div className={styles.frameGroup}>
                  <div className={styles.iconsEssentialsParent}>
                    <img
                      className={styles.iconsAudio}
                      alt=""
                      src="icons-messages.svg"
                    />
                    <div className={styles.guavavibe}>ballad@gmail.com</div>
                  </div>
                  <div className={styles.check}>
                    <div className={styles.check1}>
                      <div className={styles.guavavibe}>已驗證</div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            {/* 背景線條底圖
             <div className={styles.line01Inner}>
              <img className={styles.frameChild} alt="" src="Vector 6.svg" />
            </div> */}
            
          </div>
          
        </div>
        
      </div>
      <FooterDeskTop />
    </>
  );
};

export default MemberAccount;
