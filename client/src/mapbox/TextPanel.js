function TextPanel ({showResult,trailType,trailDifficulty,distance,duration,instruction}){

    return (
        showResult && 
        <div className="instruction-panel">
        <strong>Trail Details</strong>
        <p>Trail Type: {trailType}</p>
        <p>Difficulty: {trailDifficulty}</p>
        <p>Distance: {distance} km</p>
        <p>Duration: {duration} min</p>
        <div className="instruction">
          {instruction?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </div>
      </div>
    );
};

export default TextPanel;