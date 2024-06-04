import { useRouter } from '@tanstack/react-router';

import { useModal } from "@/hooks/use-modal.store.ts";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import LoginForm from "@/components/forms/login.form.tsx";

const LoginModal = () => {
  const { isOpen, type, onClose } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "login";

  const onSuccess = () => {
    onClose();
    router.invalidate();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>First login</DialogTitle>
        </DialogHeader>
        <LoginForm onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
