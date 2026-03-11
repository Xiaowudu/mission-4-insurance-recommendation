import { useState } from "react";

const UserInput: React.FC<{ onChange: (input: string) => void , input: string }> = ({ onChange, input }) => {
  return (
    <div className="user-input">
      <input
        type="text"
        value={input}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Reply..."
      />
    </div>
  );
}

export default UserInput;