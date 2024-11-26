import React from "react";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
const CommonForm = ({
  formControl,
  isBtnDisabled,
  buttonText,
  formData,
  setFormData,
  onSubmit,
}) => {
  const renderInputsByComponents = (controlItems) => {
    const value = formData[controlItems.name] || "";
    switch (controlItems.componentType) {
      case "input":
        return (
          <Input
            type={controlItems.type}
            placeholder={controlItems.placeholder}
            name={controlItems.name}
            id={controlItems.name}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [controlItems.name]: e.target.value })
            }
            className="outline-offset-0 rounded-lg border-r-8 border-none focus-visible:outline-dashed focus-visible:text-foreground focus-visible:font-semibold"
          ></Input>
        );
        break;

      case "select":
        return (
          <Select
            value={value}
            onValueChange={(value) =>
              setFormData({ ...formData, [controlItems.name]: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={controlItems.label} />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {controlItems.options && controlItems.options.length > 0
                ? controlItems.options.map((optionItem) => (
                    <SelectItem
                      className="bg- cursor-pointer"
                      key={optionItem.id}
                      value={optionItem.id}
                    >
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        return (
          <Textarea
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [controlItems.name]: e.target.value })
            }
            name={controlItems.name}
            placeholder={controlItems.placeholder}
            id={controlItems.id}
          ></Textarea>
        );
        break;

      default:
        return (
          <Input
            type={controlItems.type}
            placeholder={controlItems.placeholder}
            name={controlItems.name}
            className=""
          ></Input>
        );
        break;
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControl.map((controlItems) => (
          <div key={controlItems.name} className="grid gap-3 w-full">
            <Label className="mb-1">{controlItems.label}</Label>
            {renderInputsByComponents(controlItems)}
          </div>
        ))}
      </div>
      <Button
        type="submit"
        disabled={isBtnDisabled}
        className="w-full bg-blue-900 text-white hover:font-bold mt-3 hover:bg-blue-600 "
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
