import { MdDeleteForever } from "react-icons/md";

interface Props {
  description: string;
  onDelete: () => void;
  randomColor: string;
}

const Note = ({ description, onDelete, randomColor }: Props) => {
  return (
    <div className="note" style={{ backgroundColor: randomColor }}>
      <p>{description}</p>
      <div className="delete-btn" onClick={onDelete}>
        <MdDeleteForever type="button" color="white" size="30" />
      </div>
    </div>
  );
};

export default Note;
