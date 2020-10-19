import React from 'react'

export default function Text(props) {
  const TagType = props.tag || 'p';
  return (
    <TagType 
      id={props.id} 
      className={props.className} 
      style={{display: ((props.value&&props.value!=='')?'initial':'none'), 
              ...props.style}}>
      {props.value}
    </TagType>
  )
}
