import React, { useState } from 'react';
import axios from 'axios';

const FlightSearch = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [cabin, setCabin] = useState(''); // Normal or First Class
  const [baggage, setBaggage] = useState(''); // Hand or Checked
  const [flights, setFlights] = useState([]);

  const [filters, setFilters] = useState({
    origin: false,
    destination: false,
    maxPrice: false
  });

  const handleSearch = () => {
    const params = {
      startDate,
      endDate,
      ...(filters.origin && { origin }),
      ...(filters.destination && { destination }),
      ...(filters.maxPrice && { maxPrice }),
    };

    axios.get('http://localhost:8080/api/flights/search', { params })
      .then(response => {
        setFlights(response.data);
      })
      .catch(error => {
        console.error('Error fetching flights:', error);
      });
  };

  return (
    <div>
      <h1>Search Flights</h1>
      <div>
        <label>Start Date: </label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <div>
        <label>End Date: </label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
      <div>
        <label>
          <input type="checkbox" checked={filters.origin} onChange={(e) => setFilters({...filters, origin: e.target.checked})} />
          Filter by Origin
        </label>
        {filters.origin && (
          <input type="text" placeholder="Origin" value={origin} onChange={(e) => setOrigin(e.target.value)} />
        )}
      </div>
      <div>
        <label>
          <input type="checkbox" checked={filters.destination} onChange={(e) => setFilters({...filters, destination: e.target.checked})} />
          Filter by Destination
        </label>
        {filters.destination && (
          <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
        )}
      </div>
      <div>
        <label>
          <input type="checkbox" checked={filters.maxPrice} onChange={(e) => setFilters({...filters, maxPrice: e.target.checked})} />
          Filter by Max Price
        </label>
        {filters.maxPrice && (
          <input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        )}
      </div>
      <div>
        <label>Cabin Type:</label>
        <select value={cabin} onChange={(e) => setCabin(e.target.value)}>
          <option value="">Any</option>
          <option value="normal">Normal</option>
          <option value="first">First Class</option>
        </select>
      </div>
      <div>
        <label>Baggage Type:</label>
        <select value={baggage} onChange={(e) => setBaggage(e.target.value)}>
          <option value="">Any</option>
          <option value="hand">Hand Baggage</option>
          <option value="checked">Checked Baggage</option>
        </select>
      </div>
      <button onClick={handleSearch}>Search Flights</button>

      <h2>Available Flights</h2>
      {flights.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Price</th>
              <th>Cabin</th>
              <th>Baggage</th>
            </tr>
          </thead>
          <tbody>
            {flights.map(flight => (
              <tr key={flight.id}>
                <td>{flight.date}</td>
                <td>{flight.origin}</td>
                <td>{flight.destination}</td>
                <td>{flight.price}</td>
                <td>{flight.cabin}</td>
                <td>{flight.baggage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No flights available</p>
      )}
    </div>
  );
};

export default FlightSearch;
