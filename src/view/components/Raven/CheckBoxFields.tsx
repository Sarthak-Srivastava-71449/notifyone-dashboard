import { Checkbox } from 'antd';
import React from 'react';

interface CheckBoxFieldsProps {
  changeFunction: any;
  name: string;
  id: string;
  fields: string;
  checkedField: any;
  disabledField: any;
  isFieldChecked: boolean;
  skusCheck: boolean;
}

const CheckBoxFields: React.FC<CheckBoxFieldsProps> = (
  props: CheckBoxFieldsProps
) => {
  let checked = false;
  let disabled = false;
  if (props.checkedField && props.checkedField.indexOf(props.fields) > -1) {
    checked = true;
  }
  if (
    (props.disabledField && props.disabledField.indexOf(props.fields) > -1) ||
    props.isFieldChecked ||
    props.skusCheck
  ) {
    disabled = true;
  }
  return (
    <Checkbox
      id={props.name + props.id}
      name={props.name}
      className="regular-checkbox"
      value={props.fields}
      onChange={(e) => props.changeFunction(props.fields)}
      checked={checked}
      disabled={disabled}
    >
      {props.fields}
    </Checkbox>
  );
};

export default CheckBoxFields;
