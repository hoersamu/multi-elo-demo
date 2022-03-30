import { Copy24Regular } from "@fluentui/react-icons";
import { ComponentType } from "react";
import { AlertTemplateProps } from "react-alert";

// the style contains only the margin given as offset
// options contains all alert given options
// message is the alert message
// close is a function that closes the alert
export const AlertTemplate: ComponentType<AlertTemplateProps> = ({
  style,
  message,
  close,
}) => (
  <div style={style} className="bg-accent p-4 rounded-lg" onClick={close}>
    <Copy24Regular />
    {message}
  </div>
);
