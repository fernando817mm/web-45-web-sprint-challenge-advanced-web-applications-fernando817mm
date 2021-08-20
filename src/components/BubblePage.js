import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
// import fetchColorService from '../services/fetchColorService';

import axiosWithAuth from "../helpers/axiosWithAuth";
import { useParams } from "react-router-dom";
import axios from "axios";

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchColorService();
  }, [])

  const fetchColorService = () => {
    axiosWithAuth().get('http://localhost:5000/api/colors')
        .then(res => {
            setColors(res.data);
        })
        .catch(err => {
            alert(err);
        })
  }

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    axiosWithAuth().put(`http://localhost:5000/api/colors/${id}`, editColor)
      .then(res => {
        console.log(res.data);
        axiosWithAuth().delete(`http://localhost:5000/api/colors/${Number(res.data.id)}`)
          .then(res => {
            const newColorsArr = colors.filter(color => color.id !== Number(res.data));
            setColors(newColorsArr);
          })
          .catch(err => {
            alert(err, 'delete error');
          })
        axiosWithAuth().post('http://localhost:5000/api/colors', res.data)
          .then(res => {
            console.log(res.data);
            setColors(res.data);
          })
          .catch(err => {
            alert(err);
          })
      })
      .catch(err => {
        alert(err, 'put error');
      })
  };

  const deleteColor = (colorToDelete) => {
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${colorToDelete.id}`)
      .then(res => {
        const newColorsArr = colors.filter(color => color.id !== Number(res.data));
        setColors(newColorsArr);
      })
      .catch(err => {
        alert(err);
      })
  };

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
