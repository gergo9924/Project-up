import React from "react";
import { restaurantModificationService } from "../../../services/restaurant-service.js";

const TextAreaDetails = (props) => {
  
  return (
    <div style={{maxWidth: "500px"}} >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{margin: "10px"}}>{props.details.title}</div>
        <textarea 
          style={{ width: `${props.maxWidth}`, height: "60px" , fontSize: "20px", textAlign: "justify",  resize:"vertical"}}
          disabled={props.details.value == "e_mail" ? true : false}
          onChange={(e) => {
            restaurantModificationService(
              e.target.value,
              props.details.value,
              props.details.func[0],
              props.details.func[1]
            );
          }}
          value={props.details.func[0][props.details.value] || ""}
        />
      </div>
    </div>
  );
};

export default TextAreaDetails;
