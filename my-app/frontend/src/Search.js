import React, { useState, useEffect } from 'react';
import './Search.css';



function Search () {
          
    const [results, setResults] = useState([]);
    
      

    const handleChange = async (e) => {
        const searchValue = e.target.value;
        try {
            const response = await fetch('http://127.0.0.1:5001/searchStudent', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({search: searchValue}),
            });
      
            if (response.ok) {
                const data = await response.json(); 
                setResults(data); 
                console.log(results)
              console.log('Student succesfully searched');
              
            } else {
              console.error('Failed to search student');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        
    }

    const removeStudent = async (id) => {
        try {
            const response = await fetch('http://127.0.0.1:5001/removeStudent', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({studentId: id}),
            });
      
            if (response.ok) {
                const data = await response.json(); 
                
                console.log(data)
              console.log('Student removed searched');
              
            } else {
              console.error('Failed to remove student');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        
    }

    
    

    return (
        <div className = "Container">
            <div className = "Search">
        <input className='input' type="text" 
    placeholder="Search Student..." onChange={handleChange} ></input>


        </div>

        {results.length > 0 && (
        <div className="Results">
          <ul>
            {results.map((result, index) => (
              <li key={index}>
                
                {result.firstName}
                <button onClick={() => removeStudent(result._id)}>Remove Student</button>
                </li>
            ))}
          </ul>
        </div>
      )}
        



        </div>

        
        
        

    )
}

export default Search;