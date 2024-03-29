export function getFormattedTableCell(value: string | number | boolean | Date): string {
    if (typeof value === "number") {
      return value.toString(); // 0 is not rendered by default, so convert it to string
    }
    if (typeof value === "boolean") {
      return value ? "✓" : "✘";
    }
    if (value instanceof Date) {
      return value.toUTCString();
    }
    return value.trim().toLowerCase();
  }

  export interface TextField {
    type: "text";
    defaultValue: string | null;
  }
  
  export interface NumberField {
    type: "number";
    defaultValue: number | null;
  }
  
  export interface CheckboxListField {
    type: "checkboxList";
    options: string[];
  }
  
  export type Field = TextField | NumberField | CheckboxListField;
  
  function logWarning(field: never) {
    console.warn("Field has an unknown type", field);
  }
  
  /**
   * Quiero obtener una definición de cada field que según el tipo me devuelva:
   * - checkboxList: "Checkbox options: name1, name2, name3"
   * - number: "Number default: 2.00"
   * - text: "Text default: text"
   */
  export function fieldDefinition({ field }: { field: Field }): string {
    switch(field.type) {
      case "checkboxList":
        return `Checkbox options: ${field.options.join(", ")}`;
      case "number":
        return `Number default: ${field.defaultValue?.toFixed(2)}`;
      case "text":
        return `Text default: ${field.defaultValue}`;
      default:
        logWarning(field);
        return "";
    }
  }

  