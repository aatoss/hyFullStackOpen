const Filter = ({ filter, setFilter }) => {
    return (
    <form>
        <div>filter shown with <input value={filter} onChange={(e) => setFilter(e.target.value)} /></div>
    </form>)
}

export default Filter