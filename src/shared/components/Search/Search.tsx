import styles from './Search.module.css';

type SearchProps = Readonly<{
  value: string;
  onChange: (value: string) => void;
}>;

export function Search({ value, onChange }: SearchProps) {
  return (
    <div className={styles.wrapper}>
      <label htmlFor="product-search" className={styles.label}>
        Buscar
      </label>
      <input
        id="product-search"
        type="search"
        className={styles.input}
        placeholder="Marca o modelo..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete="off"
      />
    </div>
  );
}
