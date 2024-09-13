import { Input } from "../ui/input";

function CommonFormElement({ currentItem, value, onChange }) {
  let content = null;

  switch (currentItem.componentType) {
    case "input":
      content = (
        <Input
          name={currentItem.name}
          id={currentItem.id}
          placeholder={currentItem.placeholder}
          required
          value={value}
          onChange={onChange}
          type={currentItem.type}
        />
      );
      break;

    default:
      content = (
        <Input
          id={currentItem.name}
          name={currentItem.name}
          required
          value={value}
          onChange={onChange}
          type={currentItem.type}
        />
      );
      break;
  }

  return content;
}

export default CommonFormElement;
