import { authenticator } from "otplib";


/**
 * Genera la URL otpauth:// para Google Authenticator.
 */
export const generateOtpAuthUrl = (email, appName, secret) => {
  return authenticator.keyuri(email, appName, secret);
};

/**
 * Valida el OTP ingresado por el usuario.
 */
export const validateOtp = (otp, secret) => {
  return authenticator.check(otp, secret);
};
