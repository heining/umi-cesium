/**
 * @ Select选择框联动
 * date: 2020-06-18
 */

import React, { Component } from 'react';
import { Select } from 'antd';
import '../Card/index.css';

const { Option } = Select;

class FloorSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 楼层改变
  handleFloorChange = () => {
    
  };

  // 玻璃改变
  handleGlassChange = () => {}

  render() {
    return (
      <div className="infobox">
        <div className="infoline" style={{marginBottom: 10}}>交银大厦</div>
        <Select 
          placeholder={'请选择楼层'}
          style={{ width: 100, marginRight: 20}}
          onChange={this.handleFloorChange}
        >
          <Option value='floor1'>1F</Option>
          <Option value='floor2'>2F</Option>   
          <Option value='floor3'>3F</Option>
          <Option value='floor4'>4F</Option>
          <Option value='floor5'>5F</Option>
          <Option value='floor6'>6F</Option>
          <Option value='floor7'>7F</Option>
          <Option value='floor8'>8F</Option>
          <Option value='floor9'>9F</Option>
        </Select>
        <Select 
          placeholder={'请选择玻璃'}
          style={{ width: 100 }}
          onChange={this.handleGlassChange}
        >
          <Option value='Jack'>Jack</Option>
          <Option value='Lucy'>Lucy</Option>   
          <Option value='yiminghe'>yiminghe</Option>
        </Select>
      </div>
    );
  }
}

export default FloorSelect;
