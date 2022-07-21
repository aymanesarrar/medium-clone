export interface ModalProps {
  children: JSX.Element;
  show: boolean;
  onClose: () => void;
}
export interface ProfileInputs {
  firstname: string;
  lastname: string;
  username: string;
  website: string;
}
