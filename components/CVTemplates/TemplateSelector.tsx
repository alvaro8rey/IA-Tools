import React from "react";

export default function TemplateSelector({ selected, onChange }: any) {
  return (
    <div className="card">
      <h3 className="text-lg font-bold mb-2">Selecciona una plantilla</h3>
      <div className="flex space-x-4">
        {["template1", "template2"].map((template) => (
          <label key={template} className="flex items-center space-x-2">
            <input
              type="radio"
              name="template"
              value={template}
              checked={selected === template}
              onChange={() => onChange(template)}
            />
            <span className="capitalize">{template}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
