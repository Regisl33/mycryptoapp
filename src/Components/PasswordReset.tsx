import { ChangeEvent, FormEvent, useState } from "react";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const content = isSubmitted ? (
    <p>
      a link to reset your password as been sent to your email adresse: {email}
    </p>
  ) : (
    <form className="main">
      <label className="offscreen" htmlFor="passwordReset">
        Enter your email adress
      </label>
      <input
        type="text"
        id="passwordReset"
        placeholder="Enter your email adress"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        required
      />
      <input
        type="submit"
        value="Send"
        onSubmit={(e: FormEvent<HTMLInputElement>) => handleSubmit(e)}
      />
    </form>
  );

  return content;
};

export default PasswordReset;
