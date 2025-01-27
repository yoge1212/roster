import React, { useState, useEffect } from 'react';
import './Homepage.css';
import Search from './Search';

function HomePage() {

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        major: '',
        yearofgraduation: '',
      });
 
      const[statsData, setStatsData] = useState({
        major: '',
        yearofgraduation: '',
      });
      
      

      const[actualStats, setActualStats] = useState(null)

      const handleChange = (event) => {
  const { name, value } = event.target;
  setFormData({ ...formData, [name]: value });
  console.log(formData);
};

const handleOtherChange = (event) => {
    const { name, value } = event.target;
    setStatsData({ ...statsData, [name]: value });
    console.log(statsData);
  };


const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5001/addStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Student added successfully');
      } else {
        console.error('Failed to add student');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleOtherSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5001/stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(statsData),
      });

      if (response.ok) {
        const data = await response.json(); 
        setActualStats(data);

        console.log('Stats found ');
      } else {
        console.error('Stats not Found');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

    
    return (
      <div className="Homepage">
        <div className = "NavBar">
        <h1> Roster</h1>
        <Search></Search>
        </div>
        
        <h3>Add Student</h3>

        <form className = "form"
        onSubmit={handleSubmit}
        >
        <label>
        First Name:
        <input type="text" name="firstname" onChange={handleChange}/>
    </label>
    <label>
        Last Name:
        <input type="text" name="lastname" onChange={handleChange} />
    </label>
    <label>
        Major:
        <input type="text" name="major" onChange={handleChange}/>
    </label>
    <label>
        Year of Graduation:
        <input type="text" name="yearofgraduation" onChange={handleChange}/>
    </label>
    <button type="submit" > Submit </button>
            </form>

    <form  onSubmit={handleOtherSubmit}>

    <h3>Stats</h3>
    <h4>Find how many in a major </h4>
    <input type = "text" name = "major" onChange={handleOtherChange}>
    
    </input>
    {actualStats && (
        <h5>Major: {statsData.major} Students: {actualStats.major}</h5>

    )}
    
    <h4>Find how many in a graduating class </h4>

    <input type = "text" name = "yearofgraduation" onChange={handleOtherChange}>
        </input>

        {actualStats && (
        <h5>Year: {statsData.yearofgraduation} Students: {actualStats.gradYear}</h5>
    )}
    

    <button type = "submit">Submit</button>

    </form>
    

      </div>
    );
    
    
  }
  
  export default HomePage;