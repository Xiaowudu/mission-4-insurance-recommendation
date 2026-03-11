const SubmitButton = ({ onClick,loading }: { onClick: () => void; loading: boolean }) => {
  return (
    <button onClick={onClick} className="submit-button" disabled={loading}>
      {loading ? "Loading..." : "Submit"}
    </button>
  );
};

export default SubmitButton;