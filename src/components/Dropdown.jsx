import { Dropdown as Select } from "flowbite-react";

export const Dropdown = ({items}) => {

    return <Select label="Filter by Region">
        {items.map((item, index) => <Select.Item key={index}>
            {item}
        </Select.Item>)}
    </Select>

};

export default Dropdown;