import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";


import Input from "../Input";
import Modal from "../Modal";


const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    loginModal.onClose();
    registerModal.onOpen();
    
  }, [loginModal, registerModal, isLoading]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await signIn('credentials', {
        email,
        password,
      });

      loginModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [email, password, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input 
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}  
      />
      <Input 
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading} 
      />
    </div>
  )
  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>New To X
        <span 
            onClick={onToggle}
             className="
            text-white 
            cursor-pointer 
            hover:underline
          "
          > Create Account</span>
      </p>
    </div>
  )

  return (
    <Modal
    disabled={isLoading}
    isOpen={loginModal.isOpen}
    title="Login"
    actionLabel="Sign in"
    onClose={loginModal.onClose}
    onSubmit={onSubmit}
    body={bodyContent}
    footer={footerContent}

    />
  )
}

export default LoginModal
