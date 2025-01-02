import styles from "./mem-acc.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "@/Context/auth-context";
import { useRouter } from "next/router";
import axios from "axios";
import FormInputM from "../form-input";

const MemberACC = () => {
  const router = useRouter();
  const { auth } = useAuth(); // 獲取 auth 內容

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isEmailValid, setEmailValid] = useState(true);
  const [isPhoneValid, setPhoneValid] = useState(true);
  const [account, setAccount] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!auth.id) return; // 確保已登入且 auth 有 id

      try {
        const response = await axios.get(`http://localhost:3005/member/mem-data/by-id/${auth.id}`, {
          withCredentials: true,
        });
        const data = response.data;

        if (data.success) {
          const memberData = data.memberData;
          setAccount(memberData.m_account);
          setPhone(memberData.m_phone);
          setEmail(memberData.m_email);
        } else {
          console.warn("未獲取到有效的會員資料");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [auth.id]);

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailPattern.test(emailValue));
  };

  const handlePhoneChange = (e) => {
    const phoneValue = e.target.value;
    setPhone(phoneValue);
    const phonePattern = /^(\+?\d{1,4}[-.\s]?)?(\d{10})$/;
    setPhoneValid(phonePattern.test(phoneValue));
  };

  return (
    <>
      <div className={styles["member-acc"]}>
        <div className={styles.container}>
          <div className={styles["acc-main"]}>
            <h5 className={styles["main-title"]}>帳號設定</h5>
            <div className={styles["main-body"]}>
              <div className={styles["body-sec"]}>
                <h6 className={styles["body-title"]}>帳號(不會顯示於頁面)</h6>
                <div className={styles["body-input"]}>
                  <FormInputM size="medium" value={account} readOnly={true} />
                </div>
              </div>
              <div className={styles["body-sec"]}>
                <h6 className={styles["body-title"]}>手機</h6>
                <div className={styles["body-input"]}>
                  <FormInputM
                    size="medium"
                    value={phone}
                    onChange={handlePhoneChange}
                    isPhone={true}
                  />
                </div>
                {!isPhoneValid && (
                  <div className={styles["error-text"]}>
                    請輸入有效的手機號碼
                  </div>
                )}
              </div>
              <div className={styles["body-sec"]}>
                <h6 className={styles["body-title"]}>信箱</h6>
                <div className={styles["body-input"]}>
                  <FormInputM
                    size="medium"
                    value={email}
                    onChange={handleEmailChange}
                    isEmail={true}
                  />
                </div>
                {!isEmailValid && (
                  <div className={styles["error-text"]}>
                    請輸入有效的信箱地址
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberACC;
