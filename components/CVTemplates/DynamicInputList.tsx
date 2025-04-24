import React from "react";

export default function DynamicInputList({ title, items, onChange }: any) {
  const handleItemChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  const addItem = () => {
    onChange([...items, ""]);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_: string, idx: number) => idx !== index);
    onChange(newItems);
  };

  return (
    <div className="card space-y-2">
      <h3 className="text-lg font-bold">{title}</h3>
      {items.map((item: string, idx: number) => (
        <div key={idx} className="flex items-center space-x-2">
          <input
            type="text"
            value={item}
            onChange={(e) => handleItemChange(idx, e.target.value)}
          />
          <button
            type="button"
            onClick={() => removeItem(idx)}
            className="bg-red-500 hover:bg-red-600 text-white px-2 rounded"
          >
            -
          </button>
        </div>
      ))}
      <button type="button" onClick={addItem} className="mt-2">
        Añadir {title.toLowerCase().slice(0, -1)}
      </button>
    </div>
  );
}
