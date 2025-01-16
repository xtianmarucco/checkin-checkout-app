import OtpSetup from "../components/opt-setup/Otp-Setup";

export default function ConfigureOtp() {
  return (
    <div>
      Configure your OTP
      <div className="flex flex-col items-center p-8">
       <OtpSetup/>
      </div>
    </div>
  );
}
