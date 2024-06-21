import { useState } from "react";
import TestPage from "./TestPage";
import { LogContext } from "./useLog";

export default function Root() {
  const [value, setValue] = useState({});
  return (
    <LogContext.Provider value={value}>
      <TestPage />
      <button onClick={() => setValue({ name: "alien", author: "外星人" })}>
        点击
      </button>
    </LogContext.Provider>
  );
}
