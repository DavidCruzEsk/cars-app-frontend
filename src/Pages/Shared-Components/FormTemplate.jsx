const FormTemplate = ({ car, setCar, handleSubmit, error, navigate }) => {
  const handleChange = (e) => {
    setCar({ ...car, [e.target.id]: e.target.value });
  };

  const handleCheckbox = (e) => {
    setCar({ ...car, [e.target.name]: e.target.checked });
  };

  const formatError =
    typeof error === "string"
      ? error
      : error
          .map((error) => error[0].toUpperCase() + error.slice(1))
          .join(", ");

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-container__group">
        <label htmlFor="year">Year:</label>
        <input
          type="number"
          id="year"
          min="1900"
          max="2026"
          value={car.year}
          onChange={handleChange}
        />
      </div>
      <div className="form-container__group">
        <label htmlFor="make">Make:</label>
        <input type="text" id="make" value={car.make} onChange={handleChange} />
      </div>
      <div className="form-container__group">
        <label htmlFor="model">Model:</label>
        <input
          type="text"
          id="model"
          value={car.model}
          onChange={handleChange}
        />
      </div>
      <div className="form-container__group">
        <label htmlFor="trim">Trim:</label>
        <input type="text" id="trim" value={car.trim} onChange={handleChange} />
      </div>
      <div className="form-container__group">
        <label htmlFor="color">Color:</label>
        <input
          type="text"
          id="color"
          value={car.color}
          onChange={handleChange}
        />
      </div>
      <div className="form-container__group">
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          min="0"
          id="price"
          value={car.price}
          onChange={handleChange}
        />
      </div>
      <div className="form-container__group">
        <label htmlFor="imgUrl">Image URL:</label>
        <input
          type="text"
          id="imgUrl"
          value={car.imgUrl}
          onChange={handleChange}
        />
      </div>
      <div className="form-container__group">
        <label htmlFor="discontinued">Discontinued:</label>
        <input
          type="checkbox"
          id="discontinued"
          name="discontinued"
          checked={car.discontinued}
          onChange={handleCheckbox}
        />
      </div>
      <div className="form-container__group">
        <button type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </div>
      <div className="form-container__group error">
        {error && <p>Missing Fields: {formatError}</p>}
      </div>
    </form>
  );
};

export default FormTemplate;
