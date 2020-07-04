import React, { Component } from 'react';
import { List } from 'antd';

const Item = List.Item;
const Brief = Item.Brief;

let data = [
  { title: '建筑名称', content: '交银金融大厦' },
  { title: '建筑地址', content: '上海市浦东新区银城中路188号' },
  { title: '建筑总高度', content: '主楼约258米，裙楼约24米' },
  { title: '幕墙竣工日期', content: '2002年9月' },
  { title: '幕墙改建竣工时间', content: '未进行过改建' },
  { title: '建筑概况房屋用途', content: '主楼1幢，用途:自用办公楼;裙楼1幢，用途:自用办公楼' },
  { title: '幕墙使用部位', content: '主楼四个立面，裙楼三个立面' },
  { title: '幕墙使用层数', content: '主楼54层（实际层），裙楼6层（实际层）' },
  { title: '幕墙使用高度', content: '主楼约258米，裙楼约24米' },
  { title: '幕墙总面积', content: '约43658平方米'},
  { title: '幕墙安装方式', content: '主楼单元式幕墙，裙楼单元式幕墙' },
  { title: '幕墙构造', content: '主楼:明框玻璃幕墙(非结构粘接装配)' },
  { title: '2019-02-08', content: '李明' },
  { title: '2019-02-08', content: '李明' },
  { title: '2019-02-08', content: '李明' },
  { title: '2019-02-08', content: '李明' },
  { title: '2019-02-08', content: '李明' },
  { title: '2019-02-08', content: '李明' },
  { title: '2019-02-08', content: '李明' },
  { title: '2019-02-08', content: '李明' },
];

class BuildInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div
          style={{ position: 'absolute', right: 15, top: 10, cursor: 'pointer' }}
          onClick={this.props.handleHideDetailInfo}
        >
          X
        </div>
        <List>
          {data.map((item, index) => (
            <Item key={index} arrow="horizontal" multipleLine>
              {item.title} <Brief>{item.content}</Brief>
            </Item>
          ))}
        </List>
      </div>
    );
  }
}

export default BuildInfo;
