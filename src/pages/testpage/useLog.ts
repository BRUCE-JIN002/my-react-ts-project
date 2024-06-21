import React, { useCallback, useContext, useEffect, useRef } from "react";

export const LogContext = React.createContext({});

export type ReportMessageType = "pv" | "click";

type LogReturnType = [
  React.RefObject<HTMLElement>,
  (data: any, type: ReportMessageType) => void
];

export const useLog = (): LogReturnType => {
  /* 一些公共参数 */
  const message = useContext(LogContext);
  const listenDOM = useRef<HTMLDivElement | null>(null);

  /* 分清依赖关系 -> message 改变，   */
  const reportMessage = useCallback(
    (data: unknown, type: ReportMessageType) => {
      if (type === "pv") {
        // pv 上报
        console.log("组件 pv 上报", message);
      } else if (type === "click") {
        // 点击上报
        console.log("组件 click 上报", message, data);
      }
    },
    [message]
  );

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      reportMessage(e.target, "click");
    };

    if (listenDOM.current) {
      listenDOM.current.addEventListener("click", handleClick);
    }

    return function () {
      listenDOM.current &&
        listenDOM.current.removeEventListener("click", handleClick);
    };
  }, [reportMessage]);

  return [listenDOM, reportMessage];
};
