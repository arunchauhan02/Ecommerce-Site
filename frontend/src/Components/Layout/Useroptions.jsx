import React from 'react'
import {SpeedDial,SpeedDialAction} from "@mui/material"
import { useDispatch,useSelector } from 'react-redux'

const Useroptions = () => {
  const {user} = useSelector(state=>state.user);
  console.log(user);
  return (
    <div>
      <SpeedDial
      ariaLabel='navigation speed dial'
      className='speedDial'
      sx={{
        height:'20px',
        width:'20px',
        margin:'0px 10px 0px 30px'
      }}
      icon={<img className='speedDialIcon' src={user.user.avatar.url} alt="" />}>
        <SpeedDialAction/>
        <SpeedDialAction/>
        <SpeedDialAction/>
      </SpeedDial>
    </div>
  )
}

export default Useroptions
