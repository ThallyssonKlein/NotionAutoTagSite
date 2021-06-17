export default function Input({
    type,
    id,
    name,
    value,
    setValue,
    onKeyPress,
    placeholder,
    required,
}) {
    return (
        <>
            <input
                type={type ?? "text"}
                id={id}
                name={name}
                value={value}
                onChange={({ target }) => setValue(target.value)}
                onKeyPress={onKeyPress}
                placeholder={placeholder}
                required={required}
            />
            <style jsx>{`
                input {
                    width: 100%;
                    height: 3rem;
                    background-color: var(--input-background);
                    box-shadow: var(--inside-box-shadow);
                    border-radius: var(--border-radius);
                    padding: 0.4rem 1rem;
                    color: var(--highlighted-font-color);
                    font-weight: 500;
                }
                input::placeholder {
                    color: var(--font-color);
                    font-weight: 400;
                }
                input:focus {
                    box-shadow: var(--input-focus-highlight);
                }
            `}</style>
        </>
    );
}
