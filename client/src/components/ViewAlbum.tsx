import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { environment } from "../assets/environment";

const ViewAlbum = React.memo(() => {
  //   const [album, setAlbum] = useState({});
  console.log("hey album")
  const params = useParams();

  useEffect(() => {
    axios
      .get(`${environment.searchUrl}/albumsById/${params.id}`)
      .then((data: any) => {
        console.log(data.data);
      });
  });

  return <>
  <div>
    this is some body of album
  </div>
  </>;
});

export default ViewAlbum;
