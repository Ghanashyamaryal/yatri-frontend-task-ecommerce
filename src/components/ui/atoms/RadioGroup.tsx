interface RadioOption {
  label: string;
  value: string;
}
interface RadioGroupProps {
  label: string;
  options: RadioOption[];
  selected: string;
  onChange: (value: string) => void;
}
const RadioGroup = ({
  label,
  options,
  selected,
  onChange,
}: RadioGroupProps) => (
  <div className="flex flex-col gap-2">
    <span className="text-sm font-medium text-gray-800">{label}</span>
    <div className="flex flex-row gap-4">
      {options.map((opt) => (
        <label
          key={opt.value}
          className="flex cursor-pointer items-center gap-2"
        >
          <input
            type="radio"
            name="payment"
            value={opt.value}
            checked={selected === opt.value}
            onChange={() => onChange(opt.value)}
            className="accent-brand-500 cursor-pointer"
          />
          {opt.label}
        </label>
      ))}
    </div>
  </div>
);
export default RadioGroup;
