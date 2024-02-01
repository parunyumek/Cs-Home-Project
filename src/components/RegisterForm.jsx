"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../supabase";

import Link from "next/link";
import { useRouter } from "next/navigation";



const RegisterForm = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPasswordValidator, setShowPasswordValidator] = useState(false);
  const [showFullNameValidator, setShowFullNameValidator] = useState(false);
  const [showPhoneNumberValidator, setShowPhoneNumberValidator] =
    useState(false);
  const [showEmailValidator, setShowEmailValidator] = useState(false);

  const [isFullNameValid, setIsFullNameValid] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const router = useRouter();
  ////

  const validateName = (name) => {
    // Your validation logic here
    // อักษรต้องไม่น้อยกว่า 0 = null ยาวไม่เกิน 50 ประกอบด้วยอักษรไทย +$/u ทำให้สามารถใช้สระได้ด้วย
    return (
      name.length > 0 && name.length <= 50 && /^[A-Za-zก-๙\s]+$/u.test(name)
    );
  };

  const validatePhoneNumber = (phoneNumber) => {
    // เช็คเบอร์ต้อง 10 ตัว และเป็นตัวเลข
    return phoneNumber.length === 10 && /^[0-9]+$/.test(phoneNumber);
  };

  const validateEmail = (email) => {
    // เข็คค่าเมลไม่ว่างเปล่า และเป็นรูปแบบอีเมล และมี domain ที่ระบุเสมอ
    return (
      email.length > 0 &&
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/.test(
        email
      )
    );
  };

  const validatePassword = (password) => {
    const hasLength = password.length >= 8;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);

    return hasLength && hasSpecialChar && hasUpperCase && hasLowerCase;
  };

  const FullNameValidator = ({ fullName }) => {
    const [lengthError, setLengthError] = useState(false);
    const [blankError, setBlankError] = useState(false);
    const [invalidCharactersError, setInvalidCharactersError] = useState(false);

    // Move the validation logic directly into the component
    const validateName = () => {
      if (fullName !== undefined && fullName !== null) {
        const trimmedName = fullName.trim();

        setBlankError(trimmedName === "");
        setLengthError(trimmedName.length > 50);
        setInvalidCharactersError(!/^[A-Za-zก-๙\s]+$/u.test(trimmedName));
      }
    };

    useEffect(() => {
      validateName(); // Call the validation function directly

      // No need to call setIsFullNameValid here
    }, [fullName]);

    return (
      <div className="ml-[70px] mt-2">
        {blankError && (
          <div className="text-red-500 text-xs">
            {" "}
            • ชื่อ-นามสกุล ห้ามเป็นค่าว่าง
          </div>
        )}
        {lengthError && (
          <div className="text-red-500 text-xs">
            {" "}
            • ชื่อ-นามสกุล ต้องมีความยาวไม่เกิน 50 ตัวอักษร
          </div>
        )}
        {invalidCharactersError && (
          <div className="text-red-500 text-xs">
            {" "}
            • ชื่อ-นามสกุล ไม่สามารถมีเครื่องหมายหรืออักขระพิเศษได้
          </div>
        )}
      </div>
    );
  };

  const PhoneNumberValidator = ({ phoneNumber }) => {
    const [emptyError, setEmptyError] = useState(false);
    const [numberError, setNumberError] = useState(false);
    const [lengthError, setLengthError] = useState(false);

    const validatePhoneNumber = () => {
      // Check if the phoneNumber is not undefined, not null, not blank
      if (phoneNumber !== undefined && phoneNumber !== null) {
        const trimmedPhoneNumber = phoneNumber.toString().trim();

        setEmptyError(trimmedPhoneNumber === "");

        // Check if the phoneNumber contains only numbers
        setNumberError(!/^[0-9]+$/.test(trimmedPhoneNumber));

        // Check if the phoneNumber contains exactly 10 numbers
        setLengthError(trimmedPhoneNumber.length !== 10);
      }
    };
    useEffect(() => {
      validatePhoneNumber(); // Call the validation function directly
    }, [phoneNumber]);

    return (
      <div className="ml-[70px] mt-2">
        {emptyError && (
          <div className="text-red-500 text-xs">
            {" "}
            • เบอร์โทรศัพท์ ห้ามเป็นค่าว่างเปล่า
          </div>
        )}
        {numberError && (
          <div className="text-red-500 text-xs">
            {" "}
            • เบอร์โทรศัพท์ ต้องประกอบด้วยตัวเลขเท่านั้น
          </div>
        )}
        {lengthError && (
          <div className="text-red-500 text-xs">
            {" "}
            • เบอร์โทรศัพท์ ต้องมีความยาว 10 ตัวเลข
          </div>
        )}
      </div>
    );
  };

  const EmailValidator = ({ email }) => {
    const [emptyError, setEmptyError] = useState(false);
    const [formatError, setFormatError] = useState(false);
    const [domainError, setDomainError] = useState(false);

    const validateEmail = () => {
      // Check if the email is not undefined, not null, and not blank
      if (email !== undefined && email !== null) {
        const trimmedEmail = email.trim();

        setEmptyError(trimmedEmail === "");

        // Check if the email format is valid
        const validFormat =
          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(
            trimmedEmail
          );
        setFormatError(!validFormat);

        // Check if the email has a valid domain
        const domain = trimmedEmail.split("@")[1];
        const validDomain = /^[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(domain);
        setDomainError(!validDomain);
      }
    };

    useEffect(() => {
      validateEmail();
    }, [email]);

    return (
      <div className="ml-[70px] mt-2">
        {emptyError && (
          <div className="text-red-500 text-xs">
            {" "}
            • อีเมลไม่สามารถเป็นค่าว่างได้
          </div>
        )}
        {formatError && (
          <div className="text-red-500 text-xs"> • รูปแบบอีเมลไม่ถูกต้อง </div>
        )}
        {domainError && (
          <div className="text-red-500 text-xs">
            {" "}
            • โปรดระบุโดเมน ของอีเมลที่ถูกต้อง (เช่น .com .net เป็นต้น)
          </div>
        )}
      </div>
    );
  };

  const PasswordValidator = ({ password }) => {
    const [isEmptyError, setIsEmptyError] = useState(false);
    const [specialCharError, setSpecialCharError] = useState(false);
    const [upperCaseError, setUpperCaseError] = useState(false);
    const [lowerCaseError, setLowerCaseError] = useState(false);
    const [minLengthError, setMinLengthError] = useState(false);

    useEffect(() => {
      const validatePassword = (password) => {
        // Check if the password is null or blank
        if (password === null || password.trim() === "") {
          setIsEmptyError(true);
          setSpecialCharError(false);
          setUpperCaseError(false);
          setLowerCaseError(false);
          setMinLengthError(false);
        } else {
          setIsEmptyError(false);

          // Password is not empty, proceed with other validations
          const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
          const hasUpperCase = /[A-Z]/.test(password);
          const hasLowerCase = /[a-z]/.test(password);
          const hasMinLength = password.length >= 8;

          setSpecialCharError(!hasSpecialChar);
          setUpperCaseError(!hasUpperCase);
          setLowerCaseError(!hasLowerCase);
          setMinLengthError(!hasMinLength);
        }
      };

      validatePassword(password);
    }, [password]);

    return (
      <div className="ml-[70px] mt-2">
        {isEmptyError && (
          <div className="text-red-500 text-xs">
            {" "}
            • รหัสผ่านห้ามเป็นค่าว่างเปล่า
          </div>
        )}
        {specialCharError && (
          <div className="text-red-500 text-xs">
            {" "}
            • รหัสผ่านต้องมีอักขระพิเศษ อย่างน้อย 1 ตัว
          </div>
        )}
        {upperCaseError && (
          <div className="text-red-500 text-xs">
            {" "}
            • รหัสผ่านต้องเป็นอักษรภาษาอังกฤษเท่านั้น และมีตัวพิมพ์ใหญ่
            อย่างน้อย 1 ตัว
          </div>
        )}
        {lowerCaseError && (
          <div className="text-red-500 text-xs">
            {" "}
            • รหัสผ่านต้องเป็นอักษรภาษาอังกฤษเท่านั้น และมีตัวพิมพ์เล็ก
            อย่างน้อย 1 ตัว
          </div>
        )}
        {minLengthError && (
          <div className="text-red-500 text-xs">
            {" "}
            • รหัสผ่านต้องมีความยาว อย่างน้อย 8 ตัวอักษร
          </div>
        )}
      </div>
    );
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
    setShowFullNameValidator(true); // Show the full name validator when the user starts typing
    // ทำการ validate และอัพเดท state ของช่อง input นี้
    setIsFullNameValid(validateName(event.target.value));
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
    setShowPhoneNumberValidator(true); // Show the full name validator when the user starts typing
    setIsPhoneNumberValid(validatePhoneNumber(event.target.value));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setShowPasswordValidator(true); // Show the full name validator when the user starts typing
    setIsPasswordValid(validatePassword(event.target.value));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setShowEmailValidator(true); // Show the full name validator when the user starts typing
    setIsEmailValid(validateEmail(event.target.value));
  };

  const handleCheckboxChange = () => {
    // Check if all required inputs are not empty
    const allInputsFilled =
      fullName !== "" && phoneNumber !== "" && email !== "" && password !== "";

    // If all inputs are filled, allow the checkbox to be ticked
    if (allInputsFilled) {
      // Handle checkbox logic here
    } else {
      // If any input is empty or there are validation errors, show an alert
      alert("กรุณากรอกข้อมูลให้ครบทุกข้อ");

      // Uncheck the checkbox
      document.getElementById("checkbox-agreement").checked = false;
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      // ตรวจสอบข้อมูลในแบบฟอร์ม

      const { user, error } = await supabase.auth.signUp({
        fullName,
        phoneNumber,
        email,
        password,
      });

      if (error) {
        console.error("Error registering user:", error.message);
      } else {
        // ลงทะเบียนผู้ใช้สำเร็จ
        console.log("User registered successfully.");

        const { data, error } = await supabase.from("users").insert([
          {
            fullname: fullName,
            phone_no: phoneNumber,
            email,
            password,
            created_at: new Date(),
          },
        ]);

        if (error) {
          console.error("Error adding user data to table:", error.message);
        } else {
          console.log("User data added to table successfully:", data);
          router.push("/login");
        }
      }
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div className=" flex items-center justify-center   bg-[#f3f4f6]  h-screen ">
        <div className="w-[600px] h-auto pb-10 bg-white rounded-[5px] shadow border border-zinc-300 flex-col justify-center items-center">
          <div className=" ">
            <h1 className="text-blue-950 text-3xl font-bold mb-3 text-center pt-[41px]">
              ลงทะเบียน
            </h1>

            <div className="flex flex-col mb-5">
              <label
                htmlFor="fullName"
                className="block w-[460px] h-4 text-zinc-700 text-base font-semibold mb-3 mx-auto"
              >
                ชื่อ - นามสกุล<span className="text-rose-700">*</span>
              </label>
              <input
                type="text"
                className="border-zinc-400 w-[460px] h-9 bg-white rounded border focus:outline-none focus:ring-1 focus:ring-blue-600 p-2 
                  showFullNameValidator
                 mx-auto text-black"
                placeholder=" กรุณากรอกชื่อและนามสกุล"
                value={fullName}
                id="fullName"
                onChange={handleFullNameChange}
              />
              {showFullNameValidator && (
                <FullNameValidator fullName={fullName} />
              )}
            </div>

            <div className="flex flex-col mb-5">
              <label
                htmlFor="phoneNumber"
                className="block w-[460px] h-4 text-zinc-700 text-base font-semibold mb-3 mx-auto"
              >
                เบอร์โทรศัพท์<span className="text-rose-700">*</span>
              </label>
              <input
                type="tel"
                pattern="[0-9]*"
                className="border-zinc-400 w-[460px] h-9 bg-white rounded border focus:outline-none focus:ring-1 focus:ring-blue-600 p-2 
                  showFullNameValidator
                 mx-auto text-black"
                placeholder=" กรุณากรอกเบอร์โทรศัพท์"
                value={phoneNumber}
                id="phoneNumber"
                onChange={handlePhoneNumberChange}
              />
              {showPhoneNumberValidator && (
                <PhoneNumberValidator phoneNumber={phoneNumber} />
              )}
            </div>

            <div className="flex flex-col mb-5">
              <label
                htmlFor="email"
                className="block w-[460px] h-4 text-zinc-700 text-base font-semibold mb-3 mx-auto"
              >
                อีเมล<span className="text-rose-700">*</span>
              </label>
              <input
                type="email"
                className="border-zinc-400 w-[460px] h-9 bg-white rounded border focus:outline-none focus:ring-1 focus:ring-blue-600 p-2 
                  showFullNameValidator
                 mx-auto text-black"
                placeholder=" กรุณากรอกอีเมล"
                value={email}
                id="email"
                onChange={handleEmailChange}
              />
              {showEmailValidator && <EmailValidator email={email} />}
            </div>

            <div className="flex flex-col mb-6">
              <label
                htmlFor="password"
                className="block w-[460px] h-4 text-zinc-700 text-base font-semibold mb-3 mx-auto"
              >
                รหัสผ่าน<span className="text-rose-700">*</span>
              </label>
              <input
                type="password"
                className="border-zinc-400 w-[460px] h-9 bg-white rounded border focus:outline-none focus:ring-1 focus:ring-blue-600 p-2 
                showFullNameValidator
               mx-auto text-black"
                placeholder=" กรุณากรอกรหัสผ่าน"
                value={password}
                id="password"
                onChange={handlePasswordChange}
              />
              {showPasswordValidator && (
                <PasswordValidator password={password} />
              )}
            </div>

            <div className=" text-center">
              <div className="mb-5 ">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="checkbox-agreement"
                    name="checkbox-agreement"
                    className="mr-3 w-5 h-5"
                    required
                    onChange={handleCheckboxChange}
                  />
                  <label
                    htmlFor="checkbox-agreement"
                    className="text-black text-sm"
                  >
                    ยอมรับ{" "}
                    <a
                      href="https://example.com/terms"
                      suppressHydrationWarning
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-600 font-semibold"
                    >
                      ข้อตกลงและเงื่อนไข
                    </a>{" "}
                    และ{" "}
                    <a
                      href="https://example.com/terms"
                      suppressHydrationWarning
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-600 font-semibold"
                    >
                      และนโยบายความเป็นส่วนตัว
                    </a>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className={`w-[460px] h-10 bg-blue-600 rounded text-white mb-4 mx-auto ${
                  isFullNameValid &&
                  isPhoneNumberValid &&
                  isEmailValid &&
                  isPasswordValid
                    ? "" // ถ้าทุก input ถูกต้อง
                    : "cursor-not-allowed opacity-50"
                }`}
                disabled={
                  !isFullNameValid ||
                  !isPhoneNumberValid ||
                  !isEmailValid ||
                  !isPasswordValid
                }
              >
                ลงทะเบียน
              </button>
              <div>
                <Link
                  className=" underline text-base text-blue-600 font-semibold"
                  href="/login"
                >
                  กลับไปหน้าเข้าสู่ระบบ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
