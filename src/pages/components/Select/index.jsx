import React, { Component } from 'react';
import '../Card/index.css';
import { Dropdown, Button, Menu } from 'antd';

const menu1 = (
  <Menu>
    <Menu.Item>mm</Menu.Item>
  </Menu>
);

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // //一级菜单的所有数据
      // firstCategoryListData: [],
      // //一级菜单的id值
      // firstCategoryId: 0,
      // //二级菜单对应id的数据
      // secondCategoryListData: [],s
      // //二级菜单的id值
      // secondCategoryId: 0
    };
  }

  render() {
    return (
      <div className="infobox" style={{ left: 20 }}>
        <div>交银大厦</div>
        <Dropdown overlay={menu1}>
          <Button>楼层</Button>
        </Dropdown>
        <Dropdown overlay={menu1}>
          <Button>玻璃</Button>
        </Dropdown>
      </div>
    );
  }
}

export default Select;
