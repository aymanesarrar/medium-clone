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
  avatar_url?: string | null;
}
export interface ProfileData extends ProfileInputs {
  avatar_url: string;
  updated_at: string;
}
