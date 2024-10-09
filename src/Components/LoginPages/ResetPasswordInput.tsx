import React, { useState } from "react";

const ResetPasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);
  const passwordRegex = new RegExp(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  );

  return <div></div>;
};

export default ResetPasswordInput;
