import { useState } from "react";
import styles from "./mem-password.module.css";
import PasswordInput from "@/components/public/PasswordInput";
import { useAuth } from "@/Context/auth-context";

const MemberPassword = () => {
  const { getAuthHeader } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  const handleChangePassword = async () => {
    console.log("currentPassword:", currentPassword);
    console.log("newPassword:", newPassword);
    console.log("confirmPassword:", confirmPassword);

    setError("");
    setSuccess("");
    setShowSuccessOverlay(false);

    if (!currentPassword || !newPassword) {
      setError("請填寫所有密碼欄位");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("新密碼和確認密碼不一致");
      return;
    }

    const authHeader = getAuthHeader();
    console.log("authHeader:", authHeader);

    if (!authHeader || !authHeader.Authorization) {
      setError("請先登入");
      return;
    }

    try {
      console.log("發送請求到後端...");
      const response = await fetch("http://localhost:3005/member/update-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...authHeader,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();
      console.log("後端回應資料:", data);
      if (response.ok) {
        setShowSuccessOverlay(true);
        setTimeout(() => setShowSuccessOverlay(false), 2000); // 成功提示顯示1秒
        setSuccess("密碼更新成功");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(data.message || "密碼更新失敗，請稍後再試");
      }
    } catch (error) {
      console.error("伺服器錯誤:", error);
      setError("伺服器錯誤，請稍後再試");
    }
  };

  return (
    <div className={styles["member-pw"]}>
      <div className={styles.container}>
        <div className={styles["pw-main"]}>
          <h5 className={styles["main-title"]}>變更密碼</h5>

          <div className={styles["main-body"]}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <div className={styles["body-sec"]}>
              <h6 className={styles["body-title"]}>舊密碼</h6>
              <div className={styles["body-input"]}>
                <PasswordInput
                  size="large"
                  placeholder="請輸入舊密碼"
                  value={currentPassword}
                  onChange={(e) => {
                    console.log("舊密碼輸入:", e.target.value);
                    setCurrentPassword(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className={styles["body-sec"]}>
              <h6 className={styles["body-title"]}>新密碼</h6>
              <div className={styles["body-input"]}>
                <PasswordInput
                  size="large"
                  placeholder="請輸入新密碼"
                  value={newPassword}
                  onChange={(e) => {
                    console.log("新密碼輸入:", e.target.value);
                    setNewPassword(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className={styles["body-sec"]}>
              <h6 className={styles["body-title"]}>確認新密碼</h6>
              <div className={styles["body-input"]}>
                <PasswordInput
                  size="large"
                  placeholder="請再次輸入新密碼"
                  value={confirmPassword}
                  onChange={(e) => {
                    console.log("確認新密碼輸入:", e.target.value);
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>
            </div>

            <button onClick={handleChangePassword} className={styles["submit-button"]}>
              修改密碼
            </button>
          </div>
        </div>
      </div>
      {showSuccessOverlay && (
        <div className={styles.successOverlay}>
          <div className={styles.successMessage}>
            <p>密碼更新成功!</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default MemberPassword;
