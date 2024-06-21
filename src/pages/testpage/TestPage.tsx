import React from "react";
import { useLog } from "./useLog";

const TestPage = () => {
  const [dom, reportMessage] = useLog();
  const divRef = dom as React.MutableRefObject<HTMLDivElement>;

  return (
    <div>
      {/* 监听内部点击 */}
      <div ref={divRef}>
        <p> 《useLog实现》</p>
        <button> 按钮 one (内部点击) </button>
        <button> 按钮 two (内部点击) </button>
        <button> 按钮 three (内部点击) </button>
      </div>
      {/* 外部点击 */}
      <button
        onClick={() => {
          console.log(reportMessage("这是上报数据", "click"));
        }}
      >
        外部点击
      </button>
    </div>
  );
};

export default React.memo(TestPage);
