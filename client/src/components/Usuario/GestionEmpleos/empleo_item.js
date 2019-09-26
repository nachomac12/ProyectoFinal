import React from "react";
import { Paper } from "@material-ui/core";

const EmpleoItem = props => {

  const renderItem = () => {
    if (props.numero % 2 === 0) {
      return (
        <Paper style={{ padding: 20, backgroundColor:'#3F9BB9', cursor:'pointer', marginBottom: 10, border: '1px solid #FFFFFF' }}>
          <div style={{fontSize: 20, color:'#FFFFFF'}}>{props.titulo}</div>
        </Paper>
      )
    } else {
      return (
        <Paper style={{ padding: 20, backgroundColor:'#FFFFFF', cursor:'pointer', marginBottom: 10, border: '1px solid #3F9BB9' }}>
          <div style={{fontSize: 20, color:'#3F9BB9'}}>{props.titulo}</div>
        </Paper>
      )
    }
  }

  return (
    renderItem()
  )
};

export default EmpleoItem;
