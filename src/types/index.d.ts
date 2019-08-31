export interface TalkProps {
  text: string;
  onTextChange: (event) => void;
  onShout: (event) => void;
}

export interface ShoutProps {
  text: string;
  onClose: (event) => void;
}
