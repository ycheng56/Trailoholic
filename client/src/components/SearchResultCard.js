import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import "./css/Search.css";

export default function SearchResultCard({ trail }) {
  return (
    <div>
      {/* <div className="searchTitle">
        <h3 className="pt-5">Best trails in {trail.start}</h3>
        <p >Looking for the best hiking or cycling trails in {trail.start}? Trailoholic has 
        lots of trails in {trail.start} area. Enjoy your time hiking, biking or exploring 
        other outdoor activities.
        </p>
      </div> */}

      <div className="searchResultCard">
        <Card sx={{ maxWidth: 1000, display: "flex", textAlign: "justify" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardMedia
              component="img"
              height="40"
              image="https://www.vmcdn.ca/f/files/via/images/sponsored-content-images/stawamus-chief_73d6b619-e9a7-4c94-9e60-d04d15a62967.jpeg;w=960"
              alt="richmond pic"
            />
          </Box>
          <CardContent sx={{ display: "flex", flexDirection: "column" }}>
            <Typography gutterBottom variant="h5" component="div">
              {trail.start}
            </Typography>
            <Typography>
              Start:{trail.start} Destination:{trail.destination}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Get to know this 11.9-km out-and-back trail near Richmond, British
              Columbia. Generally considered an easy route, it takes an average
              of 2 h 10 min to complete.
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", flexDirection: "column" }}>
            <Button size="small">🤍</Button>
            <Button size="small"><Link to={`/trails/${trail._id}`}>
              <p>View Trail Details</p>
            </Link></Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
