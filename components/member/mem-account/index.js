import styles from "./mem-account.module.css";
import InfoNav from "../info-nav-liam";
import Nav from "@/components/public/nav";
import FooterDeskTop from "@/components/public/footer/desktop";
import PasswordInput from "@/components/public/PasswordInput";
import ButtonShow from "../button-show";
import FormInput from "@/components/public/form-input";

const MemberAccount = () => {
  return (
    <>
      <Nav />

      <div className={styles["member-acc"]}>
        <div className={styles["container"]}>
          <div className={styles["acc-nav"]}>
            <InfoNav />
          </div>
          <div className={styles["main-container"]}>
            <div className={styles["acc-main"]}>
              <h6 className={styles["main-title"]}>帳號設定</h6>

              <div className={styles["main-body"]}>
                <div className={styles["body-sec"]}>
                  <div className={styles["body-title"]}>帳號</div>
                  <div className={styles["body-input"]}>
                    <PasswordInput /> <ButtonShow size="small" />
                  </div>
                </div>

                <div className={styles["body-sec"]}>
                  <div className={styles["body-title"]}>信箱</div>
                  <div className={styles["body-input"]}>
                    <PasswordInput /> <ButtonShow size="small" />
                  </div>
                </div>
                <hr/>
                <div className={styles["body-sec"]}>
                  <div className={styles["body-title"]}>手機</div>
                  <div className={styles["body-input"]}>
                    <FormInput /> <ButtonShow size="small" />
                  </div>
                </div>
                <div className={styles["body-sec"]}>
                  <div className={styles["body-title"]}>手機</div>
                  <div className={styles["body-input"]}>
                    <FormInput /> <ButtonShow size="small" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      {/* <FooterDeskTop /> */}

    </>
  );
};

export default MemberAccount;
