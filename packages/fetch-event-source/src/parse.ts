import { EventKey } from "./types";

export const parseLine = (line: string, eventKey: EventKey) => {
  let lineText: string = "";
  if (eventKey === EventKey.Data) {
    const [_, text] = line.split(eventKey);
    lineText = text;
  } else if (
    eventKey === EventKey.EventAdd ||
    eventKey === EventKey.EventMessage
  ) {
    const [text, _] = line.split(eventKey);
    lineText = text;
  }
  return lineText;
};
