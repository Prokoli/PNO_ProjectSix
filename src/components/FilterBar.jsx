function FilterBar({ selectedCount, onChange }) {
    const options = [0, 1, 5, 10, 20, 50, 100]//0 equals show all items
    return (
        <>
            <form>
                {options.map((count) => (
                    <label key={count}>
                        <input
                            className="radio-btns"
                            type='radio'
                            name='edition-count'
                            value={count}
                            checked={selectedCount === count}
                            onChange={() => onChange(count)}
                        />
                        {count === 0 ? 'Show All' : `> ${count} Editions`}
                    </label>
                ))}

            </form>
        </>
    )
}
export default FilterBar