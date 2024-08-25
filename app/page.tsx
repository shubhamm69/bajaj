"use client";
import { useState } from 'react';
import Select from 'react-select';

const options = [
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'numbers', label: 'Numbers' },
  { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
];

export default function Home() {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<any>([]);

  if (typeof window !== "undefined") {
    document.title = "ABCD123";
  }

  const handleSubmit = async () => {
    setError(null);

    try {
      const parsedJson = JSON.parse(jsonInput);
      const res = await fetch('/api/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedJson),
      });

      const data = await res.json();
      if (data.is_success) {
        setResponse(data);
      } else {
        setError('Failed to process the request.');
      }
    } catch (err) {
      setError('Invalid JSON input.');
    }
  };

  const handleSelectChange = (selected: any) => {
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!response) return null;
  
    const filteredResponse: { [key: string]: string } = selectedOptions.reduce((acc: any, option: any) => {
      if (Array.isArray(response[option.value])) {
        acc[option.value] = response[option.value].join(', ');
      }
      return acc;
    }, {});
  
    return (
      <div>
        {filteredResponse.alphabets && (
          <p>Alphabets: {filteredResponse.alphabets}</p>
        )}
        {filteredResponse.numbers && (
          <p>Numbers: {filteredResponse.numbers}</p>
        )}
        {filteredResponse.highest_lowercase_alphabet && (
          <p>Highest Lowercase Alphabet: {filteredResponse.highest_lowercase_alphabet}</p>
        )}
      </div>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>BFHL API Frontend</h1>
      <textarea
        placeholder='Enter JSON here'
        className="text-black"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        rows={6}
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
      />
      <button onClick={handleSubmit} style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px' }}>
        Submit
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {response && (
        <>
          <Select
            isMulti
            options={options}
            className="text-black"
            onChange={handleSelectChange}
            placeholder='Select fields to display...'
            styles={{ container: (provided:any) => ({ ...provided, marginTop: '20px' }) }}
          />
          {renderResponse()}
        </>
      )}
    </div>
  );
}